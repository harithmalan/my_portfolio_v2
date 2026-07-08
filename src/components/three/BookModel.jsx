import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'

const MODEL_PATH = '/models/ancient-book.glb'

function BookMesh() {
  const ref = useRef()
  const { scene } = useGLTF(MODEL_PATH)

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.25
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15
    }
  })

  return (
    <group ref={ref} rotation={[0.3, 0, 0]}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

export default function BookModel() {
  return (
    <Canvas camera={{ position: [0, 0.5, 3.2], fov: 40 }} gl={{ alpha: true }} dpr={[1, 1.5]}>
      <ambientLight intensity={1.3} />
      <directionalLight position={[3, 4, 5]} intensity={1} color="#f3efe8" />
      <pointLight position={[-3, -2, 2]} intensity={0.4} color="#c9a46a" />
      <BookMesh />
    </Canvas>
  )
}

useGLTF.preload(MODEL_PATH)
