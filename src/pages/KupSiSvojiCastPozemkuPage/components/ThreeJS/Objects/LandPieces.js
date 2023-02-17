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
    console.log("LandPieces(useEffect)");
    const createdLandPieces = [];

    let landPieceOffset_X = 0;
    let landPieceOffset_Y = 0;
    let avaibleRowWidth = landFrameData.width;

    const startNewRow = () => {
      landPieceOffset_Y -= A_LENGTH;
      landPieceOffset_X = 0;
      avaibleRowWidth = landFrameData.width;
    };

    const createLandPiece = (donationWidth, donation) => {
      // Move to the center of donation piece to display
      landPieceOffset_X += donationWidth / 2;
      createdLandPieces.push(
        <LandPiece
          key={Math.random()}
          width={donationWidth}
          offsetX={landPieceOffset_X}
          offsetY={landPieceOffset_Y}
          donation={donation}
          // setSelectedPiece={props.setSelectedPiece}
        />
      );

      // Sum the second half of donation to get at the end of last don
      landPieceOffset_X += donationWidth / 2;

      // Update avaible width for next donation(landPiece)
      avaibleRowWidth -= donationWidth;
    };

    const createLandPieces = () => {
      for (let i = 0; i < props.donations.length; i++) {
        let donationIsWholeDrawn = false;
        let donationWidth = (props.donations[i].price / 100) * A_LENGTH;

        while (!donationIsWholeDrawn) {
          // if (avaibleRowWidth < A_LENGTH) {
          // //     Start a new row when current row is fully filled (these is no place on the current row even for the smallest donation)
          //     startNewRow()
          //  }
          if (avaibleRowWidth < donationWidth) {
            // Drawing to the end of row
            console.log("Kreslím do konce řádku: ", avaibleRowWidth);
            const widthToDrawNext = donationWidth - avaibleRowWidth;
            createLandPiece(avaibleRowWidth, props.donations[i]);
            donationWidth = widthToDrawNext;
            startNewRow();
            console.log("Zbývá vykreslit: ", widthToDrawNext, donationWidth);
          }
          if (donationWidth <= avaibleRowWidth) {
            console.log("Donation (no-split)");
            createLandPiece(donationWidth, props.donations[i]);
            donationIsWholeDrawn = true;
          }
        }
        if (i + 1 == props.donations.length) {
          setLastOffsets(landPieceOffset_X, landPieceOffset_Y);
        }
      }
    };
    createLandPieces();
    setLandPieces(createdLandPieces);
    // console.log('createdLandPieces: ', createdLandPieces)
  }, [props.donations]);
  return (
    <>
      {/* <Suspense fallback={null}>
        <Bounds clip margin={0.8}> */}
          {/* <SelectToZoom> */}
            {landPieces}
          {/* </SelectToZoom> */}
        {/* </Bounds>
      </Suspense> */}
    </>
  );
};

export default LandPieces;
