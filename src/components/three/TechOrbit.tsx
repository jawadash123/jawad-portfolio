import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function OrbitNode({
  label,
  angle,
  radius,
  speed,
  color,
  reduced,
}: {
  label: string
  angle: number
  radius: number
  speed: number
  color: string
  reduced: boolean
}) {
  const group = useRef<THREE.Group>(null!)
  const labelLines = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 64
    const ctx = canvas.getContext('2d')!
    ctx.font = '500 26px "JetBrains Mono", monospace'
    ctx.fillStyle = 'rgba(214, 226, 255, 0.92)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, 128, 34)
    return new THREE.CanvasTexture(canvas)
  }, [label])

  const staticPos: [number, number, number] = [
    Math.cos(angle) * radius,
    Math.sin(angle * 0.9) * 0.5,
    Math.sin(angle) * radius,
  ]

  useFrame(({ clock }) => {
    if (reduced) return
    const a = angle + clock.elapsedTime * speed
    group.current.position.set(Math.cos(a) * radius, Math.sin(a * 0.9) * 0.5, Math.sin(a) * radius)
  })

  return (
    <group ref={group} position={staticPos}>
      <mesh>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <sprite position={[0, 0.32, 0]} scale={[1.15, 0.29, 1]}>
        <spriteMaterial map={labelLines} transparent depthWrite={false} />
      </sprite>
    </group>
  )
}

function OrbitRings({ reduced }: { reduced: boolean }) {
  const g1 = useRef<THREE.Group>(null!)
  const g2 = useRef<THREE.Group>(null!)
  useFrame((_, delta) => {
    if (reduced) return
    g1.current.rotation.y += delta * 0.06
    g2.current.rotation.y -= delta * 0.04
  })
  return (
    <>
      <group ref={g1} rotation={[0.42, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.5, 0.008, 8, 96]} />
          <meshBasicMaterial color="#5b8cff" transparent opacity={0.3} />
        </mesh>
      </group>
      <group ref={g2} rotation={[1.05, 0.3, 0]}>
        <mesh>
          <torusGeometry args={[3.15, 0.008, 8, 96]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.22} />
        </mesh>
      </group>
    </>
  )
}

/** Technology nodes orbiting the central AI core (core itself is DOM). */
export default function TechOrbit({
  items,
  active,
  reduced,
}: {
  items: string[]
  active: boolean
  reduced: boolean
}) {
  const nodes = useMemo(
    () =>
      items.map((label, i) => ({
        label,
        angle: (i / items.length) * Math.PI * 2,
        radius: 2.35 + (i % 3) * 0.42,
        speed: 0.16 + (i % 4) * 0.025,
        color: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#5b8cff' : '#a78bfa',
      })),
    [items],
  )

  return (
    <Canvas
      camera={{ position: [0, 1.4, 7], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      style={{ position: 'absolute', inset: 0 }}
    >
      <OrbitRings reduced={reduced} />
      {nodes.map((n) => (
        <OrbitNode key={n.label} {...n} reduced={reduced} />
      ))}
    </Canvas>
  )
}
