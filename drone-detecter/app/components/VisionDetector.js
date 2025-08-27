"use client";
import { useEffect, useRef, useState } from "react";


export default function VisionDetector() {
const videoRef = useRef(null);
const [motionDetected, setMotionDetected] = useState(false);


useEffect(() => {
async function initCamera() {
try {
const stream = await navigator.mediaDevices.getUserMedia({ video: true });
videoRef.current.srcObject = stream;
} catch (err) {
console.error("Camera access denied", err);
}
}
initCamera();
}, []);


return (
<div>
<video ref={videoRef} autoPlay playsInline className="rounded-lg w-full h-64 object-cover" />
<p className="mt-2 text-gray-400">
{motionDetected ? "Motion detected in frame!" : "Monitoring video feed..."}
</p>
</div>
);
}