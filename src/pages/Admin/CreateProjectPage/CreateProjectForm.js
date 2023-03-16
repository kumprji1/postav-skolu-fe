import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BForm from "../../../components/Base/BForm/BForm";
import BFormPart from "../../../components/Base/BForm/BFormPart";
import BInput from "../../../components/Base/BForm/BInput";
import BSubmit from "../../../components/Base/BForm/BSubmit";
import ImageUpload from "../../../components/UI/FormElements/ImageUpload";
import { AuthContext } from "../../../contexts/AuthContext";
import { useGortozForm } from "../../../hooks/g-form-hook";
import { useHttp } from "../../../hooks/http-hook";
import { VALIDATOR_REQUIRE } from "../../../utils/validators";

const CreateProjectForm = () => {
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
            value: "",
            isValid: false,
            isTouched: false,
          },
          desc: {
            value: "",
            isValid: false,
            isTouched: false,
          },
          urlTitle: {
            value: "",
            isValid: false,
            isTouched: false,
          },
          photo: {
            value: "",
            isValid: false,
            isTouched: false,
          },
        },
      },
    },
    formIsValid: false,
  };
  const { formState, inputChange, touchHandler } = useGortozForm(initFormData);

  const postCreateProject = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/create-project`,
        "POST",
        JSON.stringify({
          title: formState.parts.basePart.inputs.title.value,
          desc: formState.parts.basePart.inputs.desc.value,
          urlTitle: formState.parts.basePart.inputs.urlTitle.value,
          photo: formState.parts.basePart.inputs.photo.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      if (responseData.msg === "OK")
        navigate(`/projekt/${formState.parts.basePart.inputs.urlTitle.value}`);
    } catch (err) {}
  };

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
        <BInput
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
          classNames="hidden"
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
      <BSubmit onClick={postCreateProject} isValid={formState.formIsValid}>
        Vytvořit projekt
      </BSubmit>
    </BForm>
  );
};

export default CreateProjectForm;
