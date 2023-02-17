import React, { useEffect, useState } from "react";
import { A_LENGTH, getColorByPrice, landPieceInitPosAndRot } from "../globals";

const LandPiece = (props) => {
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])
  return (
    <mesh 
      // Events
      onPointerEnter={(e) => {
        e.object.material.opacity = 1
        setHovered(true)
      }}
      onPointerOut={(e) => {
        e.object.material.opacity = 0.4
        setHovered(false)
      }}
      onClick={(e) => {
        props.setSelectedPiece(e.object.userData)
        console.log(e.object)
      }}

      // Tranforms
      position-z={2}
      position-x={landPieceInitPosAndRot.transX + props.offsetX}
      position-y={landPieceInitPosAndRot.transY + props.offsetY}
      rotation-z={landPieceInitPosAndRot.rotZ}

      // Data
      userData={{
        isAnonymous: props.donation.isAnonymous,
        name: props.donation.name,
        note: props.donation.note,
        price: props.donation.price
      }}
    >
      <planeGeometry args={[props.width, A_LENGTH]} />
      <meshBasicMaterial color={getColorByPrice(props.donation.price)} transparent opacity={0.4} />
    </mesh>
  );
};

export default LandPiece;
