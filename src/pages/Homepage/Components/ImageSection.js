import React from 'react'

import SchoolImg from '../../../images/Skola/about.png'

import './ImageSection.scss'

const ImageSection = () => {
  return (
    <section className='school-image-section'><img src={SchoolImg} alt="Škola"/></section>
  )
}

export default ImageSection