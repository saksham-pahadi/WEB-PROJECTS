"use client";
import React, { useEffect, useRef, useState } from "react";

// Browser-based drone detector (audio heuristic)
// Converted to plain JavaScript (no TS types)

export default function DroneDetector() {
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState("idle");
  const [sensitivity, setSensitivity] = useState(0.6); // 0..1
  const [holdSeconds, setHoldSeconds] = useState(2.0);
  const [error, setError] = useState("");
  const [sampleRate, setSampleRate] = useState(44100);
  const [peakFreq, setPeakFreq] = useState(null);
  const [snr, setSNR] = useState(null);

  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const rafRef = useRef(null);
  const canvasRef = useRef(null);
  const lastTriggerRef = useRef(0);
  const sustainRef = useRef(0);

  const FUND_LOW = 80;
  const FUND_HIGH = 220;
  const HARMONICS = [
    [80, 220],
    [250, 450],
    [500, 900],
    [1000, 1800],
  ];

  const FFT_SIZE = 2048;

  const start = async () => {
    setError("");
    setStatus("requesting mic…");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          noiseSuppression: false,
          echoCancellation: false,
          autoGainControl: false
        },
        video: false
      });
      micStreamRef.current = stream;

      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      setSampleRate(ctx.sampleRate);

      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = FFT_SIZE;
      analyser.smoothingTimeConstant = 0.6;
      analyserRef.current = analyser;
      src.connect(analyser);

      setRunning(true);
      setStatus("scanning…");
      loop();
    } catch (e) {
      setError(e?.message || String(e));
      setStatus("error");
    }
  };

  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(t => t.stop());
      micStreamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }

    setRunning(false);
    setStatus("idle");
    setPeakFreq(null);
    setSNR(null);
    sustainRef.current = 0;
  };

  const freqForBin = (bin, sr, fftSize) => (bin * sr) / fftSize;

  const sumBand = (arr, sr, fftSize, f1, f2) => {
    const startBin = Math.max(1, Math.floor((f1 * fftSize) / sr));
    const endBin = Math.min(arr.length - 1, Math.ceil((f2 * fftSize) / sr));
    let sum = 0;
    for (let i = startBin; i <= endBin; i++) sum += Math.pow(10, arr[i] / 20);
    return sum / Math.max(1, endBin - startBin + 1);
  };

  const detect = (db, sr) => {
    const harmEnergy = HARMONICS.reduce((acc, [a, b]) => acc + sumBand(db, sr, FFT_SIZE, a, b), 0) / HARMONICS.length;

    const broadband = sumBand(db, sr, FFT_SIZE, 50, 4000);
    const noiseFloor = sumBand(db, sr, FFT_SIZE, 20, 60) + sumBand(db, sr, FFT_SIZE, 4000, 7000);
    const baseline = 0.5 * broadband + 0.5 * noiseFloor;
    const snrVal = harmEnergy / (baseline + 1e-12);

    let maxDb = -Infinity, maxIdx = -1;
    const startBin = Math.floor((FUND_LOW * FFT_SIZE) / sr);
    const endBin = Math.ceil((FUND_HIGH * FFT_SIZE) / sr);
    for (let i = startBin; i <= endBin; i++) {
      if (db[i] > maxDb) { maxDb = db[i]; maxIdx = i; }
    }
    const peak = maxIdx > 0 ? freqForBin(maxIdx, sr, FFT_SIZE) : null;

    return { snrVal, peak };
  };

  const drawSpectrum = (db, sr) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(34,197,94,0.15)";
    HARMONICS.forEach(([a,b]) => {
      const x1 = (a / (sr/2)) * w;
      const x2 = (b / (sr/2)) * w;
      ctx.fillRect(x1, 0, x2 - x1, h);
    });

    ctx.beginPath();
    for (let i = 1; i < db.length; i++) {
      const f = (i / db.length) * (sr/2);
      const x = (f / (sr/2)) * w;
      const y = h - ((Math.max(-120, Math.min(0, db[i])) + 120) / 120) * h;
      if (i === 1) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const loop = () => {
    if (!analyserRef.current || !audioCtxRef.current) return;
    const analyser = analyserRef.current;
    const sr = audioCtxRef.current.sampleRate;

    const db = new Float32Array(analyser.frequencyBinCount);
    analyser.getFloatFrequencyData(db);

    const { snrVal, peak } = detect(db, sr);
    setPeakFreq(peak);
    setSNR(Number(snrVal.toFixed(2)));

    const now = performance.now();
    const trigger = snrVal > (1.5 + (1 - sensitivity) * 2.5);

    if (trigger) {
      if (lastTriggerRef.current === 0) lastTriggerRef.current = now;
      sustainRef.current = (now - lastTriggerRef.current) / 1000;
    } else {
      lastTriggerRef.current = 0;
      sustainRef.current = 0;
    }

    if (sustainRef.current >= holdSeconds) setStatus("🚨 Drone‑like sound detected");
    else if (trigger) setStatus("listening… (pattern forming)");
    else setStatus("scanning…");

    drawSpectrum(db, sr);

    rafRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    return () => stop();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-4xl mx-auto grid gap-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Nearby Drone Detector (Audio)</h1>
          <div className="flex gap-2">
            {!running ? (
              <button onClick={start} className="px-4 py-2 rounded-2xl shadow bg-emerald-600 text-white hover:bg-emerald-700">Start</button>
            ) : (
              <button onClick={stop} className="px-4 py-2 rounded-2xl shadow bg-rose-600 text-white hover:bg-rose-700">Stop</button>
            )}
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-3">
          <div className="p-4 rounded-2xl bg-white shadow grid gap-2">
            <div className="text-sm text-slate-500">Status</div>
            <div className={`text-lg font-semibold ${status.includes("🚨") ? "text-rose-600" : "text-slate-900"}`}>{status}</div>
            <div className="text-sm text-slate-500">Sample rate: {sampleRate} Hz</div>
            <div className="text-sm text-slate-500">Peak (80–220 Hz): {peakFreq ? `${Math.round(peakFreq)} Hz` : "–"}</div>
            <div className="text-sm text-slate-500">SNR (heuristic): {snr ?? "–"}</div>
            {error && <div className="text-sm text-rose-600">{error}</div>}
          </div>

          <div className="p-4 rounded-2xl bg-white shadow grid gap-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-700 w-28">Sensitivity</label>
              <input type="range" min={0.05} max={1} step={0.05} value={sensitivity} onChange={e=>setSensitivity(parseFloat(e.target.value))} className="w-full"/>
              <span className="text-sm tabular-nums w-10 text-right">{sensitivity.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-700 w-28">Hold (s)</label>
              <input type="range" min={0.5} max={5} step={0.5} value={holdSeconds} onChange={e=>setHoldSeconds(parseFloat(e.target.value))} className="w-full"/>
              <span className="text-sm tabular-nums w-10 text-right">{holdSeconds.toFixed(1)}</span>
            </div>
            <p className="text-xs text-slate-500">Tip: Increase hold to reduce false alarms. Lower sensitivity if you get constant triggers in noisy areas.</p>
          </div>
        </section>

        <section className="p-4 rounded-2xl bg-white shadow grid gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Live Spectrum (0–{Math.round(sampleRate/2/1000)} kHz)</h2>
            <span className="text-xs text-slate-500">Green bands = target ranges</span>
          </div>
          <canvas ref={canvasRef} width={1000} height={240} className="w-full rounded-xl ring-1 ring-slate-200 bg-slate-100"/>
        </section>

        <section className="p-4 rounded-2xl bg-white shadow grid gap-2">
          <h3 className="font-semibold">What this can/can’t do</h3>
          <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
            <li>✅ Good at flagging sustained propeller‑like tones in quiet to moderate noise.</li>
            <li>⚠️ Can false‑trigger on fans, scooters, AC compressors, helicopters, etc. Use outdoors and increase Hold if needed.</li>
            <li>🚫 No RF or direction finding. Add RF (RTL‑SDR) or camera if you need serious coverage.</li>
          </ul>
        </section>

        <footer className="text-xs text-slate-500">
          Use responsibly and within local laws. For critical applications, combine audio with RF scanning and vision models.
        </footer>
      </div>
    </div>
  );
}
