import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { fibSphere, linkPairs, makeGlowTexture, randomShell } from './utils'

const NODE_COUNT_DESKTOP = 30
const NODE_COUNT_MOBILE = 18

function NeuralCoreGroup({
  reduced,
  mobile,
  offsetX = 0,
}: {
  reduced: boolean
  mobile: boolean
  offsetX?: number
}) {
  const core = useRef<THREE.Group>(null!)
  const nodesGroup = useRef<THREE.Group>(null!)
  const particles = useRef<THREE.Points>(null!)
  const pointer = useRef({ x: 0, y: 0 })

  const glow = useMemo(() => makeGlowTexture(), [])

  const { nodePositions, lineGeometry } = useMemo(() => {
    const positions = fibSphere(mobile ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP, 2.35)
    const linePos: number[] = []
    for (const [a, b] of linkPairs(positions, 1.55)) {
      linePos.push(
        positions[a].x, positions[a].y, positions[a].z,
        positions[b].x, positions[b].y, positions[b].z,
      )
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3))
    return { nodePositions: positions, lineGeometry: geometry }
  }, [mobile])

  const particlePositions = useMemo(
    () => randomShell(mobile ? 160 : 420, 3.4, 9.5),
    [mobile],
  )

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      lineGeometry.dispose()
      glow.dispose()
    }
  }, [lineGeometry, glow])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (!reduced) {
      core.current.rotation.y += delta * 0.16
      core.current.rotation.x = Math.sin(t * 0.22) * 0.12
      nodesGroup.current.rotation.y -= delta * 0.07
      particles.current.rotation.y += delta * 0.014
      const breathe = 1 + Math.sin(t * 0.9) * 0.025
      core.current.scale.setScalar(breathe)
    }
    // Pointer parallax around the scene's base offset (direct feedback even reduced).
    core.current.position.x += (offsetX + pointer.current.x * 0.4 - core.current.position.x) * 0.04
    core.current.position.y += (-pointer.current.y * 0.3 - core.current.position.y) * 0.04
    nodesGroup.current.position.x = core.current.position.x
    nodesGroup.current.position.y = core.current.position.y
    particles.current.position.x = offsetX * 0.6
  })

  return (
    <group>
      <group ref={core}>
        {/* Outer neural shell */}
        <mesh>
          <icosahedronGeometry args={[1.55, 1]} />
          <meshBasicMaterial color="#4f7dff" wireframe transparent opacity={0.32} />
        </mesh>
        {/* Inner luminous core */}
        <mesh>
          <icosahedronGeometry args={[1.02, 0]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.5} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.98, 0]} />
          <meshBasicMaterial color="#0b1530" transparent opacity={0.85} />
        </mesh>
        {/* Halo */}
        <sprite scale={[6.4, 6.4, 1]}>
          <spriteMaterial map={glow} transparent opacity={0.5} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
      </group>

      {/* Network nodes + links */}
      <group ref={nodesGroup}>
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial color="#5b8cff" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
        </lineSegments>
        {nodePositions.map((p, i) => (
          <mesh key={i} position={p} scale={i % 5 === 0 ? 1.7 : 1}>
            <icosahedronGeometry args={[0.04, 0]} />
            <meshBasicMaterial color={i % 5 === 0 ? '#22d3ee' : '#8fa9ff'} />
          </mesh>
        ))}
      </group>

      {/* Ambient particles */}
      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          color="#7ea2ff"
          transparent
          opacity={0.65}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

interface NeuralCoreProps {
  active: boolean
  reduced: boolean
  mobile: boolean
}

/** Hero canvas: neural-core with particles. Pauses when offscreen. */
export default function NeuralCore({ active, reduced, mobile }: NeuralCoreProps) {
  return (
    <Canvas
      className="hero-canvas"
      camera={{ position: [0, 0, 7.4], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      style={{ position: 'absolute', inset: 0 }}
    >
      <NeuralCoreGroup reduced={reduced} mobile={mobile} offsetX={mobile ? 0 : 1.9} />
    </Canvas>
  )
}
