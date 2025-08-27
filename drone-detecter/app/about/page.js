import Link from 'next/link'
import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen bg-gray-950 text-white p-8 relative'>
        <Link href={"/"}>Back</Link>
      <h1 className="text-4xl font-bold text-center mt-4 m-4 mb-8">
        🚨 Drone Detection Program
      </h1>
      <p className='text-left mt-4'>This <span className='font-bold text-cyan-500'>DRONE DETECTION PROGAM</span> developed by <span className='font-bold text-cyan-500'>SAKSHAM KUSHWAHA</span></p>
        <p className='text-left mt-4'>This program is designed to detect nearby drones using a combination of audio and Wi-Fi signal analysis. It leverages the unique sound signatures and Wi-Fi patterns emitted by drones to identify their presence in the vicinity.</p>
        <p className='text-left mt-4'>The audio detection component utilizes advanced signal processing techniques to analyze ambient sounds and identify the distinct noise patterns produced by drone propellers. Simultaneously, the Wi-Fi detection module scans for specific Wi-Fi signals that are commonly associated with drone communication systems.</p>
        <p className='text-left mt-4'>By integrating these two detection methods, the program aims to provide a comprehensive solution for identifying drones in various environments, enhancing security and situational awareness.</p>
        <p className='text-left mt-4'>Whether for personal use, security applications, or regulatory
    compliance, this drone detection program offers a robust tool for monitoring and responding to drone activity.</p>
    <h3 className='font-bold text-cyan-500 mt-4'>How to Use</h3>
    <ul className='list-disc m-1'>
      <li>Allow microphone access when prompted to enable audio detection.</li>
      <li>Ensure your device's Wi-Fi is turned on for Wi-Fi signal scanning.</li>
      <li>Click the "Start" button to Scan nera by drone.</li>
      <li>Monitor the dashboard for real-time alerts on detected drones.</li>
      <li>Click the "Stop Detection" button to halt all detection activities.</li>
    </ul>

    </div>
  )
}

export default About
