import React, { useContext } from "react";

import { useHttp } from "../../../hooks/http-hook";

import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BForm from "../../../components/Base/BForm/BForm";
import BFormPart from "../../../components/Base/BForm/BFormPart";
import BInput from "../../../components/Base/BForm/BInput";
import { useGortozForm } from "../../../hooks/g-form-hook";
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from "../../../utils/validators";
import BTextarea from "../../../components/Base/BForm/BTextarea";
import BSubmit from "../../../components/Base/BForm/BSubmit";
import ImageUpload from "../../../components/UI/FormElements/ImageUpload";
import SwingSpinner from "../../../components/UI/Spinners/SwingSpinner";
import ErrorModal from "../../../components/Error/ErrorModal";

const EditProjectForm = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { sendRequest, isLoading, error, clearError } = useHttp();

  const initFormData = {
    parts: {
      basePart: {
        required: true,
        partIsValid: true,
        inputs: {
          title: {
            value: props.project.title,
            isValid: true,
            isTouched: false,
          },
          desc: {
            value: props.project.desc,
            isValid: true,
            isTouched: false,
          },
          photo: {
            value: props.project.photo,
            isValid: true,
            isTouched: false,
          },
          urlTitle: {
            value: props.project.urlTitle,
            isValid: true,
            isTouched: false,
          }
        },
      },
    },
    formIsValid: true,
  };
  const { formState, inputChange, touchHandler } = useGortozForm(initFormData);

  const updateProjectHandler = async () => {
    try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/admin/edit-project/${props.project._id}`, 'PATCH', JSON.stringify({
            title: formState.parts.basePart.inputs.title.value,
            urlTitle: formState.parts.basePart.inputs.urlTitle.value,
            desc: formState.parts.basePart.inputs.desc.value,
            photo: formState.parts.basePart.inputs.photo.value
        }), {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        })
        if (responseData.msg === 'OK') navigate(-1)
    } catch (err) {}
  }

  return (
    <BForm classNames="edit-project-form">
      <BFormPart title="Informace o projektu">
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
          title="Popis"
          input={formState.parts.basePart.inputs.desc}
          partId="basePart"
          inputId="desc"
          validators={[VALIDATOR_REQUIRE()]}
          error="Prosím, zadejte popis"
          inputChange={inputChange}
          touchHandler={touchHandler}
        />
        <BInput
          title="URL název"
          input={formState.parts.basePart.inputs.urlTitle}
          partId="basePart"
          inputId="urlTitle"
          validators={[VALIDATOR_REQUIRE()]}
          error="Prosím, zadejte URL název"
          inputChange={inputChange}
          touchHandler={touchHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputChange}
          errorText="Prosím nahrajte obrázek"
        />
        <BInput
          // classNames="hidden"
          title="Obrázek"
          input={formState.parts.basePart.inputs.photo}
          partId="basePart"
          inputId="photo"
          validators={[VALIDATOR_REQUIRE()]}
          error="Prosím, zadejte URL obrázku"
          inputChange={inputChange}
          touchHandler={touchHandler}
        />
      </BFormPart>
      <BSubmit onClick={updateProjectHandler} isValid={formState.formIsValid}>
        Aktualizovat projekt
      </BSubmit>
      <SwingSpinner isLoading={isLoading} />
      {error && <ErrorModal error={error} onClear={clearError} />}
    </BForm>
  );
};

export default EditProjectForm;
