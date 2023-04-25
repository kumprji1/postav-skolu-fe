import React, { useContext } from "react";

import { useHttp } from "../../../hooks/http-hook";

import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BForm from "../../../components/Base/BForm/BForm";
import BFormPart from "../../../components/Base/BForm/BFormPart";
import BInput from "../../../components/Base/BForm/BInput";
import { useGortozForm } from "../../../hooks/g-form-hook";
import { VALIDATOR_MIN, VALIDATOR_PREPARED_PRICES, VALIDATOR_REQUIRE } from "../../../utils/validators";
import BTextarea from "../../../components/Base/BForm/BTextarea";
import BSubmit from "../../../components/Base/BForm/BSubmit";
import ImageUpload from "../../../components/UI/FormElements/ImageUpload";
import SwingSpinner from "../../../components/UI/Spinners/SwingSpinner";
import ErrorModal from "../../../components/Error/ErrorModal";

const EditDonatableForm = (props) => {
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
            value: props.donatable.title,
            isValid: true,
            isTouched: false,
          },
          desc: {
            value: props.donatable.desc,
            isValid: true,
            isTouched: false,
          },
          demandedMoney: {
            value: props.donatable.demandedMoney,
            isValid: true,
            isTouched: false,
          },
          preparedPrices: {
            value: props.donatable.preparedPrices,
            isValid: true,
            isTouched: false,
          },
          photo: {
            value: props.donatable.photo,
            isValid: true,
            isTouched: false,
          },
        },
      },
    },
    formIsValid: true,
  };
  const { formState, inputChange, touchHandler } = useGortozForm(initFormData);

  const updateDonatableHandler = async () => {
    try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/admin/edit-donatable/${props.donatable._id}`, 'PATCH', JSON.stringify({
            title: formState.parts.basePart.inputs.title.value,
            desc: formState.parts.basePart.inputs.desc.value,
            demandedMoney: formState.parts.basePart.inputs.demandedMoney.value,
            preparedPrices: formState.parts.basePart.inputs.preparedPrices.value,
            photo: formState.parts.basePart.inputs.photo.value,
        }), {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        })
        if (responseData.msg === 'OK') navigate(-1)
    } catch (err) {}
  }

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
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_PREPARED_PRICES()]}
          error="Prosím, zadetjte alespoň 3 předpřipravené částky oddělné čárkou"
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
      <BSubmit onClick={updateDonatableHandler} isValid={formState.formIsValid}>
        Aktualizovat sbírku
      </BSubmit>
      <SwingSpinner isLoading={isLoading} />
      {error && <ErrorModal error={error} onClear={clearError} />}
    </BForm>

  );
};

export default EditDonatableForm;
