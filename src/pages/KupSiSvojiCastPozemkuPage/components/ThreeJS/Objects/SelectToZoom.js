import { useBounds } from '@react-three/drei'
import React, { useEffect } from 'react'

const SelectToZoom = ({ children }) => {
    const api = useBounds()
    // setInterval(() => {
    //     api.refresh().fit()
    // }, 1000)
    return (
      <group onClick={(e) => (e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit())}
       //onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}
       >
        {children}
      </group>
    )
  }
  

export default SelectToZoom