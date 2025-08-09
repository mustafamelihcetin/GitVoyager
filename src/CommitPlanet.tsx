import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Line } from '@react-three/drei'

type CommitPlanetProps = {
  orbitRadius?: number          // distance from center
  orbitSpeed?: number           // radians per second
  initialPhase?: number         // start angle (radians)
  orbitTilt?: number            // tilt of orbit plane (radians)
  color?: string
  size?: number                 // requested size (will be clamped)
  showRing?: boolean            // draw orbit ring
  texture?: THREE.Texture       // optional surface texture
}

export default function CommitPlanet({
  orbitRadius = 5,
  orbitSpeed = 0.5,
  initialPhase = 0,
  orbitTilt = 0,
  color = '#00ffcc',
  size = 1,
  showRing = true,
  texture
}: CommitPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const angleRef = useRef(initialPhase)
  const groupRef = useRef<THREE.Group>(null!)

  // keep planets visually smaller than the sun
  const MIN_SIZE = 0.2
  const MAX_SIZE = 0.6
  const clampedSize = Math.max(MIN_SIZE, Math.min(size, MAX_SIZE))

  useFrame((_, delta) => {
    angleRef.current += orbitSpeed * delta
    const x = Math.cos(angleRef.current) * orbitRadius
    const z = Math.sin(angleRef.current) * orbitRadius
    if (meshRef.current) {
      meshRef.current.position.set(x, 0, z)
      meshRef.current.rotation.y += 0.01 // self-rotation (spin)
    }
  })

  return (
    <group ref={groupRef} rotation={[orbitTilt, 0, 0]}>
      {showRing && <OrbitRing radius={orbitRadius} />}
      <mesh ref={meshRef}>
        <sphereGeometry args={[clampedSize, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
          map={texture}
        />
      </mesh>
    </group>
  )
}

function OrbitRing({ radius }: { radius: number }) {
  const points = Array.from({ length: 129 }, (_, i) => {
    const t = (i / 128) * Math.PI * 2
    return [Math.cos(t) * radius, 0, Math.sin(t) * radius] as [number, number, number]
  })

  return (
    <Line
      points={points}
      color="#555"
      transparent
      opacity={0.6}
    />
  )
}