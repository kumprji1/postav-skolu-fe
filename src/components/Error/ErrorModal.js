import React from "react";
import ReactDOM from "react-dom";

import ErrorBackdrop from "./ErrorBackdrop.js";
import "./ErrorModal.css";

const ErrorModal = (props) => {
  const content = (
    <React.Fragment>
      <ErrorBackdrop onClick={props.onClear} />
        <div className={`error-modal`}>
          <header className={`error-modal__header`}>
            <h2>Švihnout a mávnout!</h2>
          </header>
          <div className={`error-modal__content ${props.contentClass}`}>
            {props.error}
          </div>
          <button className="error-modal__button-ok" onClick={props.onClear}>
            Zavřít
          </button>
          <footer className={`error-modal__footer ${props.footerClass}`}>
            {props.footer}
          </footer>
        </div>
    </React.Fragment>
  );
  return ReactDOM.createPortal(content, document.getElementById("error-modal"));
};

export default ErrorModal;
