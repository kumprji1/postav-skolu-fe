import React from 'react';
import ReactDOM from 'react-dom';

const ErrorBackdrop = props => {
  return ReactDOM.createPortal(
    <div className="error-backdrop" onClick={props.onClick}>d</div>,
    document.getElementById('error-backdrop')
  );
};

export default ErrorBackdrop;
