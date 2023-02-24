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
  const checkFormIsValid = (partIsValid) => {
    let formIsValid = true;
    for (const partId in state.parts) {
      if (!state.parts[partId]) {
        continue;
      }
      if (partId !== action.partId && state.parts[partId].required) {
        formIsValid = formIsValid && state.parts[partId].partIsValid;
      } else if (state.parts[partId].required) {
        formIsValid = formIsValid && partIsValid
      }
    }
    return formIsValid
  };

  const checkFormIsValid_reauiredChanged = () => {
    let formIsValid = true;
    for (const partId in state.parts) {
      if (!state.parts[partId]) {
        continue;
      }
      if (partId !== action.partId && state.parts[partId].required) {
        formIsValid = formIsValid && state.parts[partId].partIsValid;
      } else if (action.value) {
        formIsValid = formIsValid && state.parts[partId].partIsValid
      }
    }
    return formIsValid
  };


  const checkPartIsValid = (partId, currentInputIsValid) => {
    let partIsValid = true;
    for (const inputId in state.parts[partId].inputs) {
      if (!state.parts[partId].inputs[inputId]) {
        continue;
      }
      if (inputId !== action.inputId) {
        partIsValid = partIsValid && state.parts[partId].inputs[inputId].isValid;
      } else {
        partIsValid = partIsValid && currentInputIsValid
      }
    }
    return partIsValid
  }

  switch (action.type) {
    case act.INPUT_CHANGE:
      console.log('inputChange action: ', action)
      let currentInputIsValid = validate(action.value, action.validators)
      let partIsValid = checkPartIsValid(action.partId, currentInputIsValid)
      let formIsValid = checkFormIsValid(partIsValid)
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
        formIsValid: formIsValid,
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
            }
          }
      }
      case act.SET_REQUIRED: {
        let formIsValid = checkFormIsValid_reauiredChanged()
        const updatedState = {
          ...state,
          parts: {
            ...state.parts,
            [action.partId]: {
              ...state.parts[action.partId],
              required: action.value
            }
          },
          formIsValid: formIsValid
        }
        console.log( updatedState)
        return updatedState
      }
    default:
      throw new Error("Špatný type v GortozFormHook");
  }
};

const act = {
  INPUT_CHANGE: "INPUT_CHANGE",
  TOUCH_HANDLER: 'TOUCH_HANDLER',
  SET_REQUIRED: 'SET_REQUIRED'
};

export const useGortozForm = (initFormData) => {
  const [formState, dispatch] = useReducer(formReducer, initFormData || {});

  const inputChange = (partId, inputId, value, validators) => {
    dispatch({ type: act.INPUT_CHANGE, partId, inputId, value, validators });
  };

  const touchHandler = (partId, inputId) => {
    dispatch({ type: act.TOUCH_HANDLER, partId, inputId });
  };

  const setRequired = (partId, value) => {
    dispatch({ type: act.SET_REQUIRED, partId, value})
  }

  return {
    formState,
    inputChange,
    touchHandler,
    setRequired
  };
};
