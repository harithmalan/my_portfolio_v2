import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Clone } from '@react-three/drei'

const MODEL_PATH = '/models/birds.glb'

function tintMaterials(scene) {
  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      mats.forEach((mat) => {
        if (mat.color) mat.color.set('#c9a46a')
        if (mat.emissive) mat.emissive.set('#3a2f1c')
        if ('metalness' in mat) mat.metalness = 0.15
        if ('roughness' in mat) mat.roughness = 0.65
      })
    }
  })
}

function Bird({ startX, y, z, speed, scale, phase }) {
  const group = useRef()
  const { scene, animations } = useGLTF(MODEL_PATH)

  useEffect(() => {
    tintMaterials(scene)
  }, [scene])

  const { actions, mixer } = useAnimations(animations, group)

  useEffect(() => {
    const action = actions?.Scene || Object.values(actions)[0]
    if (action) {
      action.reset().play()
      if (mixer) mixer.timeScale = 1.1 + (phase % 3) * 0.15
    }
  }, [actions, mixer, phase])

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.position.x += delta * speed
    if (group.current.position.x > 15) group.current.position.x = -15
    group.current.position.y = y + Math.sin(state.clock.elapsedTime * 0.5 + phase) * 0.5
  })

  return (
    <group ref={group} position={[startX, y, z]} scale={scale} rotation={[0, Math.PI / 2, 0]}>
      <Clone object={scene} />
    </group>
  )
}

const FLOCK = [
  { startX: -9, y: 3.4, z: -3, speed: 0.85, scale: 0.32, phase: 0 },
  { startX: -3, y: 2.5, z: -5, speed: 0.65, scale: 0.24, phase: 1.6 },
  { startX: 3, y: 3.8, z: -4, speed: 0.75, scale: 0.28, phase: 3.1 },
  { startX: -13, y: 1.7, z: -6, speed: 0.55, scale: 0.2, phase: 4.6 },
]

function Flock() {
  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      {FLOCK.map((b, i) => (
        <Bird key={i} {...b} />
      ))}
    </>
  )
}

export default function AmbientBirds3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.5]}>
        <Flock />
      </Canvas>
    </div>
  )
}

useGLTF.preload(MODEL_PATH)
