import React from 'react'

import './BTitle.scss'

const BTitle = (props) => {
  return (
    <h1 className={props.classNames + ' base-title'}>{props.children}</h1>
  )
}

export default BTitle