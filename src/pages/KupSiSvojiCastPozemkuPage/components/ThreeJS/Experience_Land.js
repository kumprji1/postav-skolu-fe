import { OrbitControls } from '@react-three/drei';

// Objects
import Map from './Objects/Map';
import LandFrame from './Objects/LandFrame';
import LandPieces from './Objects/LandPieces';
import LandPieceToDonate from './Objects/LandPieceToDonate';

const Experience_Land = (props) => {

return (
    <>
    <OrbitControls zoomSpeed={2} />
    <ambientLight intensity={0.5} />
    <directionalLight />
    <axesHelper args={[50, 50, 50]}/>
      <Map />
      <LandFrame />
      <LandPieces donations={props.donations} />
      // Visualization of the landPiece that donator wants to donate
      <LandPieceToDonate priceToDonate={props.priceToDonate} />
    </>
  );
};

export default Experience_Land;
