import * as THREE from 'three'

/** Soft radial glow texture used for sprites / halos. */
export function makeGlowTexture(inner = 'rgba(125, 170, 255, 0.85)'): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, inner)
  g.addColorStop(0.35, 'rgba(80, 120, 220, 0.28)')
  g.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

/** Evenly distributed points on a sphere (fibonacci lattice). */
export function fibSphere(count: number, radius: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius))
  }
  return pts
}

/** Indices of node pairs whose distance is below `maxDist`, as flat pairs. */
export function linkPairs(points: THREE.Vector3[], maxDist: number): [number, number][] {
  const pairs: [number, number][] = []
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (points[i].distanceTo(points[j]) < maxDist) pairs.push([i, j])
    }
  }
  return pairs
}

/** Random positions inside a spherical shell. */
export function randomShell(count: number, minR: number, maxR: number): Float32Array {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(minR + Math.random() * (maxR - minR))
    arr.set([v.x, v.y, v.z], i * 3)
  }
  return arr
}
