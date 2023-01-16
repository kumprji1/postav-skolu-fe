import React, { useState } from 'react'
import { useLandPieces } from '../../../hooks/landPieces-hook'

import './Pozemek_SelectedToBuy.scss'

const Pozemek_SelectedToBuy = (props) => {
  const [ selectedPieces, setSelectedPieces ] = useState([])
  console.log(props.selectedToBuy)
  return (
    <section className='pozemek-selected-to-buy-section'>Pozemek_SelectedToBuy{props.selectedToBuy.map(piece => <p>{piece.number}</p>)}<button>Koupit</button></section>
  )
}

export default Pozemek_SelectedToBuy