"use client"; // for Next.js 13+ app directory

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";

function Model({ src}) {

  
  const { scene } = useGLTF(src);
  return <primitive object={scene} scale={1.5} />;
}

export default function ModelViewer({ modelPath }) {
  const meshRef = useRef();



  return (


    <Canvas camera={{ position: [0, 5, 20], fov: 35 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 1]} castShadow />


      <Model src={modelPath} position={[0, -2, 0]} />
      
      <OrbitControls
        enableRotate
        enableZoom={false}
        enablePan={false}
        
        minPolarAngle={Math.PI / 2.4}
        maxPolarAngle={Math.PI / 2.4}
        minDistance={22}
        maxDistance={22}
      />
    </Canvas>

  );
}
