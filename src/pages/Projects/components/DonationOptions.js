import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import { useBaseDonation } from "../../../hooks/base-donation-hook";

const DonationOptions = (props) => {
  const { baseDonationState, selectDonation, inputHandler, selectCustomBtn } = useBaseDonation({
    options: props.donatable.preparedPrices.map((p) => ({
      price: p,
      isSelected: false,
    })),
    price: null,
    isSelected: false,
    isAnonymous: false,
    wantsCustom: false,
  });

  const cart = useContext(CartContext)

  return (
    <Fragment>
      {baseDonationState.options.map((option) => (
        <button
          className={option.isSelected ? `donate-btn-price-selected donate-btn-price` : "donate-btn-price-not-selected donate-btn-price"}
          onClick={() => selectDonation(option.price)}
          key={option.price}
        >
          {option.price}
        </button>
      ))}
      <button
        className={baseDonationState.wantsCustom ? `donate-btn-price-selected donate-btn-price` : "donate-btn-price-not-selected donate-btn-price"}
        onClick={selectCustomBtn}
      >
        Vlastní částka
      </button>
      {baseDonationState.wantsCustom && (
        <input
          className="donatable-input-custom-price"
          type="text"
          onChange={(e) => inputHandler(e.currentTarget.value)}
          value={baseDonationState.price}
        ></input>
      )}
      <NavLink
      className={'donate-btn-to-cart'}
      to={'/kosik'}
      onClick={() => cart.addDonations([{
        price: baseDonationState.price,
        donatableId: props.donatable._id,
        title: props.donatable.title,
        photo: props.donatable.photo,
        id: new Date().toISOString(),
        isAnonymous: baseDonationState.isAnonymous
      }])}>Přispět { baseDonationState.price}{baseDonationState.price && ',-'}</NavLink>
    </Fragment>
  );
};

export default DonationOptions;
