// app/api/wifi-scan/route.js
import { NextResponse } from "next/server";
import wifi from "node-wifi";

// Init wifi package
wifi.init({ iface: null }); // null = auto-detect

export async function GET() {
  try {
    const networks = await wifi.scan();

    // Filter suspicious SSIDs (example heuristic: contains "drone" keyword)
    const drones = networks
      .filter((net) => /drone|uav|quad/i.test(net.ssid))
      .map((net) => net.ssid);

    return NextResponse.json({ success: true, drones });
  } catch (err) {
    console.error("Wi-Fi Scan Failed", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// export async function GET() {
//   return Response.json({
//     success: true,
//     drones: ["DJI-Phantom", "Parrot-Drone"],  // fake test data
//   });
// }
