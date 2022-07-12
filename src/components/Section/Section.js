import React from 'react'

import './Section.scss'

const Section = (props) => {
  return (
    <section className={`${props.classNames}`}>{props.children}</section>
  )
}

export default Section