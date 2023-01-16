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
  const { addPiece, landPiecesState } = useLandPieces([])

  // Data
  const [loaded_O3, setLoaded_O3] = useState([]);
  const [loaded_O4, setLoaded_O4] = useState([]);  
  const [selectedToBuy, setSelectedToBuy] = useState([]);

  const addToBuy = (data) => {
    setSelectedToBuy(prev => [...prev, {...data}])
  }

  const buyPieces = async () => {
    try {
      const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/`)
    } catch (err) {
      
    }
  }

  // Fetching functions
  const fetchFewLandPiecesO3 = useCallback(async () => {
    try {
      const responseData =
      await sendRequest('http://localhost:5000/few-land-pieces-o3')
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
        <PozemekWebGlSection addToBuy={addToBuy} getCurrentLoadedO3={getCurrentLoadedO3} fetchFewLandPiecesO3={fetchFewLandPiecesO3} />
        <Pozemek_SelectedToBuy selectedToBuy={selectedToBuy} />
        <p>Tady Dole začne další sekce</p>
    </Fragment>
  )
}

export default KupSiSvojiCastPozemkuPage