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
      if (isNaN(action.price) || action.price < 1) {
        return {
          ...state,
          price: null,
        }
      }
       else
      return {
        ...state,
        price: Number(action.price),
      }
    }
    case act.INPUT_NOTE: {
      const updatedState = {
        ...state,
        note: action.note,
      };
      return updatedState;
    }
    case act.SET_ANONYMOUS_MODE: {
      const updatedState = {
        ...state,
        isAnonymous: action.value,
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
  INPUT_NOTE: 'INPUT_NOTE',
  SET_ANONYMOUS_MODE: 'SET_ANONYMOUS_MODE'
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

  const inputNote = (note) => {
    dispatch({ type: act.INPUT_NOTE, note });
  };

  const setAnonymousMode = (value) => {
    dispatch({ type: act.SET_ANONYMOUS_MODE, value });
  };


  return { baseDonationState, selectDonation, inputHandler, inputNote, selectCustomBtn, setAnonymousMode };
};
