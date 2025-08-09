import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import CommitPlanet from './CommitPlanet'

export default function GalaxyScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* central star */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} /> {/* was 0.8 */}
        <meshStandardMaterial color="#ffffff" emissive="#ffaa00" emissiveIntensity={0.6} />
      </mesh>


      <Stars radius={100} depth={90} count={5000} factor={4} />

      {/* two clear orbits with different speeds/tilts/phases */}
      <CommitPlanet orbitRadius={5} orbitSpeed={0.6} initialPhase={0}   color="#ffcc00" size={1.4} />
      <CommitPlanet orbitRadius={8} orbitSpeed={0.35} initialPhase={1.2} color="#00ccff" size={1.0} orbitTilt={0.35} />

      <OrbitControls enableDamping dampingFactor={0.08} />
    </Canvas>
  )
}