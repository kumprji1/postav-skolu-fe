import React from 'react'

const OrderedItem = (props) => {
  return (
    <div className="cart-item-donation">
      <div className="cart-item-donation-upper"> 
      <div className="cart-item-donation-photo--wrapper">
        <img src={props.don.donatableId.photo} />
      </div>
      <h2 className="cart-item-donation-title">{props.don.donatableId.title} {props.don.isAnonymous ? '(anonymně)' : ''}</h2>
      <p>Cena: {props.don.price}</p>
      </div>
      {props.don.note && <p>Poznámka k daru: {props.don.note}</p>}
    </div>
  )
}

export default OrderedItem