import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Map = () => {
  const greyMap = useLoader(
    TextureLoader,
    "../../../../images/PozemekWebGl/textures/pozemek/mapa_pozemku_letecka.png"
  );

  return (
    <>
      <mesh>
        <planeGeometry args={[1772, 785]} />
        <meshStandardMaterial map={greyMap} />
      </mesh>
      mesh
    </>
  );
};

export default Map;
