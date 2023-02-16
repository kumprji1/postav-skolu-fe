import React from "react";

import "./CartItem_Donation.scss";

import RemoveIcon from "../../../../images/Icons/remove-icon-png-7131.png";

const CartItem_Donation = (props) => {
  return (
    <div className="cart-item-donation">
      <div className="cart-item-donation-upper"> 
      <div className="cart-item-donation-photo--wrapper">
        <img src={`${process.env.REACT_APP_BACKEND_URL}` + props.don.photo} />
      </div>
      <h2 className="cart-item-donation-title">{props.don.title} {props.don.isAnonymous ? '(anonymně)' : ''}</h2>
      <p>Cena: {props.don.price}</p>
      <div className="cart-item-donation-remove-icon--wrapper" onClick={props.removeF}>
        <img src={RemoveIcon} />
      </div>
      </div>
      {props.don.note && <p>Poznámka k daru: {props.don.note}</p>}
    </div>
  );
};

export default CartItem_Donation;
