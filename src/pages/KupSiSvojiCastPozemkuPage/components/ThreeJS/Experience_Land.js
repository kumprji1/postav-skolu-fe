import { OrbitControls } from "@react-three/drei";

// Objects
import Map from "./Objects/Map";
import LandFrame from "./Objects/LandFrame";
import LandPieces from "./Objects/LandPieces";
import LandPieceToDonate from "./Objects/LandPieceToDonate";
import { MOUSE, TOUCH } from "three";

const Experience_Land = (props) => {
  return (
    <>
      <OrbitControls
        zoomSpeed={1}
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
        makeDefault
      />
      <ambientLight intensity={0.5} />
      {/* <directionalLight intensity={0.5} /> */}
      {/* <axesHelper args={[50, 50, 50]} /> */}
      <Map />
      <LandFrame />
      <LandPieces
        donations={props.donations}
        setSelectedPiece={props.setSelectedPiece}
      />
      // Visualization of the landPiece that donator wants to donate
      {props.priceToDonate && <LandPieceToDonate priceToDonate={props.priceToDonate} />}
    </>
  );
};

export default Experience_Land;
