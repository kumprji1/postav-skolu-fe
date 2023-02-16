import React, { useEffect, useState } from "react";

import { A_LENGTH, landFrameData, setLastOffsets } from "../globals";

import LandPiece from "./LandPiece";

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
  },{
    price: 2000,
    isPurchased: true,
    name: "Jiří Kumprecht",
    isAnonymous: false,
  },{
    price: 5000,
    isPurchased: true,
    name: "Jiří Kumprecht",
    isAnonymous: false,
  },{
    price: 8000,
    isPurchased: true,
    name: "Jiří Kumprecht",
    isAnonymous: false,
  },{
    price: 5000,
    isPurchased: true,
    name: "Jiří Kumprecht",
    isAnonymous: false,
  },{
    price: 8000,
    isPurchased: true,
    name: "Jiří Kumprecht",
    isAnonymous: false,
  },{
    price: 12000,
    isPurchased: true,
    name: "Jiří Kumprecht",
    isAnonymous: false,
  }
];


const LandPieces = (props) => {
  const [landPieces, setLandPieces] = useState([])
  useEffect(() => {
    console.log('LandPieces(useEffect)')
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

  // const landPiece = new THREE.Mesh(new THREE.PlaneGeometry(donationWidth, A_LENGTH), new THREE.MeshBasicMaterial({color: getColorByPrice(donation.price), transparent:true, opacity:0.4}))
  // Move to the center of donation piece to display
  landPieceOffset_X += donationWidth / 2
  createdLandPieces.push(<LandPiece key={Math.random()} width={donationWidth} offsetX={landPieceOffset_X} offsetY={landPieceOffset_Y} donation={donation} />)

  // Move piece to top left, then apply offsets
  // landPiece.rotateZ(-0.16)
  // landPiece.translateX(-495 + landPieceOffset_X)
  // landPiece.translateY(213.75 + landPieceOffset_Y)
  // scene.add(landPiece)
  // Sum the second half of donation to get at the end of last don
  landPieceOffset_X += donationWidth / 2;

  // Update avaible width for next donation(landPiece)
  avaibleRowWidth -= donationWidth
}


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
        // drawLandPiece(avaibleRowWidth, props.donations[i])
        createLandPiece(avaibleRowWidth, props.donations[i])
        // createdLandPieces.push({ ...props.donations[i], width: avaibleRowWidth, offsetX: landPieceOffset_X, offsetY: landPieceOffset_Y });
        donationWidth = widthToDrawNext;
        startNewRow();
        console.log("Zbývá vykreslit: ", widthToDrawNext, donationWidth);
      }
      if (donationWidth <= avaibleRowWidth) {
        console.log('Donation (no-split)')
        // drawLandPiece(donationWidth, props.donations[i]);
        createLandPiece(donationWidth, props.donations[i])
        // createdLandPieces.push({ ...props.donations[i], width: donationWidth, offsetX: landPieceOffset_X, offsetY: landPieceOffset_Y });
        donationIsWholeDrawn = true;
      }
    }
    if (i + 1 == props.donations.length) {
      setLastOffsets(landPieceOffset_X, landPieceOffset_Y)
    }
  }
};
createLandPieces()
setLandPieces(createdLandPieces)
  // console.log('createdLandPieces: ', createdLandPieces)

  }, []);
  return (
    <>
      {/* {props.donations.map((landPiece) => (
        <LandPiece landPiece={landPiece} />
      ))} */}
      {landPieces}
    </>
  );
};

export default LandPieces;
