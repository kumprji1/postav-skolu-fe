import React, { useEffect, useState } from "react";

// ThreeJS Stuff
import { Canvas } from "@react-three/fiber";
import Experience_Land from "./Experience_Land";

const ThreeJS_Canvas_Land = (props) => {
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])


  return (
    <Canvas
      className="canvas-land"
      camera={{
        fov: 45,
        near: 0.1,
        far: 5000,
        position: [0, 0, 1000],
      }}
      // Events
      onPointerEnter={(e) => {
              setHovered(true)
            }}
            onPointerOut={(e) => {
              setHovered(false)
            }}
      
    >
      <Experience_Land
        donations={props.donations}
        priceToDonate={props.priceToDonate}
        // setSelectedPiece={props.setSelectedPiece}
      />
    </Canvas>
  );
};

export default ThreeJS_Canvas_Land;
