import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

// import Spinner from "../shared/components/Spinner/Spinner";
// import ErrorModal from "../shared/components/Error/ErrorModal";

// Hooks
import { useHttp } from "../../hooks/http-hook";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

// Utils
import { Role } from "../../utils/roles";

// import "./SigninPage.css";

const SigninPage = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading, error, clearError } = useHttp();
  const navigate = useNavigate();

  const formInitialValues = {
    email: "",
    password: "",
  };

  const postLoginHandler = async (values) => {
    let responseData;
    try {
      // Retrieving user data
      responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        "POST",
        JSON.stringify({
          email: values.email,
          password: values.password,
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
      if (responseData.role === Role.USER) navigate("/");
      else navigate("/");
    } catch (err) {}
  };

  return (
    <div className="form--wrapper column">
      <Formik initialValues={formInitialValues} onSubmit={postLoginHandler}>
        <Form className="custom_form">
          <Field
            className="text-input"
            name="email"
            type="text"
            placeholder="Email"
          />
          <Field
            className="text-input"
            name="password"
            type="password"
            placeholder="Heslo"
          />
          <button className="button-submit" type="submit">
            Přihlásit se
          </button>
        </Form>
      </Formik>
      {/* {error && <ErrorModal error={error} onClear={clearError} />}
      <div className="spinner--wrapper"> {isLoading && <Spinner />}</div> */}
    </div>
  );
};

export default SigninPage;
