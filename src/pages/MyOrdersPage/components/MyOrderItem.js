import React from 'react'
import { NavLink } from 'react-router-dom'

const MyOrderItem = (props) => {
  return (
    <NavLink to={`/objednavka/${props.order._id}?uuid=${props.order.uuid}`}>MyOrderItem</NavLink>
  )
}

export default MyOrderItem