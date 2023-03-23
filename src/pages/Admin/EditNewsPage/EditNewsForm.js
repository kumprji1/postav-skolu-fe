import React, { useContext } from "react";

import { useHttp } from "../../../hooks/http-hook";

import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BForm from "../../../components/Base/BForm/BForm";
import BFormPart from "../../../components/Base/BForm/BFormPart";
import BInput from "../../../components/Base/BForm/BInput";
import { useGortozForm } from "../../../hooks/g-form-hook";
import { VALIDATOR_REQUIRE } from "../../../utils/validators";
import BTextarea from "../../../components/Base/BForm/BTextarea";
import BSubmit from "../../../components/Base/BForm/BSubmit";

const EditNewsForm = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { sendRequest } = useHttp();

  const initFormData = {
    parts: {
      basePart: {
        required: true,
        partIsValid: false,
        inputs: {
          title: {
            value: props.news.title,
            isValid: true,
            isTouched: false,
          },
          desc: {
            value: props.news.text,
            isValid: true,
            isTouched: false,
          },
        },
      },
    },
    formIsValid: true,
  };
  const { formState, inputChange, touchHandler } = useGortozForm(initFormData);

  const updateNewsHandler = async () => {
    try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/admin/edit-news/${props.news._id}`, 'PATCH', JSON.stringify({
            title: formState.parts.basePart.inputs.title.value,
            text: formState.parts.basePart.inputs.text.value
        }), {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        })
        if (responseData.msg === 'OK') navigate(`/projekt/${props.news.projectId.urlTitle}`)
    } catch (err) {}
  }

  return (
    <BForm classNames='edit-project-form'>
      <BFormPart title="Údaje aktuality">
        <BInput
          title="Název"
          input={formState.parts.basePart.inputs.title}
          partId="basePart"
          inputId="title"
          validators={[VALIDATOR_REQUIRE()]}
          error="Prosím, zadejte název"
          inputChange={inputChange}
          touchHandler={touchHandler}
        />
        <BTextarea
          title="Text"
          input={formState.parts.basePart.inputs.text}
          partId="basePart"
          inputId="text"
          validators={[VALIDATOR_REQUIRE()]}
          error="Prosím, zadejte popis"
          inputChange={inputChange}
          touchHandler={touchHandler}
        />
      </BFormPart>
      <BSubmit isValid={formState.formIsValid} onClick={updateNewsHandler}>Aktualizovat</BSubmit>
    </BForm>
  );
};

export default EditNewsForm;
