import React from 'react'
import BForm from '../../../components/Base/BForm/BForm'
import BFormPart from '../../../components/Base/BForm/BFormPart'
import BInput from '../../../components/Base/BForm/BInput'
import BSubmit from '../../../components/Base/BForm/BSubmit'
import { useGortozForm } from '../../../hooks/g-form-hook'
import { VALIDATOR_REQUIRE } from '../../../utils/validators'

const CreateProjectForm = () => {
    const initFormData = {
        parts: {
            basePart: {
                required: true,
                partIsValid: false,
                inputs: {
                    title: {
                        value: '',
                        isValid: false,
                        isTouched: false
                    },
                    desc: {
                        value: '',
                        isValid: false,
                        isTouched: false
                    },
                    urlTitle: {
                        value: '',
                        isValid: false,
                        isTouched: false
                    },
                    photo: {
                        value: '',
                        isValid: false,
                        isTouched: false
                    }
                }
            }
        },
        formIsValid: false
    }

    const { formState, inputChange, touchHandler } = useGortozForm(initFormData)
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
        <BInput
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
        <BSubmit isValid={formState.formIsValid}>Vytvořit projekt</BSubmit>
    </BForm>
  )
}

export default CreateProjectForm