import React, { Fragment, useState, useEffect, useCallback } from "react";

import { useHttp } from "../../hooks/http-hook";
import { useLandPieces } from "../../hooks/landPieces-hook";

import { reRender_O3 } from "./components/PozemekThreeJsScript";

// Components
import PozemekWebGlSection from "./components/PozemekWebGlSection";
import Pozemek_SelectedToBuy from "./components/Pozemek_SelectedToBuy";
import LandPiecesDonationOptions from "./components/LandPiecesDonationOptions.js.js";
import { useBaseDonation } from "../../hooks/base-donation-hook";
import ThreeJS_Canvas_Land from "./components/ThreeJS/ThreeJS_Canvas_Land";
import LandPiece_DonationInfo from "./components/LandPiece_DonationInfo";

const KupSiSvojiCastPozemkuPage = (props) => {
  // Utils
  const { sendRequest } = useHttp();
  const { addPiece, removePiece, landPiecesState } = useLandPieces({
    piecesToBuy: [],
  });

  // Data
  const [loaded_O3, setLoaded_O3] = useState([]);
  const [loaded_O4, setLoaded_O4] = useState([]);
  const [selectedToBuy, setSelectedToBuy] = useState([]);

  const addToBuy = (data) => {
    setSelectedToBuy((prev) => [...prev, { ...data }]);
  };

  const buyPieces = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/buy-pieces`,
        "POST",
        JSON.stringify({ landPiecesState }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
  };

  // Fetching functions
  const fetchFewLandPiecesO3 = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/few-land-pieces-o3"
      );
      reRender_O3(responseData);
      setLoaded_O3(responseData);
      console.log("responseData", responseData);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getCurrentLoadedO3 = useCallback(() => {
    return loaded_O3;
  }, [loaded_O3]);

  // New Version
  // const [selectedPiece, setSelectedPiece] = useState();
  const [donations, setDonations] = useState([]);
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

  // Fetch Land Pieces
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
      {/* <PozemekWebGlSection addToBuy={addPiece} removePiece={removePiece} priceToDonate={baseDonationData.baseDonationState.price} fetchFewLandPiecesO3={fetchFewLandPiecesO3} /> */}
      <ThreeJS_Canvas_Land
        donations={donations}
        priceToDonate={baseDonationData.baseDonationState.price}
        // setSelectedPiece={setSelectedPiece}
      />
            <LandPiecesDonationOptions baseDonationData={baseDonationData} />
      {/* {selectedPiece && (
        <LandPiece_DonationInfo selectedPiece={selectedPiece} />
      )} */}
      {/* <Pozemek_SelectedToBuy landPiecesState={landPiecesState} buyPieces={buyPieces}/> */}
      <p>Tady Dole začne další sekce</p>
    </Fragment>
  );
};

export default KupSiSvojiCastPozemkuPage;
