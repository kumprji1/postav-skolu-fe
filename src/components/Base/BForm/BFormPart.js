import React from "react";

const BFormPart = (props) => {
  return (
    <div className={`form-inputs--wrapper ${props.classNames ? `${props.classNames}` : ''}`}>
      <label className="form-title">{props.title}</label>
      {props.children}
    </div>
  );
};

export default BFormPart;
