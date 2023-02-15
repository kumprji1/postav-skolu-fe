import { Canvas, useThree, useLoader, extend } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })
const Experience_Land = () => {
    const {camera, gl} = useThree();
    // Textures 
const greyMap = useLoader(TextureLoader, '../../../../images/PozemekWebGl/textures/pozemek/mapa_pozemku_letecka_seda2.png')

return (
    <>
    <orbitControls args={[ camera, gl.domElement ]}/>
    <ambientLight intensity={0.2} />
    <directionalLight />
      <mesh>
        <planeGeometry args={[1772, 785]} />
        <meshStandardMaterial map={greyMap}  />
      </mesh>
    </>
  );
};

export default Experience_Land;
