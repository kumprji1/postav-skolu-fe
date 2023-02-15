import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";

import { useBaseDonation } from "../../../hooks/base-donation-hook";

import "./LandPiecesDonationOptions.scss";
const LandPiecesDonationOptions = ({baseDonationData}) => {
    const cart = useContext(CartContext)

  return (
    <div className="land-pieces-donation-options-section">
      <div className="land-pieces-donation-options--items">
      {baseDonationData.baseDonationState.options.map((option) => (
        <button
          className={option.isSelected ? `donate-btn-price-selected donate-btn-price` : "donate-btn-price-not-selected donate-btn-price"}
          onClick={() => baseDonationData.selectDonation(option.price)}
          key={option.price}
        >
          {option.price}
        </button>
      ))}
      <button
        className={baseDonationData.baseDonationState.wantsCustom ? `donate-btn-price-selected donate-btn-price` : "donate-btn-price-not-selected donate-btn-price"}
        onClick={baseDonationData.selectCustomBtn}
      >
        Vlastní částka
      </button>
      {baseDonationData.baseDonationState.wantsCustom && (
        <input
          className="donatable-input-custom-price"
          type="text"
          onChange={(e) => baseDonationData.inputHandler(e.currentTarget.value)}
          value={baseDonationData.baseDonationState.price}
        ></input>
      )}
      <NavLink
      className={'donate-btn-to-cart'}
      to={'/kosik'}
      onClick={() => cart.addDonations([{
        price: baseDonationData.baseDonationState.price,
        donatableId: 'props.donatable._id',
        title: 'Kup si svoji část pozemku',
        photo: '/imgs/projects/3ac.jpg',
        id: new Date().toISOString()
      }])}>Přispět { baseDonationData.baseDonationState.price}{baseDonationData.baseDonationState.price && ',-'}</NavLink>
      </div>
    </div>
  );
};

export default LandPiecesDonationOptions;
