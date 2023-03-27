import React, { useContext, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { NavLink, useNavigate } from "react-router-dom";

// Google OAuth2
import jwt_decode from "jwt-decode";

// import Spinner from "../shared/components/Spinner/Spinner";
// import ErrorModal from "../shared/components/Error/ErrorModal";

// FormComponents
import BForm from "../../components/Base/BForm/BForm";
import BFormPart from "../../components/Base/BForm/BFormPart";
import BInput from "../../components/Base/BForm/BInput";
import BSubmit from "../../components/Base/BForm/BSubmit";

// Hooks
import { useHttp } from "../../hooks/http-hook";
import { useGortozForm } from "../../hooks/g-form-hook";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

// Utils
import { Roles } from "../../utils/roles";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../../utils/validators";
import SwingSpinner from "../../components/UI/Spinners/SwingSpinner";
import ErrorModal from "../../components/Error/ErrorModal";

const SignupUserPage = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading, error, clearError } = useHttp();
  const navigate = useNavigate();

  // Gortoz Form
  const initFormData = {
    parts: {
      basePart: {
        required: true,
        partIsValid: false,
        inputs: {
          email: {
            value: "",
            isValid: false,
            isTouched: "",
          },
          name: {
            value: "",
            isValid: false,
            isTouched: "",
          },
          surname: {
            value: "",
            isValid: false,
            isTouched: "",
          },
          password: {
            value: "",
            isValid: false,
            isTouched: "",
          },
          rePassword: {
            value: "",
            isValid: false,
            isTouched: "",
          },
        },
      },
    },
    formIsValid: false,
  };
  const { formState, inputChange, touchHandler } = useGortozForm(initFormData);

  // On Submit Form
  const postRegisterHandler = async () => {
    let responseData;
    try {
      // seding user data
      responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/register-user`,
        "POST",
        JSON.stringify({
          name: formState.parts.basePart.inputs.name.value,
          surname: formState.parts.basePart.inputs.surname.value,
          email: formState.parts.basePart.inputs.email.value,
          password: formState.parts.basePart.inputs.password.value,
          rePassword: formState.parts.basePart.inputs.rePassword.value,
        }),
        {
          "Content-type": "application/json",
        }
      );
      navigate("/prihlaseni");
    } catch (err) {}
  };

  return (
    <div className="form--wrapper column">
      <BForm classNames="column">
        <BFormPart title="Uživatelské údaje">
          <BInput
            title="Jméno"
            input={formState.parts.basePart.inputs.name}
            partId="basePart"
            inputId="name"
            validators={[VALIDATOR_REQUIRE()]}
            error="Prosím, zadejte jméno"
            inputChange={inputChange}
            touchHandler={touchHandler}
          />
          <BInput
            title="Příjmení"
            input={formState.parts.basePart.inputs.surname}
            partId="basePart"
            inputId="surname"
            validators={[VALIDATOR_REQUIRE()]}
            error="Prosím, zadejte příjmení"
            inputChange={inputChange}
            touchHandler={touchHandler}
          />
          <BInput
            title="Email"
            type="email"
            input={formState.parts.basePart.inputs.email}
            partId="basePart"
            inputId="email"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            error="Prosím, zadejte email"
            inputChange={inputChange}
            touchHandler={touchHandler}
          />
          <BInput
            title="Heslo"
            input={formState.parts.basePart.inputs.password}
            partId="basePart"
            inputId="password"
            validators={[VALIDATOR_REQUIRE()]}
            error="Prosím, zadejte heslo"
            inputChange={inputChange}
            touchHandler={touchHandler}
            secret={true}
          />
          <BInput
            title="Heslo znovu"
            input={formState.parts.basePart.inputs.rePassword}
            partId="basePart"
            inputId="rePassword"
            validators={[VALIDATOR_REQUIRE()]}
            error="Prosím, zadejte heslo"
            inputChange={inputChange}
            touchHandler={touchHandler}
            secret={true}
          />
        </BFormPart>
        <BSubmit isValid={formState.formIsValid} onClick={postRegisterHandler}>
          Registrovat
        </BSubmit>
      </BForm>
      <SwingSpinner isLoading={isLoading} />
      {error && <ErrorModal error={error} onClear={clearError} />}
    </div>
  );
};

export default SignupUserPage;
