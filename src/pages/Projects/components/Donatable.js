import React, { useState, useEffect, useContext } from "react";

import DonationOptions from "./DonationOptions";

import ProgressBar from "./ProgressBar";
import Donators from "./Donators";

import "./Donatable.scss";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Roles } from "../../../utils/roles";

const Donatable = (props) => {
  const [showDonators, setShowDonators] = useState(false);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false)
  const auth = useContext(AuthContext)
  return (
    <div className="donatable">
      <div className="donatable-upper-part">
        <div className="donatable-photo--wrapper">
          <img src={props.donatable.photo} />
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
        {auth.role === Roles.ADMIN && (
          <div>
            <Link
              to={`/upravit/sbirka/${props.donatable._id}`}
              className="btn--secondary btn-small"
            >
              Upravit
            </Link>
            {!showDeleteBtn && (
              <button
                onClick={() => setShowDeleteBtn(true)}
                className="btn--secondary btn-small"
              >
                Odstranit
              </button>
            )}
            {showDeleteBtn && (
              <div>
                <button
                  onClick={() => setShowDeleteBtn(false)}
                  className="btn--secondary btn-small"
                >
                  Zpět
                </button>
                <button
                  onClick={props.deleteHandler}
                  className="btn-danger btn-small"
                >
                  Doopravdy odstanit
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Donatable;
