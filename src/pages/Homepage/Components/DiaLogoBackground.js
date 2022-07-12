import React from "react";

import DiaLogoBG from "../../../images/Diakonie/Diakonie_Logo_znak.png";

import './DiaLogoBackground.scss'

const DiaLogoBackground = () => {
  return (
    <div className="background">
      <div className="dia-logo-bg-up-wrapper">
        <img src={DiaLogoBG} />
      </div>
    </div>
  );
};

export default DiaLogoBackground;
