import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Icosahedron, Torus, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef()
  const count = 600
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3.2 + Math.random() * 1.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#c9a46a" size={0.02} sizeAttenuation depthWrite={false} opacity={0.45} />
    </Points>
  )
}

export default function SignalCore({ scrollProgress }) {
  const coreRef = useRef()
  const ring1 = useRef()
  const ring2 = useRef()
  const group = useRef()

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.12
      coreRef.current.rotation.y += delta * 0.18
    }
    if (ring1.current) ring1.current.rotation.x = t * 0.25
    if (ring2.current) ring2.current.rotation.y = t * 0.2

    if (group.current) {
      // gentle mouse-follow tilt
      const targetX = (state.pointer.y * 0.25)
      const targetY = (state.pointer.x * 0.25)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.04)
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.04)
      // scroll-driven scale/position
      const progress = scrollProgress ? scrollProgress.get() : 0
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -progress * 1.4, 0.06)
      const s = 1 - progress * 0.25
      group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, s, 0.06))
    }
  })

  return (
    <group ref={group}>
      <Icosahedron ref={coreRef} args={[1.15, 1]}>
        <meshBasicMaterial color="#c9a46a" wireframe transparent opacity={0.75} />
      </Icosahedron>
      <Icosahedron args={[1.15, 1]} scale={1.001}>
        <meshBasicMaterial color="#0d0c0a" transparent opacity={0.55} />
      </Icosahedron>
      <Torus ref={ring1} args={[1.9, 0.006, 16, 100]}>
        <meshBasicMaterial color="#f3efe8" transparent opacity={0.4} />
      </Torus>
      <Torus ref={ring2} args={[2.3, 0.004, 16, 100]} rotation={[Math.PI / 2.3, 0, 0]}>
        <meshBasicMaterial color="#c9a46a" transparent opacity={0.3} />
      </Torus>
      <ParticleField />
    </group>
  )
}
