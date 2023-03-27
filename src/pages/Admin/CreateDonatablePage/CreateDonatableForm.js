import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BForm from "../../../components/Base/BForm/BForm";
import BFormPart from "../../../components/Base/BForm/BFormPart";
import BInput from "../../../components/Base/BForm/BInput";
import BSubmit from "../../../components/Base/BForm/BSubmit";
import BTextarea from "../../../components/Base/BForm/BTextarea";
import ImageUpload from "../../../components/UI/FormElements/ImageUpload";
import { AuthContext } from "../../../contexts/AuthContext";
import { useGortozForm } from "../../../hooks/g-form-hook";
import { useHttp } from "../../../hooks/http-hook";
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from "../../../utils/validators";

const CreateDonatableForm = (props) => {
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
          demandedMoney: {
            value: "",
            isValid: false,
            isTouched: false,
          },
          preparedPrices: {
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

  const postCreateDonatable = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/create-donatable/${props.projectId}`,
        "POST",
        JSON.stringify({
          title: formState.parts.basePart.inputs.title.value,
          desc: formState.parts.basePart.inputs.desc.value,
          demandedMoney: formState.parts.basePart.inputs.demandedMoney.value,
          preparedPrices: formState.parts.basePart.inputs.preparedPrices.value,
          photo: formState.parts.basePart.inputs.photo.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      if (responseData.msg === "OK")
        navigate(-1);
    } catch (err) {}
  };

  return (
    <BForm classNames="edit-project-form">
      <BFormPart title="Informace o sbírce">
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
        {/* <BInput
          title="Popis"
          input={formState.parts.basePart.inputs.desc}
          partId="basePart"
          inputId="desc"
          validators={[VALIDATOR_REQUIRE()]}
          error="Prosím, zadejte popis"
          inputChange={inputChange}
          touchHandler={touchHandler}
        /> */}
        <BInput
          title="Chceme vybrat"
          input={formState.parts.basePart.inputs.demandedMoney}
          partId="basePart"
          inputId="demandedMoney"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(10)]}
          error="Prosím, zadejte vybíranou částku"
          inputChange={inputChange}
          touchHandler={touchHandler}
        />
        <BInput
          title="Předpřipravené částky"
          input={formState.parts.basePart.inputs.preparedPrices}
          partId="basePart"
          inputId="preparedPrices"
          validators={[VALIDATOR_REQUIRE()]}
          error="Prosím, zadejte předpřipravené částky"
          placeholder="100,200,500"
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
      <BSubmit onClick={postCreateDonatable} isValid={formState.formIsValid}>
        Vytvořit sbírku
      </BSubmit>
    </BForm>
  );
};

export default CreateDonatableForm;
