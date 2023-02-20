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
    </form>
  );
};

export default TestingFormPage;
