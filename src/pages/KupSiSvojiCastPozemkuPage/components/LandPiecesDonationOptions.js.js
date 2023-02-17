import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";

import { useBaseDonation } from "../../../hooks/base-donation-hook";

import "./LandPiecesDonationOptions.scss";
const LandPiecesDonationOptions = ({ baseDonationData }) => {
  const cart = useContext(CartContext);

  return (
    <section className="land-pieces-donation-options-section">
      <div className="land-pieces-donation-options--wrapper">
        <div className="land-pieces-donation-options--items">
          {baseDonationData.baseDonationState.options.map((option) => (
            <button
              className={option.isSelected ? `bbutton` : "bbutton-outline "}
              onClick={() => baseDonationData.selectDonation(option.price)}
              key={option.price}
            >
              {option.price}
            </button>
          ))}
          <button
            className={
              baseDonationData.baseDonationState.wantsCustom
                ? `bbutton`
                : "bbutton-outline"
            }
            onClick={baseDonationData.selectCustomBtn}
          >
            Vlastní částka
          </button>
          {baseDonationData.baseDonationState.wantsCustom && (
            <input
              className="donatable-input-custom-price"
              type="text"
              onChange={(e) =>
                baseDonationData.inputHandler(e.currentTarget.value)
              }
              value={baseDonationData.baseDonationState.price}
            ></input>
          )}
          <div>
            <button
              className={`${
                baseDonationData.baseDonationState.isAnonymous
                  ? "bbutton-outline"
                  : "bbutton"
              }`}
              onClick={() => baseDonationData.setAnonymousMode(false)}
            >
              Zobrazit jméno u daru
            </button>
            <button
              className={`${
                baseDonationData.baseDonationState.isAnonymous
                  ? "bbutton"
                  : "bbutton-outline"
              }`}
              onClick={() => baseDonationData.setAnonymousMode(true)}
            >
              Skrýt jméno (darovat anonymně)
            </button>
            {/* <select>
            <option value="someOption">Dobrá duše</option>
            <option value="otherOption">Já</option>
          </select> */}
          </div>
          <input
            className="donatable-input-custom-note"
            placeholder="Chci sdělit:"
            type="text"
            onChange={(e) => baseDonationData.inputNote(e.currentTarget.value)}
            value={baseDonationData.baseDonationState.note}
          ></input>
          <NavLink
            className={"donate-btn-to-cart"}
            to={"/kosik"}
            onClick={() =>
              cart.addDonations([
                {
                  price: baseDonationData.baseDonationState.price,
                  donatableId: "63ee1999742b27920b98e55b",
                  isAnonymous: baseDonationData.baseDonationState.isAnonymous,
                  note: baseDonationData.baseDonationState.note,
                  title: "Kup si svoji část pozemku",
                  photo: "/imgs/projects/3ac.jpg",
                  id: new Date().toISOString(),
                },
              ])
            }
          >
            Přispět {baseDonationData.baseDonationState.price}
            {baseDonationData.baseDonationState.price && ",-"}
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default LandPiecesDonationOptions;
