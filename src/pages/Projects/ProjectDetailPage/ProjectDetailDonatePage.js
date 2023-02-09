import React, { useCallback, useState } from "react";
import { useCart } from "../../../hooks/cart-hook";
import DonationOptions from "../components/DonationOptions";
import ProgressBar from "../components/ProgressBar";

import "./ProjectDetailDonatePage.scss";

const ProjectDetailDonatePage = (props) => {
  const { addDonations } = useCart();

  const selectAmount = useCallback(
    (price) => {
      // const donation = {
      //   price: price,
      //   projectId: props.project._id
      // }
      // console.log('Donation: ', donation)
    },
    [addDonations, props.project._id]
  );

  return (
    <div>
      <h1>{props.project.title}</h1>
      <h2>{props.project.desc}</h2>
      <p>Vybráno: {props.project.earnedMoney}</p>
      <p>Cíl: {props.project.maxMoney}</p>
      <ProgressBar />
      <DonationOptions preparedPrices={props.project.preparedPrices} project={props.project} />
    </div>
  );
};

export default ProjectDetailDonatePage;
