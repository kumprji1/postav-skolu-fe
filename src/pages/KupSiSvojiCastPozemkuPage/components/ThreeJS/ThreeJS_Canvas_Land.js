import React from 'react'

// ThreeJS Stuff
import { Canvas } from '@react-three/fiber'
import Experience_Land from './Experience_Land'

const ThreeJS_Canvas_Land = (props) => {
  return (
    <Canvas
    camera={{
        fov: 45,
        near: 0.1,
        far: 5000,
        position: [-76, -8.09, 1713]
    }}>
        <Experience_Land donations={props.donations} priceToDonate={props.priceToDonate} />
    </Canvas>
  )
}

export default ThreeJS_Canvas_Land