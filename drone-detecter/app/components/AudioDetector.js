"use client";
import { useEffect, useState } from "react";


export default function AudioDetector() {
const [droneDetected, setDroneDetected] = useState(false);


useEffect(() => {
async function detectAudio() {
try {
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaStreamSource(stream);
source.connect(analyser);


const dataArray = new Uint8Array(analyser.frequencyBinCount);


function checkFrequency() {
analyser.getByteFrequencyData(dataArray);
const peak = Math.max(...dataArray);
if (peak > 180) {
setDroneDetected(true);
} else {
setDroneDetected(false);
}
requestAnimationFrame(checkFrequency);
}


checkFrequency();
} catch (err) {
console.error("Microphone access denied", err);
}
}
detectAudio();
}, []);


return (
<div>
{droneDetected ? (
<p className="text-green-400 font-bold">Possible Drone Sound Detected!</p>
) : (
<p className="text-gray-400">Listening for drone noise...</p>
)}
</div>
);
}