import React from "react";

const BSubmit = (props) => {
  return (
    <button
      type="submit"
      onClick={props.onClick}
      className={`${props.isValid ? "bbutton" : "bbutton-outline"}`}
      disabled={!props.isValid}
    >
      {props.children}
    </button>
  );
};

export default BSubmit;
