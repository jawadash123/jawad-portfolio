import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ProjectVisual } from '../../data/projects'
import { makeGlowTexture } from './utils'

/* ────────────────────────────────────────────────────────────────
   Shared building blocks
   ──────────────────────────────────────────────────────────────── */

function Panel({
  position,
  scale = 1,
  color = '#131f3a',
  edge = '#5b8cff',
  edgeOpacity = 0.8,
}: {
  position: [number, number, number]
  scale?: number
  color?: string
  edge?: string
  edgeOpacity?: number
}) {
  return (
    <group position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[1.3, 0.9, 0.06]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.3, 0.9, 0.06)]} />
        <lineBasicMaterial color={edge} transparent opacity={edgeOpacity} />
      </lineSegments>
    </group>
  )
}

/** Glowing travelling packet along a straight path. */
function Packet({ from, to, speed, offset, color = '#22d3ee' }: {
  from: THREE.Vector3
  to: THREE.Vector3
  speed: number
  offset: number
  color?: string
}) {
  const ref = useRef<THREE.Mesh>(null!)
  const glow = useMemo(() => makeGlowTexture(`rgba(180, 220, 255, 0.9)`), [])
  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * speed + offset) % 1
    ref.current.position.lerpVectors(from, to, t)
    const s = Math.sin(t * Math.PI) * 1.1 + 0.4
    ref.current.scale.setScalar(s)
  })
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.055, 10, 10]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <PacketGlow glow={glow} from={from} to={to} speed={speed} offset={offset} color={color} />
    </group>
  )
}

function PacketGlow({ glow, from, to, speed, offset, color }: {
  glow: THREE.Texture
  from: THREE.Vector3
  to: THREE.Vector3
  speed: number
  offset: number
  color: string
}) {
  const ref = useRef<THREE.Sprite>(null!)
  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * speed + offset) % 1
    ref.current.position.lerpVectors(from, to, t)
    const s = Math.sin(t * Math.PI) * 1.6 + 0.5
    ref.current.scale.set(s, s, 1)
  })
  return (
    <sprite ref={ref} scale={[1, 1, 1]}>
      <spriteMaterial
        map={glow}
        color={color}
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  )
}

function ChannelRings({ count = 3, radius = 2.6 }: { count?: number; radius?: number }) {
  const group = useRef<THREE.Group>(null!)
  useFrame((_, delta) => {
    group.current.rotation.z += delta * 0.05
  })
  return (
    <group ref={group}>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i} rotation={[Math.PI / 2.4, 0, (i / count) * Math.PI]}>
          <torusGeometry args={[radius + i * 0.34, 0.01, 8, 96]} />
          <meshBasicMaterial color="#6f9bff" transparent opacity={0.45 - i * 0.1} />
        </mesh>
      ))}
    </group>
  )
}

function SceneRig({ children, reduced }: { children: React.ReactNode; reduced: boolean }) {
  const group = useRef<THREE.Group>(null!)
  useFrame(({ clock }) => {
    if (reduced) return
    const t = clock.elapsedTime
    group.current.rotation.y = Math.sin(t * 0.16) * 0.24
    group.current.rotation.x = Math.sin(t * 0.11) * 0.07
    group.current.position.y = Math.sin(t * 0.5) * 0.06
  })
  return <group ref={group}>{children}</group>
}

/* ────────────────────────────────────────────────────────────────
   01 — Aegis: channels → AI core → tenant/knowledge panels
   ──────────────────────────────────────────────────────────────── */

function AegisScene({ reduced }: { reduced: boolean }) {
  const channels = useMemo(
    () => [
      new THREE.Vector3(-3.3, 1.35, 0),
      new THREE.Vector3(-3.55, 0.45, 0.2),
      new THREE.Vector3(-3.3, -0.45, -0.1),
      new THREE.Vector3(-3.55, -1.35, 0.1),
      new THREE.Vector3(-2.9, -2.05, 0),
    ],
    [],
  )
  const core = useMemo(() => new THREE.Vector3(0, 0, 0), [])
  const outputs = useMemo(
    () => [new THREE.Vector3(3.3, 0.9, -0.1), new THREE.Vector3(3.5, -0.4, 0.15), new THREE.Vector3(3.05, -1.6, 0)],
    [],
  )
  const glow = useMemo(() => makeGlowTexture(), [])

  return (
    <SceneRig reduced={reduced}>
      <ChannelRings />
      <group>
        <mesh>
          <icosahedronGeometry args={[0.72, 1]} />
          <meshBasicMaterial color="#5b8cff" wireframe transparent opacity={0.75} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshBasicMaterial color="#12224a" />
        </mesh>
        <sprite scale={[3.6, 3.6, 1]}>
          <spriteMaterial map={glow} transparent opacity={0.65} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
      </group>

      {channels.map((p, i) => (
        <Panel key={i} position={[p.x, p.y, p.z]} scale={0.62} color="#101c38" edgeOpacity={0.7} />
      ))}
      {outputs.map((p, i) => (
        <Panel key={i} position={[p.x, p.y, p.z]} scale={0.68} color="#161533" edge="#a78bfa" edgeOpacity={0.8} />
      ))}

      {channels.flatMap((p, i) => [
        <Packet key={`pk-${i}`} from={p} to={core} speed={0.34 + (i % 3) * 0.06} offset={i * 0.19} />,
        <Packet
          key={`pr-${i}`}
          from={core}
          to={outputs[i % outputs.length]}
          speed={0.3 + (i % 2) * 0.07}
          offset={0.1 + i * 0.13}
          color="#a78bfa"
        />,
      ])}
    </SceneRig>
  )
}

/* ────────────────────────────────────────────────────────────────
   02 — DRS: pitch plane, tracked ball, predicted path
   ──────────────────────────────────────────────────────────────── */

function DrsScene({ reduced }: { reduced: boolean }) {
  const ball = useRef<THREE.Group>(null!)
  const trail = useRef<THREE.Points>(null!)
  const TRACK_N = 46

  const trailPositions = useMemo(() => {
    const arr = new Float32Array(TRACK_N * 3)
    arr.fill(999)
    return arr
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const period = 3.6
    const p = (t % period) / period
    if (!reduced) {
      const x = -4.2 + p * 8.4
      const y = 0.9 + Math.sin(p * Math.PI) * 1.6 - p * 0.75
      const z = Math.sin(p * Math.PI * 2) * 0.4
      ball.current.position.set(x, y, z)
      const attr = trail.current.geometry.getAttribute('position') as THREE.BufferAttribute
      const arr = attr.array as Float32Array
      arr.copyWithin(0, 3)
      arr.set([x, y, z], (TRACK_N - 1) * 3)
      attr.needsUpdate = true
    }
  })

  return (
    <SceneRig reduced={reduced}>
      {/* Pitch surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.75, 0]}>
        <planeGeometry args={[11.4, 5.4]} />
        <meshBasicMaterial color="#101d3d" />
      </mesh>
      <gridHelper args={[11.4, 20, '#31497e', '#1e2f57']} position={[0, -1.74, 0]} />
      {/* Crease lines */}
      <mesh position={[-3.6, -1.73, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.06, 4.4]} />
        <meshBasicMaterial color="#4a6db3" />
      </mesh>
      <mesh position={[3.6, -1.73, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.06, 4.4]} />
        <meshBasicMaterial color="#4a6db3" />
      </mesh>
      {/* Stumps */}
      {[-0.3, 0, 0.3].map((dx) => (
        <mesh key={dx} position={[4.55, -1.15, dx]}>
          <cylinderGeometry args={[0.045, 0.045, 1.2, 8]} />
          <meshBasicMaterial color="#aebfff" />
        </mesh>
      ))}
      {/* Detected ball + bounding box (static mid-flight position for reduced motion) */}
      <group ref={ball} position={[0.8, 1.35, 0]}>
        <mesh>
          <sphereGeometry args={[0.1, 14, 14]} />
          <meshBasicMaterial color="#ff4d6d" />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.52, 0.52, 0.52)]} />
          <lineBasicMaterial color="#35e0ff" transparent opacity={0.95} />
        </lineSegments>
      </group>
      {/* Tracking trail */}
      <points ref={trail}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[trailPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.085} color="#35e0ff" transparent opacity={0.9} depthWrite={false} />
      </points>
      {/* Predicted path to stumps */}
      <mesh position={[2.45, 0.15, 0]} rotation={[0, 0, -0.28]}>
        <planeGeometry args={[4.7, 0.035]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.9} />
      </mesh>
      <mesh position={[4.45, -0.62, 0]}>
        <planeGeometry args={[0.32, 0.32]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.28} />
      </mesh>
    </SceneRig>
  )
}

/* ────────────────────────────────────────────────────────────────
   03 — Number plate: camera frame → detection box → OCR bar
   ──────────────────────────────────────────────────────────────── */

function PlateScene({ reduced }: { reduced: boolean }) {
  const scan = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    if (reduced) return
    const p = (Math.sin(clock.elapsedTime * 0.9) + 1) / 2
    scan.current.position.y = -0.62 + p * 1.24
    ;(scan.current.material as THREE.MeshBasicMaterial).opacity = 0.8 * (1 - Math.abs(p - 0.5) * 0.7)
  })
  return (
    <SceneRig reduced={reduced}>
      <Panel position={[0, 0, 0]} scale={3.2} color="#0c1730" edge="#5b8cff" edgeOpacity={0.85} />
      {/* Car abstraction */}
      <group position={[0, -0.3, 0.2]} scale={1.5}>
        <mesh>
          <boxGeometry args={[2.5, 0.5, 0.04]} />
          <meshBasicMaterial color="#1b2c52" />
        </mesh>
        <mesh position={[0, 0.44, 0]}>
          <boxGeometry args={[1.3, 0.42, 0.04]} />
          <meshBasicMaterial color="#22375f" />
        </mesh>
        <mesh position={[-0.72, -0.38, 0.05]}>
          <cylinderGeometry args={[0.19, 0.19, 0.06, 16]} />
          <meshBasicMaterial color="#0e1a33" />
        </mesh>
        <mesh position={[0.72, -0.38, 0.05]}>
          <cylinderGeometry args={[0.19, 0.19, 0.06, 16]} />
          <meshBasicMaterial color="#0e1a33" />
        </mesh>
      </group>
      {/* License plate frame + glyph bars */}
      <lineSegments position={[0.15, -0.66, 0.3]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.98, 0.3, 0.02)]} />
        <lineBasicMaterial color="#35e0ff" />
      </lineSegments>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <mesh key={i} position={[-0.11 + i * 0.088, -0.66, 0.32]}>
          <planeGeometry args={[0.048, 0.12 + ((i * 7) % 5) * 0.024]} />
          <meshBasicMaterial color="#9db8ff" />
        </mesh>
      ))}
      {/* Scanline */}
      <mesh ref={scan} position={[0, 0, 0.34]}>
        <planeGeometry args={[4.2, 0.03]} />
        <meshBasicMaterial color="#35e0ff" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>
    </SceneRig>
  )
}

/* ────────────────────────────────────────────────────────────────
   04 — Emotion: rotating face point cloud + emotion state bars
   ──────────────────────────────────────────────────────────────── */

const EMOTIONS = ['ANGRY', 'DISGUST', 'FEAR', 'HAPPY', 'NEUTRAL', 'SAD', 'SURPRISE'] as const

function EmotionScene({ reduced }: { reduced: boolean }) {
  const head = useRef<THREE.Group>(null!)
  const bars = useRef<THREE.Group>(null!)
  const activeIdx = useRef(4)
  const timer = useRef(0)

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < 110; i++) {
      const v = new THREE.Vector3().randomDirection()
      v.z = Math.abs(v.z) * 0.7
      v.multiplyScalar(1.1)
      pts.push(v)
    }
    return pts
  }, [])

  useFrame((state, delta) => {
    if (reduced) return
    head.current.rotation.y += delta * 0.24
    timer.current += delta
    if (timer.current > 1.2) {
      timer.current = 0
      activeIdx.current = (activeIdx.current + 1) % EMOTIONS.length
      bars.current.children.forEach((child, i) => {
        const mesh = (child as THREE.Group).children[0] as THREE.Mesh
        const mat = mesh.material as THREE.MeshBasicMaterial
        const is = i === activeIdx.current
        mat.color.set(is ? '#35e0ff' : '#2c3d63')
        mat.opacity = is ? 1 : 0.85
        mesh.scale.x = is ? 1.18 : 1
      })
    }
    bars.current.lookAt(state.camera.position)
  })

  return (
    <SceneRig reduced={reduced}>
      <group position={[-0.55, 0, 0]} ref={head}>
        {points.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.026, 6, 6]} />
            <meshBasicMaterial color="#7ea2ff" />
          </mesh>
        ))}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.7, 2.1, 1.0)]} />
          <lineBasicMaterial color="#41598c" transparent opacity={0.55} />
        </lineSegments>
      </group>
      <group ref={bars} position={[1.75, 1.05, 0.4]}>
        {EMOTIONS.map((e, i) => (
          <group key={e} position={[0, -i * 0.36, 0]}>
            <mesh>
              <planeGeometry args={[0.95, 0.22]} />
              <meshBasicMaterial color="#2c3d63" transparent opacity={0.85} />
            </mesh>
          </group>
        ))}
      </group>
    </SceneRig>
  )
}

/* ────────────────────────────────────────────────────────────────
   05 — Bot: event cards falling into a scheduler core
   ──────────────────────────────────────────────────────────────── */

function BotScene({ reduced }: { reduced: boolean }) {
  const cards = useRef<THREE.Group>(null!)
  const N = 5
  useFrame(({ clock }) => {
    if (reduced) return
    cards.current.children.forEach((card, i) => {
      const p = (clock.elapsedTime * 0.22 + i / N) % 1
      card.position.y = 2.1 - p * 4.2
      card.position.x = Math.sin(i * 2.1) * 0.55
      const mat = ((card as THREE.Group).children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial
      mat.opacity = Math.sin(p * Math.PI) * 0.95
      card.rotation.z = Math.sin(p * Math.PI) * 0.12
    })
  })
  return (
    <SceneRig reduced={reduced}>
      <mesh>
        <torusGeometry args={[0.95, 0.045, 8, 72]} />
        <meshBasicMaterial color="#6f9bff" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.95, 0.045, 8, 72]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.85} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.42, 0]} />
        <meshBasicMaterial color="#35e0ff" wireframe transparent opacity={0.85} />
      </mesh>
      <group ref={cards}>
        {Array.from({ length: N }, (_, i) => (
          <group key={i} position={[Math.sin(i * 2.1) * 0.55, 1.68 - i * 0.85, 0]}>
            <mesh>
              <planeGeometry args={[0.78, 0.28]} />
              <meshBasicMaterial color="#9db8ff" transparent opacity={0.7} side={THREE.DoubleSide} />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(0.78, 0.28)]} />
              <lineBasicMaterial color="#c4d4ff" transparent opacity={0.9} />
            </lineSegments>
          </group>
        ))}
      </group>
    </SceneRig>
  )
}

/* ────────────────────────────────────────────────────────────────
   Exported canvas switch
   ──────────────────────────────────────────────────────────────── */

const SCENES: Record<ProjectVisual, (p: { reduced: boolean }) => React.ReactElement> = {
  aegis: AegisScene,
  drs: DrsScene,
  plate: PlateScene,
  emotion: EmotionScene,
  bot: BotScene,
}

export default function ProjectVisualCanvas({
  visual,
  active,
  reduced,
}: {
  visual: ProjectVisual
  active: boolean
  reduced: boolean
}) {
  const Scene = SCENES[visual]
  return (
    <Canvas
      camera={{ position: [0, 0.4, 7.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power', preserveDrawingBuffer: true }}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene reduced={reduced} />
    </Canvas>
  )
}
