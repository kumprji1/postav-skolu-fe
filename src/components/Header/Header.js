import react from "react";

import DiakonieLogoCele from "../../images/Diakonie/Diakonie_Logo_Cele.png";
import DiakonieLogoZnak from "../../images/Diakonie/Diakonie_Logo_znak.png";

import "./Header.scss";

const Header = () => {
  return (
    <header>
      <div className="header__logo-cele-wrapper">
        <img src={DiakonieLogoCele} alt="Logo Diakonie" />
      </div>
      <div className="header__logo-znak-wrapper">
        <img src={DiakonieLogoZnak} alt="Logo Diakonie" />
      </div>
    </header>
  );
};

export default Header;
