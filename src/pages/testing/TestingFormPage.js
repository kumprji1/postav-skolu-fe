import React from "react";
import { useGortozForm } from "../../hooks/g-form-hook";
import { VALIDATOR_MIN, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../utils/validators";

const TestingFormPage = () => {
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
        },
      },
      addressPart: {
        required: true,
        partIsValid: false,
        inputs: {
          city: {
            value: "",
            isTouched: false,
            isValid: false,
          },
          zipCode: {
            value: "",
            isTouched: false,
            isValid: false,
          },
        },
      },
    },
    formIsValid: false,
  };
  const { formState, inputChange, touchHandler } = useGortozForm(initFormData);

  return (
    <form>
      <div>
        <label>Jméno</label>
        <input
          type={"text"}
          value={formState.parts.contactPart.inputs.name.value}
          placeholder="name"
          onChange={(e) =>
            inputChange("contactPart", "name", e.currentTarget.value, [VALIDATOR_REQUIRE()])
          }
          onBlur={() => touchHandler("contactPart", "name")}
        />
        {formState.parts.contactPart.inputs.name.isValid && <p>isValid</p>}
      </div>
      <div>
        <label>Příjmení</label>
        <input
          type={"text"}
          value={formState.parts.contactPart.inputs.surname.value}
          placeholder="surname"
          onChange={(e) =>
            inputChange("contactPart", "surname", e.currentTarget.value, [VALIDATOR_MINLENGTH(5)])
          }
          onBlur={() => touchHandler("contactPart", "surname")}
        />
        {formState.parts.contactPart.inputs.surname.isValid && <p>isValid</p>}
      </div>
      <p>contactPart: {formState.parts.contactPart.partIsValid && 'isValid'}</p>
      <div>
        <label>Město</label>
        <input
          type={"text"}
          value={formState.parts.addressPart.inputs.city.value}
          placeholder="city"
          onChange={(e) =>
            inputChange("addressPart", "city", e.currentTarget.value, [VALIDATOR_REQUIRE()])
          }
          onBlur={() => touchHandler("addressPart", "city")}
        />
        {formState.parts.addressPart.inputs.city.isValid && <p>isValid</p>}
      </div>
      <div>
        <label>PSČ</label>
        <input
          type={"text"}
          value={formState.parts.addressPart.inputs.zipCode.value}
          placeholder="PSČ"
          onChange={(e) =>
            inputChange("addressPart", "zipCode", e.currentTarget.value, [VALIDATOR_REQUIRE()])
          }
          onBlur={() => touchHandler("addressPart", "zipCode")}
        />
        {formState.parts.addressPart.inputs.zipCode.isValid && <p>isValid</p>}
      </div>
      <p>addressPart: {formState.parts.addressPart.partIsValid && 'isValid'}</p>
        <p>formIsValid: {formState.formIsValid && 'formIsValid'}</p>
    </form>
  );
};

export default TestingFormPage;
