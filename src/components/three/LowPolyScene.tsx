import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { makeGlowTexture } from './utils'

function Spinner({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null!)
  const tex = makeGlowTexture()
  useFrame((_, delta) => {
    if (reduced) return
    group.current.rotation.y += delta * 0.25
    group.current.rotation.x += delta * 0.08
  })
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color="#4f7dff" wireframe transparent opacity={0.4} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.45} />
      </mesh>
      <sprite scale={[4.6, 4.6, 1]}>
        <spriteMaterial map={tex} transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </group>
  )
}

/** Reduced-complexity fallback for low-end devices. */
export default function LowPolyScene({ active, reduced }: { active: boolean; reduced: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.25]}
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Spinner reduced={reduced} />
    </Canvas>
  )
}
