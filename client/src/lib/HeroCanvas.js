import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function Core() {
  const meshRef = useRef();
  useFrame((state) => {
    const { mouse } = state;
    meshRef.current.rotation.y += 0.001 + Math.abs(mouse.x * 0.005);
    meshRef.current.rotation.x += 0.0005;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 4]} />
      <meshStandardMaterial 
        color="#EAEAEA"
        emissive="#141414"
        metalness={0.9}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <div id="hero-canvas">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[2, 3, 4]} intensity={2.0} />
        <Core />
      </Canvas>
    </div>
  );
}