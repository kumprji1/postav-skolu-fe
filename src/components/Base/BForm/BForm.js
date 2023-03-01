import React from 'react'

const BForm = (props) => {
  return (
    <form className={props.classNames}>{props.children}</form>
  )
}

export default BForm