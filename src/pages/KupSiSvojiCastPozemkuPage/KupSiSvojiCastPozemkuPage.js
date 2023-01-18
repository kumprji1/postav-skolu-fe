import React, { Fragment, useState, useEffect, useCallback } from 'react'

import { useHttp } from '../../hooks/http-hook'
import { useLandPieces } from '../../hooks/landPieces-hook';

import BuyPieceOfLand_Data from './BuyPieceOfLand_Data';

import { reRender_O3 } from './components/PozemekThreeJsScript'

// Components
import PozemekWebGlSection from './components/PozemekWebGlSection'
import Pozemek_SelectedToBuy from './components/Pozemek_SelectedToBuy';

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
        <BuyPieceOfLand_Data />
        <PozemekWebGlSection addToBuy={addPiece} removePiece={removePiece} getCurrentLoadedO3={getCurrentLoadedO3} fetchFewLandPiecesO3={fetchFewLandPiecesO3} />
        <Pozemek_SelectedToBuy landPiecesState={landPiecesState} buyPieces={buyPieces}/>
        <p>Tady Dole začne další sekce</p>
    </Fragment>
  )
}

export default KupSiSvojiCastPozemkuPage