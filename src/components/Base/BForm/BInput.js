import React from 'react'

const BInput = (props) => {
  return (
    <div className="form-input--wrapper" >
          {(props.input.isValid || !props.input.isTouched) && <label className="form-input-text-label">{props.title}</label>}
          {(!props.input.isValid && props.input.isTouched) && <label className="form-input-text-error">{props.error}</label>}
          <input
          className="form-input-text"
            type={"text"}
            value={props.input.value}
            placeholder={props.placeholder || ""}
            onChange={(e) =>
              props.inputChange(props.partId, props.inputId, e.currentTarget.value, [
                ...props.validators
              ])
            }
            onBlur={() => props.touchHandler(props.partId, props.inputId)}
          />
        </div>
  )
}

export default BInput