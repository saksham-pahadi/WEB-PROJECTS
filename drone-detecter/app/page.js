"use client";

import { useState, useEffect, useRef } from "react";
import AudioDetector from "./components/AudioDetector";
import React from "react";

export default function Homepage() {
  const canvasRef = useRef(null);
  const [sampleRate, setSampleRate] = useState(44100);
  const [wifiDrones, setWifiDrones] = useState([]);
  const [detections, setDetections] = useState([]);
  const [stop, setstop] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);

  // Initialize audio only on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/alert.mp3");
      audioRef.current.loop = true;
      // audioRef.current.volume = 0.1;
    }
  }, []);

  // Handle play/pause when detections change
  useEffect(() => {
    if (!audioRef.current) return;
    if (detections.length > 0) {
      audioRef.current.play().catch((err) =>
        console.warn("Autoplay blocked:", err)
      );
    } else {
      audioRef.current.pause();
    }
  }, [detections]);

  // Wi-Fi scan polling
  useEffect(() => {
    if (stop) return;

    async function fetchWifi() {
      try {
        setLoading(true);
        const res = await fetch("/api/wifi-scan");
        const data = await res.json();
        if (data.success) {
          setWifiDrones(data.drones);
          if (data.drones.length > 0) {
            setDetections((prev) => [...prev, data.drones]);
          } else {
            setDetections([]);
          }
        }
      } catch (err) {
        console.error("Wi-Fi fetch error", err);
      } finally {
        setLoading(false);
      }
    }

    fetchWifi();
    const interval = setInterval(fetchWifi, 5000);
    return () => clearInterval(interval);
  }, [stop]);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8 relative">
      {console.log("detections", detections)}

      <h1 className="text-4xl font-bold text-center mb-8">
        🚨 Drone Detection Dashboard
      </h1>

      {/* Audio section  */}
      <section className="bg-gray-800 rounded-2xl p-6 shadow-lg md:col-span-2 mb-2 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Noise Detection</h2>
        <AudioDetector
          sampleRate={sampleRate}
          setSampleRate={setSampleRate}
          setDetections={setDetections}
          stop={stop}
          setError={setError}
        />
        {error && (
          <p className="text-red-500 text-center mt-2">
            ⚠️ Audio Error: {error}
          </p>
        )}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl h-[50vh] mx-auto">
        {/* Wi-Fi Section */}
        <section className="bg-gray-800 rounded-2xl p-6 shadow-lg md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">📡 Wi-Fi Detections</h2>
          {loading ? (
            <p className="text-gray-400">
              {!stop ? "Scanning..." : "Start to scan"}
            </p>
          ) : wifiDrones.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              <div className="fixed top-0 left-0 w-full bg-red-700 text-white text-center py-2 animate-pulse z-50">
                ⚠️ Drone Activity Detected!
              </div>
              {wifiDrones.map((ssid, i) => (
                <li key={i} className="text-red-400 font-medium">
                  {ssid}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-green-400">
              {!stop ? "✅ No suspicious drones detected nearby" : "Start to scan"}
              
            </p>
          )}
        </section>
      </div>

      {wifiDrones.length > 0 && (
        <button
          className="bg-red-600 p-4 w-full mt-2 rounded-xl text-xl font-bold"
          onClick={() => {
            setstop(true);
            audioRef.current?.pause();
            setDetections([]);
            setWifiDrones([]);


          }}
        >
          Stop
        </button>
      )}

      {stop && (
        <button
          className="bg-green-600 p-4 w-full mt-2 rounded-xl text-xl font-bold"
          onClick={() => {
            setstop(false);
          }}
        >
          Start
        </button>
      )}
    </main>
  );
}
