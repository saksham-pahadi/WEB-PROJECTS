"use client";
import { useState, useEffect } from "react";


export default function FusionDisplay() {
const [alerts, setAlerts] = useState([]);


useEffect(() => {
async function fetchWiFi() {
try {
const res = await fetch("/api/wifi-scan");
const data = await res.json();
if (data?.drones?.length > 0) {
setAlerts((prev) => [...prev, `Wi-Fi Drone detected: ${data.drones.join(", ")}`]);
}
} catch (err) {
console.error("Wi-Fi scan error", err);
}
}


const interval = setInterval(fetchWiFi, 10000);
return () => clearInterval(interval);
}, []);


return (
<div className="space-y-2">
{alerts.length > 0 ? (
alerts.map((a, idx) => (
<p key={idx} className="text-red-400 font-bold">⚠️ {a}</p>
))
) : (
<p className="text-gray-400">No threats detected yet...</p>
)}
</div>
);
}