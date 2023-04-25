import React, { useEffect } from "react";
import BForm from "../../components/Base/BForm/BForm";
// import BFormBtn from "../../components/Base/BForm/BFormBtn";
import BFormPart from "../../components/Base/BForm/BFormPart";
import BInput from "../../components/Base/BForm/BInput";
import BSubmit from "../../components/Base/BForm/BSubmit";
import { useGortozForm } from "../../hooks/g-form-hook";
import { useHttp } from "../../hooks/http-hook";
import {
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utils/validators";

const TestingFormPage = () => {
  const { sendRequest } = useHttp();

  useEffect(() =>{
    const fetchData = async () => {
      const responseData = await sendRequest('https://api.publicapis.org/entries')
    }
    fetchData()
  } ,[])
  const initFormData = {
    parts: {
      contactPart: {
        required: true,
        partIsValid: false,
        inputs: {
          name: {
            value: "",
            isTouched: false,
            isValid: false,
          },
          surname: {
            value: "",
            isTouched: false,
            isValid: false,
          },
          email: {
            value: "",
            isTouched: false,
            isValid: false,
          },
          mobile: {
            value: "",
            isTouched: false,
            isValid: false,
          },
        },
      },
      companyPart: {
        required: false,
        partIsValid: false,
        inputs: {
          company: {
            value: "",
            isValid: false,
            isTouched: false,
          },
          ico: {
            value: "",
            isValid: false,
            isTouched: false,
          },
          dic: {
            value: "",
            isValid: false,
            isTouched: false,
          },
        },
      },
      certificatePart: {
        required: true,
        partIsValid: false,
        inputs: {
          street_num: {
            value: "",
            isValid: false,
            isTouched: false,
          },
          city: {
            value: "",
            isValid: false,
            isTouched: false,
          },
          zipCode: {
            value: "",
            isValid: false,
            isTouched: false,
          },
        },
      },
      // deliveryPart: {
      //   required: false,
      //   partIsValid: false,
      //   inputs: {
      //     deliveryMethod: {
      //       value: "",
      //       isValid: false,
      //       isTouched: false,
      //     },
      //   },
      // },
      // paymentPart: {
      //   required: false,
      //   partIsValid: false,
      //   inputs: {
      //     paymentMethod: {
      //       value: "",
      //       isValid: false,
      //       isTouched: false,
      //     },
      //   },
      // },
    },
    formIsValid: false,
  };
  const { formState, inputChange, touchHandler, setRequired } =
    useGortozForm(initFormData);

  return (
    <BForm>
      <BFormPart title="Kontaktní údaje">
        <BInput
          title="Jméno"
          input={formState.parts.contactPart.inputs.name}
          partId="contactPart"
          inputId="name"
          validators={[VALIDATOR_REQUIRE()]}
          error="Prosím, zadejte jméno"
          inputChange={inputChange}
          touchHandler={touchHandler}
        />
        <BInput
          title="Příjmení"
          input={formState.parts.contactPart.inputs.surname}
          partId="contactPart"
          inputId="surname"
          validators={[VALIDATOR_REQUIRE()]}
          error="Prosím, zadejte příjmení"
          inputChange={inputChange}
          touchHandler={touchHandler}
        />
        <BInput
          title="Email"
          input={formState.parts.contactPart.inputs.email}
          partId="contactPart"
          inputId="email"
          validators={[VALIDATOR_REQUIRE()]}
          error="Prosím, zadejte email"
          inputChange={inputChange}
          touchHandler={touchHandler}
        />
        <BInput
          title="Tel. číslo"
          input={formState.parts.contactPart.inputs.mobile}
          partId="contactPart"
          inputId="mobile"
          validators={[VALIDATOR_REQUIRE()]}
          error="Prosím, zadejte tel. číslo"
          inputChange={inputChange}
          touchHandler={touchHandler}
        />
        <p>
          contactPart: {formState.parts.contactPart.partIsValid && "isValid"}
        </p>
      </BFormPart>
      {/* <BFormBtn>Nakupuji na firmu</BFormBtn> */}
      <button
        className={`${formState.parts.companyPart.required ? 'bbutton' : 'bbutton-outline' } btn-small`}
        onClick={(e) => { e.preventDefault()
          setRequired(
          "companyPart",
          !formState.parts.companyPart.required
        )}}
      >
        Nakupuji na firmu
      </button>
      {formState.parts.companyPart.required && 
        <BFormPart title="Firemní údaje">
          <BInput
            title="Názec společnosti"
            input={formState.parts.companyPart.inputs.company}
            partId="companyPart"
            inputId="company"
            validators={[VALIDATOR_REQUIRE()]}
            error="Prosím, zadejte název společnosti"
            inputChange={inputChange}
            touchHandler={touchHandler}
          />
          <BInput
            title="IČO"
            input={formState.parts.companyPart.inputs.ico}
            partId="companyPart"
            inputId="ico"
            validators={[VALIDATOR_REQUIRE()]}
            error="Prosím, zadejte IČO"
            inputChange={inputChange}
            touchHandler={touchHandler}
          />
          <BInput
            title="DIČ"
            input={formState.parts.companyPart.inputs.dic}
            partId="companyPart"
            inputId="dic"
            validators={[VALIDATOR_REQUIRE()]}
            error="Prosím, zadejte DIČ"
            inputChange={inputChange}
            touchHandler={touchHandler}
          />

          <p>
            companyPart: {formState.parts.companyPart.partIsValid && "isValid"}
          </p>
        </BFormPart>
      }
      <button
        className={`${formState.parts.certificatePart.required ? 'bbutton' : 'bbutton-outline' } btn-small`}
        onClick={(e) => { e.preventDefault()
          setRequired(
          "certificatePart",
          !formState.parts.certificatePart.required
        )}}
      >
        Chci certifikát
      </button>
      {formState.parts.certificatePart.required && 
        <BFormPart title="Údaje pro certifikát">
          <BInput
            title="Ulice a číslo popisné"
            input={formState.parts.certificatePart.inputs.street_num}
            partId="certificatePart"
            inputId="street_num"
            validators={[VALIDATOR_REQUIRE()]}
            error="Prosím, zadejte ulici a č. popisné"
            inputChange={inputChange}
            touchHandler={touchHandler}
          />
          <BInput
            title="Město"
            input={formState.parts.certificatePart.inputs.city}
            partId="certificatePart"
            inputId="city"
            validators={[VALIDATOR_REQUIRE()]}
            error="Prosím, zadejte město"
            inputChange={inputChange}
            touchHandler={touchHandler}
          />
          <BInput
            title="PSČ"
            input={formState.parts.certificatePart.inputs.zipCode}
            partId="certificatePart"
            inputId="zipCode"
            validators={[VALIDATOR_REQUIRE()]}
            error="Prosím, zadejte PSČ"
            inputChange={inputChange}
            touchHandler={touchHandler}
          />
          <p>
            certificatePart: {formState.parts.certificatePart.partIsValid && "isValid"}
          </p>
        </BFormPart>
      }
      <p>formIsValid: {formState.formIsValid && "formIsValid"}</p>
      <BSubmit>Dokončit objednávku</BSubmit>

    </BForm>
  );
};

export default TestingFormPage;
