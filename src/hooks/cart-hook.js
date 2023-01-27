import { useReducer } from "react";

function updateLocalStorage(newState) {
  localStorage.setItem(
    "cartItems",
    JSON.stringify({
      donations: newState.donations,
      products: newState.products,
    })
  );
}

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_DATA: {
      console.log("SET_DATA");
      const newState = { piecesToBuy: [...action.data] };
      return newState;
    }
    case actions.ADD_DONATION: {
      console.log("ADD_PIECE (reducer), data:", action.data);
      const newState = {
        piecesToBuy: [...state.piecesToBuy, { ...action.data }],
      };
      updateLocalStorage(newState);
      return newState;
    }
    case actions.REMOVE_DONATION: {
      console.log("useLandPieceHook - REMOVE_PIECE");
      const updatedPieces = state.piecesToBuy.filter(
        (piece) => piece.number !== action.number
      );
      const newState = { piecesToBuy: updatedPieces };
      updateLocalStorage(newState);
      return newState;
    }
    case actions.ADD_DONATIONS: {
      console.log("ADD_DONATIONS <3, donations: ", action.donations);
      // Check if each new donation is not already in list (by number)
      const newState = { ...state, donations: [...state.donations, ...action.donations] }
      updateLocalStorage(newState)
      return newState;
    }
    default:
      throw new Error("Špatný action v useCart()");
  }
};

const actions = {
  SET_DATA: "SET_DATA",
  ADD_DONATION: "ADD_DONATION",
  REMOVE_DONATION: "REMOVE_DONATION",
  ADD_DONATIONS: "ADD_DONATIONS",
};

export const useCart = (initState) => {
  const [cartState, dispatch] = useReducer(reducer, initState);

  const setData = (data) => {
    dispatch({ type: actions.SET_DATA, data: data });
  };

  const addDonation = (piece) => {
    dispatch({ type: actions.ADD_DONATION, data: piece });
  };

  const removeDonation = (number) => {
    dispatch({ type: actions.REMOVE_DONATION, number: number });
  };

  const addDonations = (donations) => {
    dispatch({ type: actions.ADD_DONATIONS, donations: donations });
  };

  return { cartState, setData, addDonation, removeDonation, addDonations };
};
