import React, { Fragment, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import { useBaseDonation } from "../../../hooks/base-donation-hook";
import { useGortozForm } from "../../../hooks/g-form-hook";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../utils/validators";

const DonationOptions = (props) => {
  const { formState, inputChange } = useGortozForm({
    parts: {
      basePart: {
        partIsValid: false,
        required: true,
        inputs: {
          price: {
            value: null,
            isValid: false,
            isTouched: false,
          },
          wantsCustom: {
            value: false,
            isValid: false,
            isTouched: false,
          },
          isAnonymous: {
            value: null,
            isValid: false,
            isTouched: false,
          },
          note: {
            value: '',
            isValid: true,
            isTouched: false,
          },
        },
      },
    },
    formIsValid: false,
  });
  // const { baseDonationState, selectDonation, inputHandler, selectCustomBtn } = useBaseDonation({
  //   options: props.donatable.preparedPrices.map((p) => ({
  //     price: p,
  //     isSelected: false,
  //   })),
  //   price: null,
  //   isSelected: false,
  //   isAnonymous: false,
  //   wantsCustom: false,
  // });

  const cart = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <Fragment>
      {props.donatable.preparedPrices.split(',').map((p) => (
        <button
          className={
            p == formState.parts.basePart.inputs.price.value
              ? `donate-btn-price-selected donate-btn-price`
              : "donate-btn-price-not-selected donate-btn-price"
          }
          onClick={() => {
            inputChange("basePart", "price", p, [VALIDATOR_MIN(2)]);
            inputChange("basePart", "wantsCustom", false, []);
          }}
          key={p}
        >
          {p}
        </button>
      ))}
      <button
        className={
          formState.parts.basePart.inputs.wantsCustom.value
            ? `donate-btn-price-selected donate-btn-price`
            : "donate-btn-price-not-selected donate-btn-price"
        }
        onClick={() =>
          inputChange(
            "basePart",
            "wantsCustom",
            !formState.parts.basePart.inputs.wantsCustom.value,
            []
          )
        }
      >
        Vlastní částka
      </button>
      {formState.parts.basePart.inputs.wantsCustom.value && (
        <input
          className="donatable-input-custom-price"
          type="text"
          onChange={(e) => {
            inputChange("basePart", "price", e.currentTarget.value, [
              VALIDATOR_MIN(100),
            ]);
          }}
          value={formState.parts.basePart.inputs.price.value}
        ></input>
      )}

      <div
        className={`donatable-choose-visibility--wrapper ${
          formState.parts.basePart.inputs.price.isValid &&
          " donatable-choose-visibility--wrapper-show"
        }`}
      >
        <h1 className="donatable-choose-visibility-title">
          Chcete zveřejnit své jméno u daru?
        </h1>
        <button
          className={`${
            formState.parts.basePart.inputs.isAnonymous.value === false
              ? "bbutton"
              : "bbutton-outline"
          }`}
          onClick={(e) =>
            inputChange("basePart", "isAnonymous", false, [VALIDATOR_REQUIRE()])
          }
        >
          Ano
        </button>
        <button
          className={`${
            formState.parts.basePart.inputs.isAnonymous.value === true
              ? "bbutton"
              : "bbutton-outline"
          }`}
          onClick={(e) =>
            inputChange("basePart", "isAnonymous", true, [VALIDATOR_REQUIRE()])
          }
        >
          Ne
        </button>
      </div>
      <div>
        <input
          value={formState.parts.basePart.inputs.note.value}
          onChange={(e) =>
            inputChange('basePart', 'note', e.currentTarget.value, [VALIDATOR_MAXLENGTH(100)])
          }
          type="text"
          className={`donatable-chci-sdelit-input ${
            formState.parts.basePart.inputs.price.isValid &&
            formState.parts.basePart.inputs.isAnonymous.isValid
              ? " donatable-chci-sdelit-input-show"
              : ""
          }`}
          placeholder="Chci vám sdělit..."
        />
      </div>
      <div className="donate-btn-to-cart--wrapper">
        <button
          className={"donate-btn-to-cart"}
          disabled={!formState.formIsValid}
          onClick={() => {
            cart.addDonations([
              {
                price: formState.parts.basePart.inputs.price.value,
                donatableId: props.donatable._id,
                title: props.donatable.title,
                photo: props.donatable.photo,
                id: new Date().toISOString(),
                isAnonymous: formState.parts.basePart.inputs.isAnonymous.value,
                note: formState.parts.basePart.inputs.note.value
              },
            ]);
            navigate("/kosik");
          }}
        >
          Přispět {formState.parts.basePart.inputs.price.value}
          {formState.parts.basePart.inputs.price.value ? ",-" : ""}
        </button>
      </div>
    </Fragment>
  );
};

export default DonationOptions;
