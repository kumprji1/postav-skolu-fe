import React, { useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';

import { CartContext } from "../../../contexts/CartContext";

import { useBaseDonation } from "../../../hooks/base-donation-hook";

import "./LandPiecesDonationOptions.scss";
const LandPiecesDonationOptions = ({ baseDonationData }) => {
  const cart = useContext(CartContext);
  const chooseVisibilityRef = useRef()
  const customNoteAndSubmitRef = useRef()

  return (
    <section className="land-pieces-donation-options-section">
      <h1 className="land-pieces-donation--step-info">Daruji: </h1>
      <div className="land-pieces-donation-options--items">
        {baseDonationData.baseDonationState.options.map((option) => (
          <button
            className={option.isSelected ? `btn--primary` : "btn--secondary "}
            onClick={() => baseDonationData.selectDonation(option.price)}
            key={option.price}
          >
            {option.price}
          </button>
        ))}
        <button
          className={
            baseDonationData.baseDonationState.wantsCustom
              ? `btn--primary`
              : "btn--secondary"
          }
          onClick={baseDonationData.selectCustomBtn}
        >
          Vlastní částka
        </button>
        {baseDonationData.baseDonationState.wantsCustom && (
          <input
            className="donatable-input-custom-price"
            type="text"
            placeholder="..."
            onChange={(e) =>
              baseDonationData.inputHandler(e.currentTarget.value)
            }
            value={baseDonationData.baseDonationState.price}
          ></input>
        )}        </div>
      <CSSTransition
        in={baseDonationData.baseDonationState.price > 15}
        nodeRef={chooseVisibilityRef}
        timeout={300}
        classNames="land-pieces-donation--choose-visibility--wrapper"
        unmountOnExit
        onEnter={() => {
          console.log(document.getElementsByTagName("main")[0].scrollHeight)
          // setTimeout(() => {
          //   window.scrollTo({top: 100, behavior: 'smooth'})
          // }, 2000)
        }}
        onExited={() => console.log('onExited()')}
      >
        <div ref={chooseVisibilityRef} className="land-pieces-donation--choose-visibility--wrapper">
          <h1 className="land-pieces-donation--step-info">Přeji si: </h1>
          <div className="land-pieces-donation-options--items">
            <button
              className={`${baseDonationData.baseDonationState.isAnonymous === false
                ? `btn--primary`
                : "btn--secondary"
                }`}
              onClick={() => baseDonationData.setAnonymousMode(false)}
            >
              Zobrazit jméno u daru
            </button>
            <button
              className={`${baseDonationData.baseDonationState.isAnonymous === true
                ? `btn--primary`
                : "btn--secondary"
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
        </div>
      </CSSTransition>
      <CSSTransition
        in={baseDonationData.baseDonationState.isAnonymous !== null && baseDonationData.baseDonationState.price &&
          baseDonationData.baseDonationState.price > 15 &&
          baseDonationData.baseDonationState.isAnonymous !== null}
        nodeRef={customNoteAndSubmitRef}
        timeout={300}
        classNames="land-pieces-donation--choose-visibility--wrapper"
        unmountOnExit
        onEnter={() =>
          window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})
        }
        onExited={() => console.log('onExited()')}
      >
        <div ref={customNoteAndSubmitRef} className="land-pieces-donation--custon-note-and-submit--wrapper">
          <h1 className="land-pieces-donation--step-info">Chci sdělit:</h1>
          <input
            className="land-pieces-input-custom-note"
            placeholder="..."
            type="text"
            onChange={(e) => baseDonationData.inputNote(e.currentTarget.value)}
            value={baseDonationData.baseDonationState.note}
          ></input>
          {baseDonationData.baseDonationState.price &&
            baseDonationData.baseDonationState.price > 15 &&
            baseDonationData.baseDonationState.isAnonymous !== null &&
            <NavLink
              className={"btn--primary land-pieces-btn-to-cart"}
              to={"/kosik"}
              onClick={() =>
                cart.addDonations([
                  {
                    price: baseDonationData.baseDonationState.price,
                    donatableId: "63ee1999742b27920b98e55b",
                    isAnonymous: baseDonationData.baseDonationState.isAnonymous,
                    note: baseDonationData.baseDonationState.note,
                    title: "Kup si svoji část pozemku",
                    photo: "https://postav-skolu.s3.eu-central-1.amazonaws.com/img_postav_skolu_ec08ea65-bb19-4c21-b745-fd20e6181d62.jpg",
                    id: new Date().toISOString(),
                  },
                ])
              }
            >
              Přispět {baseDonationData.baseDonationState.price}
              {baseDonationData.baseDonationState.price ? ",-" : ''}
            </NavLink>}
        </div>
      </CSSTransition>
    </section>
  );
};

export default LandPiecesDonationOptions;
