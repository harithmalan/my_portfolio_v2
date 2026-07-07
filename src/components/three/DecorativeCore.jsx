import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Icosahedron } from '@react-three/drei'

export default function DecorativeCore({ scale = 1 }) {
  const ref = useRef()
  const inner = useRef()
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.08
      ref.current.rotation.y += delta * 0.12
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.05
    }
  })
  return (
    <group scale={scale}>
      <Icosahedron ref={ref} args={[1.3, 1]}>
        <meshBasicMaterial color="#c9a46a" wireframe transparent opacity={0.4} />
      </Icosahedron>
      <Icosahedron ref={inner} args={[0.7, 0]}>
        <meshBasicMaterial color="#f3efe8" wireframe transparent opacity={0.25} />
      </Icosahedron>
    </group>
  )
}
