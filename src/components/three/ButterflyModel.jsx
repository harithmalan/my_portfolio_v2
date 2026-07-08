import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Center } from '@react-three/drei'

const MODEL_PATH = '/models/butterfly.glb'

function tintMaterials(scene) {
  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      mats.forEach((mat) => {
        if (mat.color) mat.color.set('#e8c893')
        if (mat.emissive) mat.emissive.set('#3a2f1c')
        mat.transparent = true
      })
    }
  })
}

function Butterfly() {
  const group = useRef()
  const { scene, animations } = useGLTF(MODEL_PATH)

  useEffect(() => {
    tintMaterials(scene)
  }, [scene])

  const { actions } = useAnimations(animations, group)
  // useEffect(() => {
  //   const action = actions?.['Take 001'] || Object.values(actions)[0]
  //   action?.reset().play()
  // }, [actions])

  useFrame((state) => {
    if (!group.current) return
    // const t = state.clock.elapsedTime
    // group.current.position.x = Math.sin(t * 0.4) * 0.6
    // group.current.position.y = Math.sin(t * 0.7) * 0.35
    // group.current.rotation.y = Math.sin(t * 0.3) * 0.5
  })

  return (
    <group ref={group} scale={[0.9, 0.9, 0.9]}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

export default function ButterflyModel() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }} dpr={[1, 1.5]}>
      <ambientLight intensity={2.5} />
      <directionalLight position={[2, 3, 4]} intensity={1.5} color="#FFFFFF" />
      <Butterfly />
    </Canvas>
  )
}

useGLTF.preload(MODEL_PATH)
