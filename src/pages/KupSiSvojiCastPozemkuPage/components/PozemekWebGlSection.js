import React, { useEffect, useRef, useLayoutEffect } from 'react'

import { pozemekThreeStart, visualizePriceOnMap } from './PozemekThreeJsScript'

import './PozemekWebGlSection.scss'

const PozemekWebGlSection = (props) => {
  const webGlSectionRef = useRef();
    useEffect(() => {
        // const { visualizePriceOnMap } = pozemekThreeStart(webGlSectionRef.current, props.addToBuy, props.removePiece, props.priceToDonate, props.getCurrentLoadedO3)
        // visualizePriceOnMap(100)
      } , []);

    useEffect(() => {
      // visualizePriceOnMap(props.priceToDonate)
    }, [props.priceToDonate])

    useLayoutEffect(() => {
      console.log(webGlSectionRef.current.offsetWidth)
    }, []);
  return (
    <section ref={webGlSectionRef} className='pozemek-webgl-section'>
        <canvas className="pozemek-webgl"></canvas>
    </section>
  )
}

export default PozemekWebGlSection