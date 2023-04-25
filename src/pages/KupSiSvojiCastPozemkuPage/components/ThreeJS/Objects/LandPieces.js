import { Bounds, Html } from "@react-three/drei";
import React, { Suspense, useEffect, useState } from "react";

import { A_LENGTH, landFrameData, setLastOffsets } from "../globals";

import LandPiece from "./LandPiece";
import SelectToZoom from "./SelectToZoom";

const testDonations = [
  {
    price: 100,
    isPurchased: true,
    isAnonymous: false,
    name: "Jiří Kumprecht",
  },
  {
    price: 200,
    isPurchased: true,
    name: "Jiří Kumprecht",
    isAnonymous: false,
  },
  {
    price: 300,
    isPurchased: true,
    name: "Jiří Kumprecht",
    isAnonymous: false,
  },
  {
    price: 500,
    isPurchased: true,
    name: "Jiří Kumprecht",
    isAnonymous: false,
  },
  {
    price: 1000,
    isPurchased: true,
    name: "Jiří Kumprecht",
    isAnonymous: false,
  },
  {
    price: 2000,
    isPurchased: true,
    name: "Jiří Kumprecht",
    isAnonymous: false,
  },
  {
    price: 5000,
    isPurchased: true,
    name: "Jiří Kumprecht",
    isAnonymous: false,
  },
  {
    price: 8000,
    isPurchased: true,
    name: "Jiří Kumprecht",
    isAnonymous: false,
  },
  {
    price: 5000,
    isPurchased: true,
    name: "Jiří Kumprecht",
    isAnonymous: false,
  },
  {
    price: 8000,
    isPurchased: true,
    name: "Jiří Kumprecht",
    isAnonymous: false,
  },
  {
    price: 12000,
    isPurchased: true,
    name: "Jiří Kumprecht",
    isAnonymous: false,
  },
];

const LandPieces = (props) => {
  const [landPieces, setLandPieces] = useState([]);
  useEffect(() => {

    const createdLandPieces = [];

    let landPieceOffset_X = 0;
    let landPieceOffset_Y = 0;
    let availableRowWidth = landFrameData.width;

    const startNewRow = () => {
      landPieceOffset_Y -= A_LENGTH;
      landPieceOffset_X = 0;
      availableRowWidth = landFrameData.width;
    };

    const createLandPiece = (donationWidth, donation) => {
      // Umístit do poloviny velikosti daru pro zobrazení
      landPieceOffset_X += donationWidth / 2
      createdLandPieces.push(
        <LandPiece
          key={Math.random()}
          width={donationWidth}
          offsetX={landPieceOffset_X}
          offsetY={landPieceOffset_Y}
          donation={donation}
        />
      )
      // Přičíst druhou polovinu daru pro získání pozice na konci daru
      landPieceOffset_X += donationWidth / 2
      // Aktualizace dostupné šířky pro další dar
      availableRowWidth -= donationWidth
    }

    const createLandPieces = () => {
      for (let i = 0; i < props.donations.length; i++) {
        let donationIsWholeDrawn = false
        let donationWidth = (props.donations[i].price / 100) * A_LENGTH
        while (!donationIsWholeDrawn) {
          if (availableRowWidth < donationWidth) {
            // Dar bude třeba segmentovat, protože se nevejde do konce řádku
            const widthToDrawNext = donationWidth - availableRowWidth
            createLandPiece(availableRowWidth, props.donations[i])
            donationWidth = widthToDrawNext
            startNewRow()
          }
          if (donationWidth <= availableRowWidth) {
            // Dar není třeba rozdělit na více částí
            createLandPiece(donationWidth, props.donations[i])
            donationIsWholeDrawn = true
          }
        }
        if (i + 1 === props.donations.length) {
          setLastOffsets(landPieceOffset_X, landPieceOffset_Y)
        }
      }
    }

    createLandPieces();
    setLandPieces(createdLandPieces);
  }, [props.donations]);
  return (
    <>
      {landPieces}
    </>
  );
};

export default LandPieces;
