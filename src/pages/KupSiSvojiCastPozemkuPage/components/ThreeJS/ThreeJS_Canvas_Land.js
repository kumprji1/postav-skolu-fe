import React from "react";

// ThreeJS Stuff
import { Canvas } from "@react-three/fiber";
import Experience_Land from "./Experience_Land";

const ThreeJS_Canvas_Land = (props) => {
  return (
    <Canvas
      className="canvas-land"
      camera={{
        fov: 45,
        near: 0.1,
        far: 5000,
        position: [-76, -8.09, 1000],
      }}
    >
      <Experience_Land
        donations={props.donations}
        priceToDonate={props.priceToDonate}
        setSelectedPiece={props.setSelectedPiece}
      />
    </Canvas>
  );
};

export default ThreeJS_Canvas_Land;
