"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";

function SpinningCube() {
  const meshRef = useRef();
  const [color, setColor] = useState("orange");
  const { camera } = useThree();
  const [zoomedIn, setZoomedIn] = useState(false);

  // Spin the cube
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  // Handle click → change color
  const handleClick = () => {
    const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    setColor(randomColor);
  };

  // Handle double-click → zoom camera
  const handleDoubleClick = () => {
    if (zoomedIn) {
      camera.position.set(0, 0, 5); // reset
    } else {
      camera.position.set(0, 0, 2); // zoom closer
    }
    setZoomedIn(!zoomedIn);
  };

  return (
    <mesh
      ref={meshRef}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function InteractiveModel() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      
      {/* Model */}
      <SpinningCube />

      {/* Controls */}
      <OrbitControls />
    </Canvas>
  );
}
