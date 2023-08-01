import { Bounds } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useState } from 'react'
import { A_LENGTH, getColorByPrice, landPieceInitPosAndRot, lastOffsets } from '../globals'
import SelectToZoom from './SelectToZoom'

const LandPieceToDonate = (props) => {
    const [opacity, setOpacity] = useState(0.4)
    useFrame((state, delta) => {
      // change opacity from 0.4 to 0.8 in time and back to 0.4
    })
  return (
    <Bounds fit margin={1.5} > 
    <SelectToZoom>
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
  </SelectToZoom>
  </Bounds>
  )
}

export default LandPieceToDonate