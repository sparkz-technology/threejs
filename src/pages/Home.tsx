import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'

import Loader from '../components/Loader'
import { Bird, Island, Plane, Sky } from '../models'

const Home: React.FC = () => {
  const [isRotating, setIsRotating] = useState(false)
  const [currentStage, setCurrentStage] = useState<number | null>(1)
  // ? Adjust the island for screen size
  const adjustIslandForScreenSize = () => {
    let screenScale: number[] = [1, 1, 1]
    let screenPosition: number[] = [0, -6.5, -43]
    let screenRotation: number[] = [0.1, 4.7, 0]
    if (window.innerWidth < 768) {
      screenScale = [0.5, 0.5, 0.5]
    }
    return { screenScale, screenPosition, screenRotation }
  }

  const { screenScale, screenPosition, screenRotation } =
    adjustIslandForScreenSize()
  // ? Adjust the plane for screen size

  const adjustPlaneForScreenSize = () => {
    let planeScale: number[]
    let planePosition: number[]
    if (window.innerWidth < 768) {
      planeScale = [1.5, 1.5, 1.5]
      planePosition = [0, -1.5, 0]
    } else {
      planeScale = [3, 3, 3]
      planePosition = [0, -4, -4]
    }
    return { planeScale, planePosition }
  }
  const { planeScale, planePosition } = adjustPlaneForScreenSize()
  return (
    <section className="w-full h-screen relative">
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            groundColor="#000000"
            // skyColor="#b1e1ff"
            intensity={1}
          />
          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            position={screenPosition}
            scale={screenScale}
            rotation={screenRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            position={planePosition}
            rotation={[0, 20, 0]}
            scale={planeScale}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home
