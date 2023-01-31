import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import { useLandPieces } from "../../../hooks/landPieces-hook";

import "./Pozemek_SelectedToBuy.scss";

const Pozemek_SelectedToBuy = (props) => {
  const cart = useContext(CartContext);
  const [selectedPieces, setSelectedPieces] = useState([]);
  console.log(props.selectedToBuy);
  return (
    <section className="pozemek-selected-to-buy-section">
      {props.landPiecesState.piecesToBuy.map((piece) => (
        <p key={piece.number}>
          {piece.title} ({piece.number}), cena: {piece.price},-
        </p>
      ))}
      <NavLink
        to={`/kosik`}
        onClick={() => cart.addPieces(props.landPiecesState.piecesToBuy)}
      >
        Do košíku
      </NavLink>
    </section>
  );
};

export default Pozemek_SelectedToBuy;
