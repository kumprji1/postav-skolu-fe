import React, { Fragment, useState, useEffect, useCallback } from 'react'

import { useHttp } from '../../hooks/http-hook'
import { useLandPieces } from '../../hooks/landPieces-hook';

import { reRender_O3 } from './components/PozemekThreeJsScript'

// Components
import PozemekWebGlSection from './components/PozemekWebGlSection'
import Pozemek_SelectedToBuy from './components/Pozemek_SelectedToBuy';
import LandPiecesDonationOptions from './components/LandPiecesDonationOptions.js.js';
import { useBaseDonation } from '../../hooks/base-donation-hook';
import ThreeJS_Canvas_Land from './components/ThreeJS/ThreeJS_Canvas_Land';

const KupSiSvojiCastPozemkuPage = () => {
  console.log('KupSiSvojiCastPozemkuPage - RENDER')
  // Utils
  const { sendRequest } = useHttp();
  const { addPiece, removePiece, landPiecesState } = useLandPieces({
    piecesToBuy: []
  })

  // Data
  const [loaded_O3, setLoaded_O3] = useState([]);
  const [loaded_O4, setLoaded_O4] = useState([]);  
  const [selectedToBuy, setSelectedToBuy] = useState([]);
  

  // New Version
  const baseDonationData =
  useBaseDonation({
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
  });



  const addToBuy = (data) => {
    setSelectedToBuy(prev => [...prev, {...data}])
  }

  const buyPieces = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/buy-pieces`, 
        'POST', 
        JSON.stringify({landPiecesState}), 
        {
        "Content-Type": "application/json"
      })
    } catch (err) {
      
    }
  }

  // Fetching functions
  const fetchFewLandPiecesO3 = useCallback(async () => {
    try {
      const responseData =
      await sendRequest('http://localhost:5000/api/few-land-pieces-o3')
      reRender_O3(responseData)
      setLoaded_O3(responseData)
      console.log('responseData', responseData)
    } catch (err) {
      console.log(err)
    }
  },[])

  const getCurrentLoadedO3 = useCallback(() => {
    return loaded_O3 
  }, [loaded_O3])

  // Fetch Land Pieces
  useEffect(() => {
    // fetchFewLandPiecesO3()
  }, [])
  return (
    <Fragment>
        <LandPiecesDonationOptions baseDonationData={baseDonationData} />
        {/* <PozemekWebGlSection addToBuy={addPiece} removePiece={removePiece} priceToDonate={baseDonationData.baseDonationState.price} fetchFewLandPiecesO3={fetchFewLandPiecesO3} /> */}
        <ThreeJS_Canvas_Land />
        {/* <Pozemek_SelectedToBuy landPiecesState={landPiecesState} buyPieces={buyPieces}/> */}
        <p>Tady Dole začne další sekce</p>
    </Fragment>
  )
}

export default KupSiSvojiCastPozemkuPage