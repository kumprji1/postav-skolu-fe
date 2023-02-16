import React, { useEffect, useRef } from "react";
import { landFrameData } from "../globals";

const LandFrame = () => {
  const landFrameGroupRef = useRef()
  useEffect(() => {
    landFrameGroupRef.current.rotation.z = landFrameData.rotZ
  }, [landFrameGroupRef])
  return (
    <group ref={ landFrameGroupRef }>
      <mesh
        position-x={landFrameData.transX}
        position-y={landFrameData.transY}
        position-z={landFrameData.transZ}
        rotation-z={landFrameData.rotZ}
      >
        <planeGeometry args={[landFrameData.width, landFrameData.height]} />
        <meshBasicMaterial color={"green"} transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

export default LandFrame;
