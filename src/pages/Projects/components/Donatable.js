import React, { useState, useEffect } from "react";

import DonationOptions from "./DonationOptions";

import ProgressBar from "./ProgressBar";
import Donators from "./Donators";

import "./Donatable.scss";

const Donatable = (props) => {
  const [showDonators, setShowDonators] = useState(false);

  return (
    <div className="donatable">
      <div className="donatable-upper-part">
        <div className="donatable-photo--wrapper">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}` + props.donatable.photo}
          />
        </div>
        <div className="donatable-title-desc--wrapper">
          <h1 className="donatable-title">{props.donatable.title}</h1>
          <p className="donatable-desc">{props.donatable.desc}</p>
        </div>
        <div className="donatable-money-stats">
          <h2 className="donatable-demandedMoney">
            Potřebujeme vybrat: {props.donatable.demandedMoney}
          </h2>
          <h2 className="donatable-earnedMoney">
            Již máme: {props.donatable.earnedMoney}
          </h2>
          <button
            className={`${
              showDonators ? "btn--primary" : "btn--secondary"
            } btn--small donatable-show-donators--btn`}
            onClick={() => setShowDonators((prev) => !prev)}
          >
            Přispěvatelé
          </button>
        </div>
      </div>
      <div className="donatable-bottom-part">
        <Donators show={showDonators} donatableId={props.donatable._id} />
        <ProgressBar
          earnedMoney={props.donatable.earnedMoney}
          demandedMoney={props.donatable.demandedMoney}
        />
        <DonationOptions donatable={props.donatable} />
      </div>
    </div>
  );
};

export default Donatable;
