import React from "react";

const BSubmit = (props) => {
  return (
    <button
      type="submit"
      onClick={(e) => {e.preventDefault(); props.onClick()}}
      className={`${props.isValid ? "btn--primary" : "btn--secondary"}`}
      disabled={!props.isValid || props.isLoading}
    >
      {props.children}
    </button>
  );
};

export default BSubmit;
