import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BForm from "../../components/Base/BForm/BForm";
import BFormPart from "../../components/Base/BForm/BFormPart";
import BInput from "../../components/Base/BForm/BInput";
import BSubmit from "../../components/Base/BForm/BSubmit";

import Input from "../../components/UI/FormElements/Input";
import SwingSpinner from "../../components/UI/Spinners/SwingSpinner";

import CardIcon from "./card2.png";


// Contexts
import { CartContext } from "../../contexts/CartContext";

// Hooks
import { useMyForm } from "../../hooks/form-hook";
import { useGortozForm } from "../../hooks/g-form-hook";
import { useHttp } from "../../hooks/http-hook";

// Validators
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utils/validators";

import './OrderFillingInfoPage.scss'

const OrderFillingInfoPage = () => {
  const navigate = useNavigate();
  const { sendRequest, isLoading } = useHttp();

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])


  // Data
  const cart = useContext(CartContext);

  const [wantsCertificate, setWantsCertificate] = useState(false);
  const [buyingAsCompany, setBuyingAsCompany] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [deliveryMethod, setdeliveryMethod] = useState(null);

  const areProducts = true;
  const areDonations = cart.cartState.donations.length > 0;

  // const [formState, inputHandler, setFormData] = useMyForm();
  const initFormData = {
    parts: {
      contactPart: {
        required: true,
        partIsValid: false,
        inputs: {
          name: {
            value: "",
            isValid: false,
            isTouched: false,
          },
          surname: {
            value: "",
            isValid: false,
            isTouched: false,
          },
          email: {
            value: "",
            isValid: false,
            isTouched: false,
          },
          mobile: {
            value: "",
            isValid: false,
            isTouched: false,
          },
        },
      },
      companyPart: {
        required: false,
        partIsValid: false,
        inputs: {
          company: {
            value: "",
            isValid: false,
            isTouched: false,
          },
          ico: {
            value: "",
            isValid: false,
            isTouched: false,
          },
          dic: {
            value: "",
            isValid: false,
            isTouched: false,
          },
        },
      },
      certificatePart: {
        required: false,
        partIsValid: false,
        inputs: {
          street_num: {
            value: "",
            isValid: false,
            isTouched: false,
          },
          city: {
            value: "",
            isValid: false,
            isTouched: false,
          },
          zipCode: {
            value: "",
            isValid: false,
            isTouched: false,
          }
        }
      },
      //   deliveryPart: {
      //     required: false,
      //     partIsValid: false,
      //     inputs: {
      //       deliveryMethod: {
      //         value: "",
      //         isValid: false,
      //         isTouched: false,
      //       },
      //     },
      //   },
      paymentPart: {
        required: false,
        partIsValid: false,
        inputs: {
          paymentMethod: {
            value: "",
            isValid: false,
            isTouched: false,
          },
        },
      },
    },
    formIsValid: false,
  };
  const { formState, inputChange, touchHandler, setRequired } = useGortozForm(initFormData);

  const submitFormHandler = () => {
    const postCreateOrder = async () => {
      try {
        const formData = {
          contact: {
            name: formState.parts.contactPart.inputs.name.value,
            surname: formState.parts.contactPart.inputs.surname.value,
            email: formState.parts.contactPart.inputs.email.value,
            mobile: formState.parts.contactPart.inputs.mobile.value,
          },
          paymentMethod: 'CARD',
          deliveryMethod: '',
          buyingAsCompany: formState.parts.companyPart.required,
          companyInfo: {
            title: formState.parts.companyPart.required ? formState.parts.companyPart.inputs.company.value : "",
            ico: formState.parts.companyPart.required ? formState.parts.companyPart.inputs.ico.value : "",
            dic: formState.parts.companyPart.required ? formState.parts.companyPart.inputs.dic.value : "",
          },
          wantsCertificate: formState.parts.certificatePart.required,
          certificateInfo: {
            street_num: formState.parts.certificatePart.required ? formState.parts.certificatePart.inputs.street_num.value : "",
            city: formState.parts.certificatePart.required ? formState.parts.certificatePart.inputs.city.value : "",
            zipCode: formState.parts.certificatePart.required ? formState.parts.certificatePart.inputs.zipCode.value : "",
          },
          products: cart.cartState.products,
          donations: cart.cartState.donations,
        };
        console.log(formData);

        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/create-order`,
          "POST",
          JSON.stringify(formData),
          {
            "Content-type": "application/json",
          }
        );
        if (responseData.orderId) {
          cart.clearCart();
          window.location.replace(responseData.sessionUrl);
        } else {
          console.log('Špatná url')
        }
      } catch (err) { }
    }
    postCreateOrder()
  };

  return (
    <section className="order-filling-info-section">
      <BForm>
        <BFormPart title="Kontaktní údaje">
          <BInput
            title="Jméno"
            input={formState.parts.contactPart.inputs.name}
            partId="contactPart"
            inputId="name"
            validators={[VALIDATOR_REQUIRE()]}
            error="Prosím, zadejte jméno"
            inputChange={inputChange}
            touchHandler={touchHandler}
          />
          <BInput
            title="Příjmení"
            input={formState.parts.contactPart.inputs.surname}
            partId="contactPart"
            inputId="surname"
            validators={[VALIDATOR_REQUIRE()]}
            error="Prosím, zadejte příjmení"
            inputChange={inputChange}
            touchHandler={touchHandler}
          />
          <BInput
            title="Email"
            input={formState.parts.contactPart.inputs.email}
            partId="contactPart"
            inputId="email"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            error="Prosím, zadejte email"
            inputChange={inputChange}
            touchHandler={touchHandler}
          />
          <BInput
            title="Tel. číslo"
            input={formState.parts.contactPart.inputs.mobile}
            partId="contactPart"
            inputId="mobile"
            validators={[VALIDATOR_REQUIRE()]}
            error="Prosím, zadejte tel. číslo"
            inputChange={inputChange}
            touchHandler={touchHandler}
          />
          {/* <p>
          contactPart: {formState.parts.contactPart.partIsValid && "isValid"}
        </p> */}
        </BFormPart>
        {/* <BFormBtn>Nakupuji na firmu</BFormBtn> */}
        <div className="my-checkbox--wrapper" onClick={(e) => {
          setRequired(
            "companyPart",
            !formState.parts.companyPart.required
          )
        }}>
          <input type="checkbox" name="buyingAsCompany" checked={formState.parts.companyPart.required} />
          <label htmlFor="buyingAsCompany">Nakupuji na firmu</label>
        </div>
        {/* <button
          className={`${formState.parts.companyPart.required ? 'bbutton' : 'bbutton-outline'} btn-small`}
          onClick={(e) => {
            e.preventDefault()
            setRequired(
              "companyPart",
              !formState.parts.companyPart.required
            )
          }}
        >
          Nakupuji na firmu
        </button> */}
        {formState.parts.companyPart.required &&
          <BFormPart title="Firemní údaje">
            <BInput
              title="Názec společnosti"
              input={formState.parts.companyPart.inputs.company}
              partId="companyPart"
              inputId="company"
              validators={[VALIDATOR_REQUIRE()]}
              error="Prosím, zadejte název společnosti"
              inputChange={inputChange}
              touchHandler={touchHandler}
            />
            <BInput
              title="IČO"
              input={formState.parts.companyPart.inputs.ico}
              partId="companyPart"
              inputId="ico"
              validators={[VALIDATOR_REQUIRE()]}
              error="Prosím, zadejte IČO"
              inputChange={inputChange}
              touchHandler={touchHandler}
            />
            <BInput
              title="DIČ"
              input={formState.parts.companyPart.inputs.dic}
              partId="companyPart"
              inputId="dic"
              validators={[VALIDATOR_REQUIRE()]}
              error="Prosím, zadejte DIČ"
              inputChange={inputChange}
              touchHandler={touchHandler}
            />

            {/* <p>
            companyPart: {formState.parts.companyPart.partIsValid && "isValid"}
          </p> */}
          </BFormPart>
        }
        <div className="my-checkbox--wrapper" onClick={(e) => {
          setRequired(
            "certificatePart",
            !formState.parts.certificatePart.required
          )
        }}>
          <input type="checkbox" name="wantsCertificate" checked={formState.parts.certificatePart.required} />
          <label htmlFor="wantsCertificate">Chci certifikát</label>
        </div>
        {/* <button
          className={`${formState.parts.certificatePart.required ? 'bbutton' : 'bbutton-outline'} btn-small`}
          onClick={(e) => {
            e.preventDefault()
            setRequired(
              "certificatePart",
              !formState.parts.certificatePart.required
            )
          }}
        >
          Chci certifikát
        </button> */}
        {formState.parts.certificatePart.required &&
          <BFormPart title="Údaje pro certifikát">
            <BInput
              title="Ulice a číslo popisné"
              input={formState.parts.certificatePart.inputs.street_num}
              partId="certificatePart"
              inputId="street_num"
              validators={[VALIDATOR_REQUIRE()]}
              error="Prosím, zadejte ulici a č. popisné"
              inputChange={inputChange}
              touchHandler={touchHandler}
            />
            <BInput
              title="Město"
              input={formState.parts.certificatePart.inputs.city}
              partId="certificatePart"
              inputId="city"
              validators={[VALIDATOR_REQUIRE()]}
              error="Prosím, zadejte město"
              inputChange={inputChange}
              touchHandler={touchHandler}
            />
            <BInput
              title="PSČ"
              input={formState.parts.certificatePart.inputs.zipCode}
              partId="certificatePart"
              inputId="zipCode"
              validators={[VALIDATOR_REQUIRE()]}
              error="Prosím, zadejte PSČ"
              inputChange={inputChange}
              touchHandler={touchHandler}
            />
            {/* <p>
            certificatePart: {formState.parts.certificatePart.partIsValid && "isValid"}
          </p> */}
          </BFormPart>
        }
        {/* <p>formIsValid: {formState.formIsValid && "formIsValid"}</p> */}
        {/* <BSubmit isValid={formState.formIsValid} onClick={submitFormHandler}><img src={CardIcon} style={{width: "50px"}} />Dokončit objednávku</BSubmit> */}
        <button
      type="submit"
      onClick={(e) => {e.preventDefault(); submitFormHandler()}}
      className={`purchase-btn ${formState.formIsValid ? "btn--primary" : "btn--secondary"}`}
      disabled={!formState.formIsValid}
    >
      <img src={CardIcon} style={{width: "50px", marginRight: "0.5rem"}} />Dokončit objednávku
    </button>
      </BForm>
      <SwingSpinner isLoading={isLoading} />
    </section>
  );
};

export default OrderFillingInfoPage;
