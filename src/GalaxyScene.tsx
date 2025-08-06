import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'

export default function GalaxyScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} />
      <OrbitControls />
    </Canvas>
  )
}
