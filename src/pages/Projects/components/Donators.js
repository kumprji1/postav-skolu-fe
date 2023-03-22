import React, { useEffect, useState } from "react";

import SwingSpinner from "../../../components/UI/Spinners/SwingSpinner";

import { useHttp } from "../../../hooks/http-hook";

import "./Donators.scss";

const Donators = (props) => {
  const [loadedDonations, setLoadedDonations] = useState([]);
  const { sendRequest, isLoading } = useHttp();

  useEffect(() => {
    if (!props.show) return;
    const fetchDonators = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/donations/${props.donatableId}`
        );
        setLoadedDonations(responseData);
      } catch (err) {}
    };
    fetchDonators();
  }, [props.show, props.donatableId]);

  return (
    <div
      className={`donatable-donators--wrapper ${
        props.show && "donatable-donators--wrapper--show"
      }`}
    >
      {isLoading && <SwingSpinner isLoading={isLoading} />}
      {loadedDonations.map((don) => (
        <div className="donatable-donator--item" key={don._id}>
          <div className="donators-name">{don.name}</div>
          <div className="donators-note">{don.note}</div>
          <div className="donators-price">{don.price},-</div>
        </div>
      ))}
    </div>
  );
};

export default Donators;
