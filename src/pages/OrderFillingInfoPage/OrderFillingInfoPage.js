import React, { useContext } from "react";

import Input from "../../components/UI/FormElements/Input";

// Contexts
import { CartContext } from "../../contexts/CartContext";

// Hooks
import { useForm } from "../../hooks/form-hook";

// Validators
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../../utils/validators";

const OrderFillingInfoPage = () => {
  const cart = useContext(CartContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
      surname: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  return (
    <section className="order-filling-info-section">
      <div>OrderFillingInfoPage</div>
      <Input
        id="name"
        element="input"
        type="text"
        label="Jméno"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Prosím zadejte jméno."
        onInput={inputHandler}
        initialValue={""}
        initialValid={true}
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
        initialValid={true}
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
        initialValid={true}
      />
    </section>
  );
};

export default OrderFillingInfoPage;
