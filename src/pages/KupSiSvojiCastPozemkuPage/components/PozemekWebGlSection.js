import React, { useEffect, useRef, useLayoutEffect } from 'react'

import { pozemekThreeStart } from './PozemekThreeJsScript'

import './PozemekWebGlSection.scss'

const PozemekWebGlSection = (props) => {
  const webGlSectionRef = useRef();
    useEffect(() => {
        pozemekThreeStart(webGlSectionRef.current, props.setSelectedToBuy, props.fetchFewLandPiecesO3, props.getCurrentLoadedO3)
    } , []);

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