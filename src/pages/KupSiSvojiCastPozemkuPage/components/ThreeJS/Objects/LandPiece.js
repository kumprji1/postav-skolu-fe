import React from "react";
import { A_LENGTH, getColorByPrice, landPieceInitPosAndRot } from "../globals";

const LandPiece = (props) => {
  console.log('LandPiece - props.donation.price: ', props.donation.price)
  return (
    <mesh 
      // Events
      onPointerEnter={(e) => e.object.material.opacity = 1}
      onPointerLeave={(e) => e.object.material.opacity = 0.4}

      // Tranforms
      position-z={2}
      position-x={landPieceInitPosAndRot.transX + props.offsetX}
      position-y={landPieceInitPosAndRot.transY + props.offsetY}
      rotation-z={landPieceInitPosAndRot.rotZ}
      
      // Data
      userData={{
        isAnonymous: props.donation
      }}
    >
      <planeGeometry args={[props.width, A_LENGTH]} />
      <meshBasicMaterial color={getColorByPrice(props.donation.price)} transparent opacity={0.4} />
    </mesh>
  );
};

export default LandPiece;
