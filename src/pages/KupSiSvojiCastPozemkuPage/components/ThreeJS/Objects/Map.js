import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Map = () => {
  const greyMap = useLoader(
    TextureLoader,
    "../../../../images/PozemekWebGl/textures/pozemek/mapa_pozemku_letecka_seda2.png"
  );

  return (
    <>
      <mesh>
        <planeGeometry args={[1772, 785]} />
        <meshStandardMaterial map={greyMap} />
      </mesh>
    </>
  );
};

export default Map;
