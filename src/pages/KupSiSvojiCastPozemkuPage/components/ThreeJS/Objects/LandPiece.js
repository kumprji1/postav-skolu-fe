import { Html } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { A_LENGTH, getColorByPrice, landPieceInitPosAndRot } from "../globals";

const LandPiece = (props) => {
  const [showHTML, setShowHTML] = useState(false);
  return (
    <mesh
      // Events
      onPointerEnter={(e) => {
        e.object.material.opacity = 1;
        setShowHTML(true);
      }}
      onPointerOut={(e) => {
        e.object.material.opacity = 0.4;
        setShowHTML(false);
      }}
      onClick={(e) => {
        // props.setSelectedPiece(e.object.userData)
        setShowHTML(true);
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
        price: props.donation.price,
      }}
    >
      <planeGeometry args={[props.width, A_LENGTH]} />
      <meshBasicMaterial
        color={getColorByPrice(props.donation.price)}
        transparent
        opacity={0.4}
      />
      {showHTML && (
        <Html className="landPiece-donation-info--wrapper">
          <p>Dárce: {props.donation.name}</p>
          <p>Částka: {props.donation.price}</p>
          <p>Chci sdělit: {props.donation.note}</p>
        </Html>
      )}
    </mesh>
  );
};

export default LandPiece;
