import React from "react";

import './ProgressBar.scss'

const ProgressBar = (props) => {
  const width = props.earnedMoney / props.demandedMoney * 100
  return (
    <div className="container-progress-bar">
      <div className="progress progress-moved">
        <div style={{width: `${width}%`}} className="progress-bar"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
