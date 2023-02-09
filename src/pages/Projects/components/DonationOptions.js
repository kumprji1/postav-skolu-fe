import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import { useBaseDonation } from "../../../hooks/base-donation-hook";

const DonationOptions = (props) => {
  const { baseDonationState, selectDonation, inputHandler, selectCustomBtn } = useBaseDonation({
    options: props.project.preparedPrices.map((p) => ({
      price: p,
      isSelected: false,
    })),
    price: null,
    isSelected: false,
    wantsCustom: false,
  });

  const cart = useContext(CartContext)
  console.log(cart)

  return (
    <Fragment>
      {baseDonationState.options.map((option) => (
        <button
          className={option.isSelected ? `donate-btn-price-selected` : ""}
          onClick={() => selectDonation(option.price)}
          key={option.price}
        >
          {option.price}
        </button>
      ))}
      <button
        className={baseDonationState.wantsCustom ? `donate-btn-price-selected` : ""}
        onClick={selectCustomBtn}
      >
        Vlastní částka
      </button>
      {baseDonationState.wantsCustom && (
        <input
          type="text"
          onChange={(e) => inputHandler(e.currentTarget.value)}
          value={baseDonationState.price}
        ></input>
      )}
      <NavLink
      to={'/kosik'}
      onClick={() => cart.addDonations([{
        price: baseDonationState.price,
        projectId: props.project._id,
        title: props.project.title
      }])}>Přispět { baseDonationState.price} </NavLink>
    </Fragment>
  );
};

export default DonationOptions;
