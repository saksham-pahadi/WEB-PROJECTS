import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";

function Model({ src }) {
  const { scene } = useGLTF(src);
  return <primitive object={scene} scale={1.5} />;
}

export default function SquareRobot({ modelPath }) {
  return (
    <Canvas camera={{ position: [0, 5, 20], fov: 35 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 10]} castShadow />

      {/* 🔥 Automatically centers and scales */}
      <Center>
        <Model src={modelPath} />
      </Center>

      <OrbitControls
        enableRotate
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.2}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={11}
        maxDistance={11}
      />
    </Canvas>
  );
}
