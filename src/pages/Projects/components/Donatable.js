import React from "react";

import DonationOptions from "./DonationOptions";

import "./Donatable.scss";
import ProgressBar from "./ProgressBar";

const Donatable = (props) => {
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
        <h2 className="donatable-demandedMoney">Potřebujeme vybrat: {props.donatable.demandedMoney}</h2>
        <h2 className="donatable-earnedMoney">Již máme: {props.donatable.earnedMoney}</h2>
        </div>
      </div>
      <div className="donatable-bottom-part">
      <ProgressBar earnedMoney={props.donatable.earnedMoney} demandedMoney={props.donatable.demandedMoney} />
        <DonationOptions donatable={props.donatable} />
      </div>
    </div>
  );
};

export default Donatable;
