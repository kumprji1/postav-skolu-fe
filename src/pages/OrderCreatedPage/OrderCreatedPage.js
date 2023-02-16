import React from 'react'
import { useParams } from 'react-router-dom'

const OrderCreated = () => {
    const { orderId } = useParams();
  return (
    <div>Objednávka s id {orderId} vytvořena! (ID ale nezobraovat)</div>
  )
}

export default OrderCreated