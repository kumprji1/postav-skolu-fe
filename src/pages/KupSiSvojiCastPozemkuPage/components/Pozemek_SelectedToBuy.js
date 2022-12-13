import React from 'react'

import './Pozemek_SelectedToBuy.scss'

const Pozemek_SelectedToBuy = (props) => {
  console.log(props.selectedToBuy)
  return (
    <section className='pozemek-selected-to-buy-section'>Pozemek_SelectedToBuy{props.selectedToBuy.map(piece => <p>{piece.i}</p>)}</section>
  )
}

export default Pozemek_SelectedToBuy