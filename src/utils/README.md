# Planet texture utilities

Utilities for generating simple procedural planet textures using the HTML canvas. Textures are returned as `THREE.CanvasTexture` objects and can be used directly in materials.

## `generatePlanetTexture(rng, type, size?)`

* `rng` – Function returning a float in `[0, 1)`. Use `Math.random` or a seeded generator for repeatable results.
* `type` – `'rocky' | 'gas' | 'icy'`
* `size` – Optional texture size in pixels (defaults to `256`). Higher values yield sharper results.

```ts
import { generatePlanetTexture } from './utils/planetTextures'

const texture = generatePlanetTexture(Math.random, 'rocky')
<meshStandardMaterial map={texture} />
```

Planet types:

- **rocky** – noisy brown tones with dark craters
- **gas** – flowing colour bands reminiscent of gas giants
- **icy** – pale blue surface with frosty highlights