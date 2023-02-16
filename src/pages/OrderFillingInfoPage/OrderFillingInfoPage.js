import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/UI/FormElements/Input";

// Contexts
import { CartContext } from "../../contexts/CartContext";

// Hooks
import { useForm } from "../../hooks/form-hook";
import { useHttp } from "../../hooks/http-hook";

// Validators
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utils/validators";

const OrderFillingInfoPage = () => {

  const navigate = useNavigate()
  const { sendRequest } = useHttp()

  // Data
  const cart = useContext(CartContext);

  const [wantsCertificate, setWantsCertificate] = useState(false)
  const [buyingAsCompany, setBuyingAsCompany] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [deliveryMethod, setdeliveryMethod] = useState(null)

  const areProducts = true;
  const areDonations = cart.cartState.donations.length > 0;

  const [formState, inputHandler, setFormData] = useForm();

  const postCreateOrder = async () => {
    try {
      const formData = {
        contact: {
          name: formState.inputs.name.value,
          surname: formState.inputs.surname.value,
          email: formState.inputs.email.value,
          mobile: formState.inputs.mobile.value
        },
        paymentMethod: paymentMethod,
        deliveryMethod: deliveryMethod,
        buyingAsCompany: buyingAsCompany,
        companyInfo: {
          title: buyingAsCompany ? formState.inputs.company.value : '',
          ico: buyingAsCompany ? formState.inputs.ico.value : '',
          dic: buyingAsCompany ? formState.inputs.dic.value : ''
        },
        wantsCertificate: wantsCertificate,
        certificateInfo: {
          street_num: wantsCertificate ? formState.inputs.street_num.value : '',
          city: wantsCertificate ? formState.inputs.city.value : '',
          zipCode: wantsCertificate ? formState.inputs.zipCode.value : ''
        },
        products: cart.cartState.products,
        donations: cart.cartState.donations,
        pieces: cart.cartState.pieces
      }
      console.log(formData)

      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/create-order`, 
        'POST',
        JSON.stringify(formData),
        {
          'Content-type': 'application/json'
        })

      if (responseData.orderId) {
        cart.clearCart()
        navigate(`/objednavka/${responseData.orderId}`)
      }
    } catch (err) {}
  }

  return (
    <section className="order-filling-info-section">
      <div>OrderFillingInfoPage</div>
      <p>Nakoupit jako {buyingAsCompany ? 'Firma' : 'Osoba'}</p>
      <button onClick={() => setBuyingAsCompany(true)}>Firma</button>
      <button onClick={() => setBuyingAsCompany(false)}>Fyzická osoba</button>
      <button onClick={() => setWantsCertificate(prev => !prev)}>Chci certifikát</button>
      <h3>Kontaktní údaje</h3>
      <Input
        id="name"
        element="input"
        type="text"
        label="Jméno"
        validators={[VALIDATOR_MINLENGTH(1)]}
        errorText="Prosím zadejte jméno."
        onInput={inputHandler}
        initialValue={""}
        initialValid={false}
      />
      <Input
        id="surname"
        element="input"
        type="text"
        label="Příjmení"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Prosím zadejte příjmení."
        onInput={inputHandler}
        initialValue={""}
        initialValid={false}
      />
      <Input
        id="email"
        element="input"
        type="text"
        label="Email"
        validators={[VALIDATOR_EMAIL()]}
        errorText="Prosím zadejte email."
        onInput={inputHandler}
        initialValue={""}
        initialValid={false}
      />
      <Input
        id="mobile"
        element="input"
        type="text"
        label="Tel. číslo"
        validators={[VALIDATOR_MINLENGTH(9)]}
        errorText="Prosím zadejte telefonní číslo."
        onInput={inputHandler}
        initialValue={""}
        initialValid={false}
      />
      {buyingAsCompany && <Fragment><h3>Firemní údaje</h3><Input
        id="company"
        element="input"
        type="text"
        label="Název společnosti"
        validators={[VALIDATOR_MINLENGTH(9)]}
        errorText="Prosím zadejte název společnosti."
        onInput={inputHandler}
        initialValue={""}
        initialValid={false}
      />
      <Input
        id="ico"
        element="input"
        type="text"
        label="IČO"
        validators={[VALIDATOR_MINLENGTH(3)]}
        errorText="Prosím zadejte IČO."
        onInput={inputHandler}
        initialValue={""}
        initialValid={false}
      />
      <Input
        id="dic"
        element="input"
        type="text"
        label="DIČ"
        validators={[VALIDATOR_MINLENGTH(3)]}
        errorText="Prosím zadejte DIČ."
        onInput={inputHandler}
        initialValue={""}
        initialValid={false}
      /></Fragment>}
      {wantsCertificate && <Fragment><h3>Certifikát</h3><Input
        id="street_num"
        element="input"
        type="text"
        label="Ulice a číslo popisné"
        validators={[VALIDATOR_MINLENGTH(9)]}
        errorText="Prosím zadejte ulici a číslo popisné."
        onInput={inputHandler}
        initialValue={""}
        initialValid={false}
      />
      <Input
        id="city"
        element="input"
        type="text"
        label="Obec"
        validators={[VALIDATOR_MINLENGTH(3)]}
        errorText="Prosím zadejte obec."
        onInput={inputHandler}
        initialValue={""}
        initialValid={false}
      />
      <Input
        id="zipCode"
        element="input"
        type="text"
        label="PSČ"
        validators={[VALIDATOR_MINLENGTH(3)]}
        errorText="Prosím zadejte PSČ."
        onInput={inputHandler}
        initialValue={""}
        initialValid={false}
      /></Fragment>}
      <fieldset>
        <legend>Vyberte způsob platby</legend>
        <div>
          <button onClick={() => setPaymentMethod('card')}>Platební karta</button>
          <label for="card">Platební karta</label>
        </div>
        <div>
        <button onClick={() => setPaymentMethod('banking')}>Bankovním převodem</button>
          <label for="send">Bankovní převod</label>
        </div>
      </fieldset>
      {areDonations && <h2>V košíku jsou i fyzické produkty, sdělte nám prosím doručovací adresu</h2>}
      <p>Validní vše: {formState.isValid ? "Ano" : "Ne"}</p>
      <h2>Shrnutí objednávky</h2>
      {cart.cartState.pieces.map(p => <p key={p.number}>Název: {p.title} Cena: {p.price}</p>)}
      <button onClick={postCreateOrder}>Dokončit ojednávku</button>
    </section>
  );
};

export default OrderFillingInfoPage;
