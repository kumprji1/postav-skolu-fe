import React, { Fragment, useState, useEffect} from "react";

import { useHttp } from "../../hooks/http-hook";



// Components
import LandPiecesDonationOptions from "./components/LandPiecesDonationOptions.js.js";
import { useBaseDonation } from "../../hooks/base-donation-hook";
import ThreeJS_Canvas_Land from "./components/ThreeJS/ThreeJS_Canvas_Land";
import Donatable from '../Projects/components/Donatable'

const KupSiSvojiCastPozemkuPage = (props) => {
  // Utils
  const { sendRequest } = useHttp();

  // New Version
  const [donations, setDonations] = useState([]);
  const [donatable, setDonatable] = useState()
  const [selectedPrice, setSelectedPrice] = useState()
  const baseDonationData = useBaseDonation({
    options: [
      {
        price: 100,
        isSelected: false,
      },
      {
        price: 200,
        isSelected: false,
      },
      {
        price: 500,
        isSelected: false,
      },
      {
        price: 1_000,
        isSelected: false,
      },
    ],
    price: null,
    isSelected: false,
    wantsCustom: false,
    note: "",
    isAnonymous: false,
  });

  // fetch Donatables
  useEffect(() => {
    const fetchDonatable = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/donatables/63ee1999742b27920b98e55b`
        );
        console.log("responseData: ", responseData);
        setDonatable(responseData);
      } catch (err) {}
    };
    fetchDonatable();
  }, [sendRequest]);

  // Fetch donations to create landPieces 
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/donations/63ee1999742b27920b98e55b`
        );
        console.log("responseData: ", responseData);
        setDonations(responseData);
      } catch (err) {}
    };
    fetchDonations();
  }, [sendRequest]);

  return (
    <Fragment>
      <section className="project-detail-info-section">
        <h1 className="project-detail-title">{props.project.title}</h1>
        <div className="project-detail-main-img--wrapper">
          <img
            className="project-detail-main-img"
            src={props.project.photo}
          />
        </div>
        <p className="project-detail-desc">{props.project.desc}</p>
      </section>
      <ThreeJS_Canvas_Land
        donations={donations}
        priceToDonate={baseDonationData.baseDonationState.price}
      />
      <LandPiecesDonationOptions baseDonationData={baseDonationData} />
      {/* {donatable && <Donatable donatable={donatable} setSelectedPrice={setSelectedPrice} />} */}
      <p>Tady Dole začne další sekce</p>
    </Fragment>
  );
};

export default KupSiSvojiCastPozemkuPage;
