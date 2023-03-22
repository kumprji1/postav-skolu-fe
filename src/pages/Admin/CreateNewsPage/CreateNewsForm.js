import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BForm from "../../../components/Base/BForm/BForm";
import BFormPart from "../../../components/Base/BForm/BFormPart";
import BInput from "../../../components/Base/BForm/BInput";
import BSubmit from "../../../components/Base/BForm/BSubmit";
import BTextarea from "../../../components/Base/BForm/BTextarea";
import ImageUpload from "../../../components/UI/FormElements/ImageUpload";
import { AuthContext } from "../../../contexts/AuthContext";
import { useGortozForm } from "../../../hooks/g-form-hook";
import { useHttp } from "../../../hooks/http-hook";
import { VALIDATOR_REQUIRE } from "../../../utils/validators";

const CreateNewsForm = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { sendRequest } = useHttp();
  const { urlTitle } = useParams()
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
          text: {
            value: "",
            isValid: false,
            isTouched: false,
          }
        },
      },
    },
    formIsValid: false,
  };
  const { formState, inputChange, touchHandler } = useGortozForm(initFormData);

  const postCreateNews = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/create-news/${urlTitle}`,
        "POST",
        JSON.stringify({
          title: formState.parts.basePart.inputs.title.value,
          text: formState.parts.basePart.inputs.text.value
      }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      if (responseData.msg === "OK")
        navigate(`/projekt/${urlTitle}`);
    } catch (err) {}
  };

  return (
    <BForm classNames="edit-project-form">
      <BFormPart title="Nová aktualita">
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
          input={formState.parts.basePart.inputs.text}
          partId="basePart"
          inputId="text"
          validators={[VALIDATOR_REQUIRE()]}
          error="Prosím, zadejte popis"
          inputChange={inputChange}
          touchHandler={touchHandler}
        />
      </BFormPart>
      <BSubmit onClick={postCreateNews} isValid={formState.formIsValid}>
        Vytvořit aktualitu
      </BSubmit>
    </BForm>
  );
};

export default CreateNewsForm;
