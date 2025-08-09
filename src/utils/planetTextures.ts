import * as THREE from 'three'

export type PlanetType = 'rocky' | 'gas' | 'icy'

/**
 * Generate a planet surface texture using 2D canvas operations.
 *
 * The function is synchronous and returns a {@link THREE.CanvasTexture}
 * ready to be used in a material. A custom RNG may be supplied to
 * create deterministic results.
 *
 * Planet types:
 * - `rocky` – noisy brown tones with random dark craters
 * - `gas` – flowing horizontal colour bands
 * - `icy` – pale blues with a frosty radial gradient
 *
 * @param rng function returning a float in [0,1)
 * @param type planet surface style
 * @param size texture size in pixels (default 256)
 */
export function generatePlanetTexture(
  rng: () => number,
  type: PlanetType,
  size = 256
): THREE.CanvasTexture {
  if (type === 'rocky') return generateRockyTexture(rng, size)
  if (type === 'gas') return generateGasTexture(rng, size)
  return generateIcyTexture(rng, size)
}

/**
 * Create a rocky planet texture with brown noise and craters.
 */
export function generateRockyTexture(rng: () => number, size = 256): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!

  const img = ctx.createImageData(size, size)
  const data = img.data
  for (let i = 0; i < data.length; i += 4) {
    const v = rng()
    data[i] = 90 + v * 100
    data[i + 1] = 60 + v * 60
    data[i + 2] = 40 + v * 40
    data[i + 3] = 255
  }
  ctx.putImageData(img, 0, 0)

  const craterCount = 15
  for (let i = 0; i < craterCount; i++) {
    const radius = 5 + rng() * 20
    const x = rng() * size
    const y = rng() * size
    ctx.fillStyle = `rgba(0,0,0,${0.1 + rng() * 0.2})`
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * Create a gas giant texture with horizontal colour bands.
 */
export function generateGasTexture(rng: () => number, size = 256): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!

  for (let y = 0; y < size; y++) {
    const t = y / size
    const hue = 30 + Math.sin(t * 10 + rng() * Math.PI) * 20
    const sat = 60 + rng() * 20
    const light = 40 + Math.sin(t * 5 + rng() * Math.PI) * 10
    ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%)`
    ctx.fillRect(0, y, size, 1)
  }

  ctx.globalAlpha = 0.1
  for (let i = 0; i < 3; i++) {
    ctx.drawImage(canvas, -2, 0)
    ctx.drawImage(canvas, 2, 0)
  }
  ctx.globalAlpha = 1

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * Create an icy world texture with a cold radial gradient and subtle noise.
 */
export function generateIcyTexture(rng: () => number, size = 256): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, '#ffffff')
  gradient.addColorStop(1, '#a0c9ff')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  const img = ctx.getImageData(0, 0, size, size)
  const data = img.data
  for (let i = 0; i < data.length; i += 4) {
    const n = rng() * 50
    data[i] = Math.min(255, data[i] + n)
    data[i + 1] = Math.min(255, data[i + 1] + n)
    data[i + 2] = Math.min(255, data[i + 2] + n)
  }
  ctx.putImageData(img, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}