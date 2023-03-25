import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

// import ErrorModal from "../shared/components/Error/ErrorModal";

// Hooks
import { useHttp } from "../../hooks/http-hook";

const SignupUserPage = () => {
  const navigate = useNavigate();
  const { sendRequest, error, clearError } = useHttp();

  const formInitialValues = {
    email: "",
    name: "",
    surname: "",
    password: "",
    rePassword: "",
  };
  const postRegisterHandler = async (values) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/auth/register-user`,
        "POST",
        JSON.stringify(values),
        {
          "content-type": "application/json",
        }
      );
      navigate("/prihlaseni");
    } catch (error) {}
  };

  return (
    <section className="about-section">
      <p>Registrace uživatele</p>
      <Formik initialValues={formInitialValues} onSubmit={postRegisterHandler}>
        <Form>
          <Field name="email" type="text" placeholder="Email" />
          <Field name="name" type="text" placeholder="Jméno" />
          <Field name="surname" type="text" placeholder="Příjmení" />
          <Field name="password" type="password" placeholder="Heslo" />
          <Field name="rePassword" type="password" placeholder=" Heslo znovu" />
          <button type="submit">Registrace</button>
        </Form>
      </Formik>
      {/* {error && <ErrorModal error={error} onClear={clearError} />} */}
    </ section>
  );
};

export default SignupUserPage;
