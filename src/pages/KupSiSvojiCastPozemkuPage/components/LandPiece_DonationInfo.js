import React from 'react'

const LandPiece_DonationInfo = (props) => {
    console.log(props)
  return (
    <div>
        <p>Dárce: {props.selectedPiece.name}</p>
        <p>Cena: {props.selectedPiece.price}</p>
        <p>Poznámka: {props.selectedPiece.note}</p>
    </div>
  )
}

export default LandPiece_DonationInfo