import React from 'react'
import { A_LENGTH, getColorByPrice, landPieceInitPosAndRot, lastOffsets } from '../globals'

const LandPieceToDonate = (props) => {
    console.log(props.priceToDonate)
  return (
    <mesh 
    // Tranforms
    position-z={2}
    position-x={landPieceInitPosAndRot.transX + lastOffsets.transX + ((props.priceToDonate / 100) * A_LENGTH) / 2}
    position-y={landPieceInitPosAndRot.transY + lastOffsets.transY}
    // Data
    userData={{
      isAnonymous: props.priceToDonate
    }}
  >
    <planeGeometry args={[(props.priceToDonate / 100) * A_LENGTH, A_LENGTH]} />
    <meshBasicMaterial color={getColorByPrice(props.priceToDonate)} transparent opacity={1} />
  </mesh>
  )
}

export default LandPieceToDonate