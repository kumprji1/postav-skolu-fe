import { OrbitControls } from "@react-three/drei";

// Objects
import Map from "./Objects/Map";
import LandFrame from "./Objects/LandFrame";
import LandPieces from "./Objects/LandPieces";
import LandPieceToDonate from "./Objects/LandPieceToDonate";
import { MOUSE, TOUCH } from "three";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const Experience_Land = (props) => {
  const three = useThree();

  useEffect(() => {
    console.log(three)

  }, [three])
  
  return (
    <>
      <OrbitControls
        zoomSpeed={3}
        mouseButtons={{
          LEFT: MOUSE.PAN,
          RIGHT: MOUSE.PAN,
          MIDDLE: MOUSE.DOLLY,
        }}
        touches={{
          ONE: TOUCH.PAN,
          TWO: TOUCH.DOLLY_PAN
        }}
        maxDistance={1713}
        minDistance={40}
        maxAzimuthAngle={Math.PI / 96}
        minAzimuthAngle={-Math.PI / 96}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        makeDefault
      />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} />
      {/* <axesHelper args={[50, 50, 50]} /> */}
      <Map />
      <LandFrame />
      <LandPieces
        donations={props.donations}
        // setSelectedPiece={props.setSelectedPiece}
      />
      // Visualization of the landPiece that donator wants to donate
      {props.priceToDonate && <LandPieceToDonate priceToDonate={props.priceToDonate} />}
    </>
  );
};

export default Experience_Land;
