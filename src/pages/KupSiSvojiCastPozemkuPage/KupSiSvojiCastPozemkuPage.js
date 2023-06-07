import React, { Fragment, useState, useEffect} from "react";

import { useHttp } from "../../hooks/http-hook";

// Components
import LandPiecesDonationOptions from "./components/LandPiecesDonationOptions.js.js";
import { useBaseDonation } from "../../hooks/base-donation-hook";
import ThreeJS_Canvas_Land from "./components/ThreeJS/ThreeJS_Canvas_Land";
import Donatable from '../Projects/components/Donatable'
import { NavLink } from "react-router-dom";

const KupSiSvojiCastPozemkuPage = (props) => {
  // Utils
  const { sendRequest } = useHttp();

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

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
        setDonations(responseData);
      } catch (err) {}
    };
    fetchDonations();
  }, [sendRequest]);

  return (
    <Fragment>
      <ThreeJS_Canvas_Land
        donations={donations}
        priceToDonate={baseDonationData.baseDonationState.price}
      />
      <LandPiecesDonationOptions baseDonationData={baseDonationData} />
    </Fragment>
  );
};

export default KupSiSvojiCastPozemkuPage;
