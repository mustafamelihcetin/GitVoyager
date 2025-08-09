import { useMemo } from 'react'
import * as THREE from 'three'
import CommitPlanet from './CommitPlanet'

export type RandomPlanetProps = {
  seed: number
}

function createRNG(seed: number) {
  let t = seed >>> 0
  return () => {
    t += 0x6D2B79F5
    let x = t
    x = Math.imul(x ^ (x >>> 15), 1 | x)
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x)
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}

function generatePlanetTexture(type: string, rng: () => number): THREE.Texture {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!

  const baseColors: Record<string, string> = {
    rock: '#cc8855',
    gas: '#ffcc66',
    ice: '#aaddff'
  }
  ctx.fillStyle = baseColors[type] ?? '#888'
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 100; i++) {
    const x = rng() * size
    const y = rng() * size
    const r = rng() * 3 + 1
    ctx.fillStyle = `rgba(0,0,0,${rng() * 0.3})`
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  return new THREE.CanvasTexture(canvas)
}

export default function RandomPlanet({ seed }: RandomPlanetProps) {
  const { orbitRadius, orbitSpeed, orbitTilt, size, color, texture } = useMemo(() => {
    const rng = createRNG(seed)
    const orbitRadius = 4 + rng() * 8
    const orbitSpeed = 0.2 + rng() * 0.5
    const orbitTilt = rng() * 0.5
    const size = 0.4 + rng() * 1.2
    const types = ['rock', 'gas', 'ice'] as const
    type PlanetType = typeof types[number]
    const type: PlanetType = types[Math.floor(rng() * types.length)]
    const texture = generatePlanetTexture(type, rng)
    const colorMap: Record<PlanetType, string> = {
      rock: '#cc8855',
      gas: '#ffcc66',
      ice: '#aaddff'
    }
    const color = colorMap[type]
    return { orbitRadius, orbitSpeed, orbitTilt, size, color, texture }
  }, [seed])

  return (
    <CommitPlanet
      orbitRadius={orbitRadius}
      orbitSpeed={orbitSpeed}
      orbitTilt={orbitTilt}
      size={size}
      color={color}
      texture={texture}
    />
  )
}