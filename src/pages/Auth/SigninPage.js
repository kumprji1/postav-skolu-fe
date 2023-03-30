import React, { useContext, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { NavLink, useNavigate } from "react-router-dom";

// Google OAuth2
import jwt_decode from 'jwt-decode'

// import Spinner from "../shared/components/Spinner/Spinner";
// import ErrorModal from "../shared/components/Error/ErrorModal";

// FormComponents
import BForm from '../../components/Base/BForm/BForm'
import BFormPart from '../../components/Base/BForm/BFormPart'
import BInput from '../../components/Base/BForm/BInput'
import BSubmit from '../../components/Base/BForm/BSubmit'


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

// import "./SigninPage.css";

const SigninPage = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading, error, clearError } = useHttp();
  const navigate = useNavigate();
  const googleDivRef = useRef()

  useEffect(() => {
    console.log(error)
  }, [error])

  // Google Login
  const postLoginGoogle = async (email, name, surname) => {
    let responseData;
    try {
      // Retrieving user data
      responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login-google`,
        "POST",
        JSON.stringify({
          email: email,
          name: name,
          surname: surname
        }),
        {
          "Content-type": "application/json",
        }
      );
      // Login in client
      auth.login(
        responseData._id,
        responseData.email,
        responseData.name,
        responseData.surname,
        responseData.role,
        responseData.token
      );

      // Redirects for user and admin
      if (responseData.role === Roles.USER) navigate("/");
      else navigate("/");
    } catch (err) {}
  }
  const google = window.google

  const handleCallbackResponse = (res) => {
    const user = jwt_decode(res.credential)
    postLoginGoogle(user.email, user.given_name, user.family_name)
  }
  useEffect(() => {
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
            googleDivRef.current,
            { theme: 'outline', size: "large" }
        )
  }, [google, googleDivRef])

  // Gortoz Form
  const initFormData = {
    parts: {
      loginPart: {
        required: true,
        partIsValid: false,
        inputs: {
          email: {
            value: "",
            isValid: false,
            isTouched: "",
          },
          password: {
            value: "",
            isValid: false,
            isTouched: "",
          },
        },
      },
    },
    formIsValid: false
  };
  const { formState, inputChange, touchHandler } = useGortozForm(initFormData);
  // On Submit Form
  const postLoginHandler = async () => {
    let responseData;
    try {
      // Retrieving user data
      responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        "POST",
        JSON.stringify({
          email: formState.parts.loginPart.inputs.email.value,
          password: formState.parts.loginPart.inputs.password.value,
        }),
        {
          "Content-type": "application/json",
        }
      );
      // Login in client
      auth.login(
        responseData._id,
        responseData.email,
        responseData.name,
        responseData.surname,
        responseData.role,
        responseData.token
      );

      // Redirects for user and admin
      if (responseData.role === Roles.USER) navigate("/");
      else navigate("/");
    } catch (err) {}
  };

  return (
    <div className="form--wrapper column">
        <BForm classNames='column'>
            <BFormPart title="Přihlašovací údaje">
                <BInput 
                    title="Email"
                    input={formState.parts.loginPart.inputs.email}
                    partId="loginPart"
                    inputId="email"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                    error="Prosím, zadejte email"
                    inputChange={inputChange}
                    touchHandler={touchHandler}
                />
                <BInput 
                    title="Heslo"
                    input={formState.parts.loginPart.inputs.password}
                    partId="loginPart"
                    inputId="password"
                    validators={[VALIDATOR_REQUIRE()]}
                    error="Prosím, zadejte heslo"
                    inputChange={inputChange}
                    touchHandler={touchHandler}
                    secret={true}
                />
            </BFormPart>
            <BSubmit isValid={formState.formIsValid} onClick={postLoginHandler}>Přihlásit</BSubmit>
        </BForm>
        <div ref={googleDivRef} style={{marginTop: '1rem', marginBottom: '1rem'}}>
        </div>
        <NavLink to="/registrace" className="btn--secondary btn-small">Registrovat</NavLink>
        <SwingSpinner isLoading={isLoading} />
      {error && <ErrorModal error={error} onClear={clearError} />}
    </div>
  );
};

export default SigninPage;
