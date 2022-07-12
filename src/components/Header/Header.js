import react from "react";

import DiakonieLogoCele from "../../images/Diakonie/Diakonie_Logo_Cele.png";
import DiakonieLogoZnak from "../../images/Diakonie/Diakonie_Logo_znak.png";

import "./Header.scss";

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <div className="header__logo-cele-wrapper">
          <img src={DiakonieLogoCele} alt="Logo Diakonie" />
        </div>
        <div className="right">
        <span> Projekty </span>
        <span> Web školy </span>
        <span> Košík</span>
        </div>
        {/* <div className="header__logo-znak-wrapper">
          <img src={DiakonieLogoZnak} alt="Logo Diakonie" />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
