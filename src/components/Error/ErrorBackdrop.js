import React from 'react';
import ReactDOM from 'react-dom';

const ErrorBackdrop = props => {
  return ReactDOM.createPortal(
    <div className="error-backdrop2" onClick={props.onClick}></div>,
    document.getElementById('error-backdrop')
  );
};

export default ErrorBackdrop;
