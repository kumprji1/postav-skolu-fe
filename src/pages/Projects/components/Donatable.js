import React from 'react'

import DonationOptions from './DonationOptions'

const Donatable = (props) => {
  return (
    <div>
      <h1>{props.donatable.title}</h1>
      <p>{props.donatable.desc}</p>
      <h2>Vybáráme: {props.donatable.demandedMoney}</h2>
      <h2>Vybráno: {props.donatable.earnedMoney}</h2>
      <DonationOptions donatable={props.donatable} />
    </div>
  )
}

export default Donatable