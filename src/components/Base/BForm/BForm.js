import React from 'react'

const BForm = (props) => {
  return (
    <form className={`b-form ${props.classNames}`}>{props.children}</form>
  )
}

export default BForm