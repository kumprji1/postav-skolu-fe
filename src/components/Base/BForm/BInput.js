import React from 'react'

const BInput = (props) => {
  const type = props.secret ? 'password' : 'text'
  return (
    <div className={`form-input--wrapper ${props.classNames}`} >
          {(props.input.isValid || !props.input.isTouched) && <label className="form-input-text-label">{props.title}</label>}
          {(!props.input.isValid && props.input.isTouched) && <label className="form-input-text-error">{props.error}</label>}
          <input
          className="form-input-text"
            type={type}
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