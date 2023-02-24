import React from 'react'

const BFormBtn = (props) => {
  return (
    <button className='' onClick={e => {
        e.preventDefault()
        props.onClick()
    }}>{props.children}</button>
  )
}

export default BFormBtn