import React, { useState } from 'react'
import { useLandPieces } from '../../../hooks/landPieces-hook'

import './Pozemek_SelectedToBuy.scss'

const Pozemek_SelectedToBuy = (props) => {
  const [ selectedPieces, setSelectedPieces ] = useState([])
  console.log(props.selectedToBuy)
  return (
    <section className='pozemek-selected-to-buy-section'>Pozemek_SelectedToBuy{props.landPiecesState.piecesToBuy.map(piece => <p key={piece.number}>{piece.number}</p>)}<button onClick={props.buyPieces}>Koupit</button></section>
  )
}

export default Pozemek_SelectedToBuy