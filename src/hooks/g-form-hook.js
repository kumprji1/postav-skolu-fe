import { useReducer } from "react";
import { validate } from '../utils/validators'

/**
 * Gortoz Form Hook
 * 
 * const formDataLayout = {
    parts: {
        // PartId like 'basePart, contactPart, loginPart, addressPart, paymentMethodPart'
        partId: {
            // required: if the part has to be included in veryfing validity of whole form
            required: false,
            partIsValid: false,
            inputs: {
                inputId: {
                    value: '',
                    isValid: '',
                    isTouched: false    
                }
            }    
        }
     },
    formIsValid: false
    }; 
 * 
 */

const formReducer = (state, action) => {
  const checkFormIsValid = () => {
    return true;
  };

  const checkPartIsValid = (partId) => {
    let partIsValid = true;
    for (const inputId in state.parts[partId].inputs) {
      if (!state.parts[partId].inputs[inputId]) {
        continue;
      }
      if (inputId !== action.inputId) {
        partIsValid = partIsValid && state.parts[partId].inputs[inputId].isValid;
      }
    }
    return partIsValid
  }

  switch (action.type) {
    case act.INPUT_CHANGE:
      console.log('inputChange action: ', action)
      let partIsValid = checkPartIsValid(action.partId)
      let currentInputIsValid = validate(action.value, action.validators)
      partIsValid = partIsValid && currentInputIsValid
      return {
        ...state,
        parts: {
          ...state.parts,
          [action.partId]: {
            ...state.parts[action.partId],
            inputs: {
              ...state.parts[action.partId].inputs,
              [action.inputId]: {
                ...state.parts[action.partId].inputs[action.inputId],
                value: action.value,
                isValid: currentInputIsValid
              },
            },
            partIsValid: partIsValid
          },
        },
        formIsValid: checkFormIsValid(),
      }
      case act.TOUCH_HANDLER: {
        return {
            ...state,
            parts: {
              ...state.parts,
              [action.partId]: {
                ...state.parts[action.partId],
                inputs: {
                  ...state.parts[action.partId].inputs,
                  [action.inputId]: {
                    ...state.parts[action.partId].inputs[action.inputId],
                    isTouched: true,
                  },
                },
              },
            },
            formIsValid: checkFormIsValid(),
          }
      }
    default:
      throw new Error("Špatný type v GortozFormHook");
  }
};

const act = {
  INPUT_CHANGE: "INPUT_CHANGE",
  TOUCH_HANDLER: 'TOUCH_HANDLER'
};

export const useGortozForm = (initFormData) => {
  const [formState, dispatch] = useReducer(formReducer, initFormData || {});

  const inputChange = (partId, inputId, value, validators) => {
    dispatch({ type: act.INPUT_CHANGE, partId, inputId, value, validators });
  };

  const touchHandler = (partId, inputId) => {
    dispatch({ type: act.TOUCH_HANDLER, partId, inputId });
  };

  return {
    formState,
    inputChange,
    touchHandler
  };
};
