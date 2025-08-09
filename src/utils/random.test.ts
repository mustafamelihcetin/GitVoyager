import { describe, it, expect } from 'vitest'
import { createRNG, randRange } from './random.ts'

describe('createRNG', () => {
  it('produces the same sequence for identical seeds', () => {
    const rng1 = createRNG(123)
    const rng2 = createRNG(123)
    const seq1 = [rng1(), rng1(), rng1()]
    const seq2 = [rng2(), rng2(), rng2()]
    expect(seq1).toEqual(seq2)
  })

  it('randRange uses the RNG and stays within bounds', () => {
    const rng = createRNG(42)
    const values = Array.from({ length: 5 }, () => randRange(rng, 10, 20))
    for (const v of values) {
      expect(v).toBeGreaterThanOrEqual(10)
      expect(v).toBeLessThan(20)
    }
    const rngAgain = createRNG(42)
    const values2 = Array.from({ length: 5 }, () => randRange(rngAgain, 10, 20))
    expect(values).toEqual(values2)
  })
})