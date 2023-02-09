import React from "react";

import './ProgressBar.scss'

const ProgressBar = () => {
  return (
    <div className="container-progress-bar">
      <div className="progress progress-moved">
        <div className="progress-bar"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
