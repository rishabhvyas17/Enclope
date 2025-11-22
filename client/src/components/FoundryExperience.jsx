import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Sparkles, Grid } from '@react-three/drei';
import * as THREE from 'three';

// A simple sphere to represent a person/builder
const Builder = (props) => (
  <mesh {...props}>
    <sphereGeometry args={[0.2, 32, 32]} />
    <meshStandardMaterial color="#A1A1A1" metalness={0.8} roughness={0.3} />
  </mesh>
);

export default function FoundryExperience({ progress }) {
  const groupRef = useRef(); // For the group of teammates
  const mainBuilderRef = useRef(); // For the main builder
  
  // The animation loop, which runs on every frame
  useFrame((state) => {
    const t = progress.get(); // Get the current scroll progress (a value from 0 to 1)
    
    // Animate the camera based on the overall scroll
    state.camera.position.z = THREE.MathUtils.lerp(10, 5, t);
    
    // Choreograph the team gathering between scroll 5% and 33%
    const gatheringProgress = THREE.MathUtils.mapLinear(t, 0.05, 0.33, 0, 1);
    
    // Animate each team member from their start position to form a circle
    groupRef.current.children.forEach((child, index) => {
      const angle = (index / groupRef.current.children.length) * Math.PI * 2;
      const radius = 2.5;
      child.position.x = THREE.MathUtils.lerp(child.userData.initialPosition.x, Math.cos(angle) * radius, gatheringProgress);
      child.position.y = THREE.MathUtils.lerp(child.userData.initialPosition.y, 0, gatheringProgress);
      child.position.z = THREE.MathUtils.lerp(child.userData.initialPosition.z, Math.sin(angle) * radius, gatheringProgress);
    });
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      
      <group ref={mainBuilderRef}>
        <Builder />
        <Sparkles count={50} scale={1.2} size={8} speed={0.4} color="#ff8c00" />
      </group>

      <group ref={groupRef}>
        <Builder ref={el => el && (el.userData.initialPosition = el.position.clone())} position={[-10, 5, -15]} />
        <Builder ref={el => el && (el.userData.initialPosition = el.position.clone())} position={[10, -5, -12]} />
        <Builder ref={el => el && (el.userData.initialPosition = el.position.clone())} position={[-15, -8, -10]} />
        <Builder ref={el => el && (el.userData.initialPosition = el.position.clone())} position={[15, 8, -18]} />
      </group>
    </>
  );
}