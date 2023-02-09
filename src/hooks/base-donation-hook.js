import { useReducer } from "react";

const unselectPreparedOptions = (options) => {
  return options.map((o) => ({ ...o, isSelected: false }));
};

const reducer = (state, action) => {
  switch (action.type) {
    case act.SELECT_DONATION: {
      let selectedPrice = null;
      const updatedOptions = [...state.options].map((o) => {
        if (o.price != action.price) return { ...o, isSelected: false };
        else {
          selectedPrice = o.price;
          return {
            ...o,
            isSelected: true,
          };
        }
      });
      const updatedState = {
        ...state,
        price: selectedPrice,
        options: updatedOptions,
        isSelected: true,
        wantsCustom: false,
      };
      return updatedState;
    }
    case act.INPUT_HANDLER: {

      const updatedState = {
        ...state,
        price: Number(action.price),
      };
      return updatedState;
    }
    case act.SELECT_CUSTOM_BTN: {
      const updatedOptions = unselectPreparedOptions([...state.options]);
      return {
        ...state,
        options: updatedOptions,
        wantsCustom: true,
      };
    }
    default: {
      throw Error("Wrong action.type in useDonation()");
    }
  }
};

const act = {
  SELECT_DONATION: "SELECT_DONATION",
  INPUT_HANDLER: "INPUT_HANDLER",
  SELECT_CUSTOM_BTN: "SELECT_CUSTOM_BTN",
};

export const useBaseDonation = (initState) => {
  const [baseDonationState, dispatch] = useReducer(reducer, initState);

  const selectDonation = (price) => {
    dispatch({ type: act.SELECT_DONATION, price });
  };

  const inputHandler = (price) => {
    dispatch({ type: act.INPUT_HANDLER, price });
  };

  const selectCustomBtn = () => {
    dispatch({ type: act.SELECT_CUSTOM_BTN });
  };

  return { baseDonationState, selectDonation, inputHandler, selectCustomBtn };
};