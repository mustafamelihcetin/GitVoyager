const MODULUS = 2147483647
const MULTIPLIER = 16807

export function createRNG(seed: number): () => number {
  let state = seed % MODULUS
  if (state <= 0) state += MODULUS
  return () => {
    state = (state * MULTIPLIER) % MODULUS
    return state / MODULUS
  }
}

export function randRange(rng: () => number, min: number, max: number): number {
  return rng() * (max - min) + min
}