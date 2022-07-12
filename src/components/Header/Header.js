import react from "react";
import { Link } from 'react-router-dom'

import DiakonieLogoCele from "../../images/Diakonie/Diakonie_Logo_Cele.png";

import "./Header.scss";

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <div to="/" className="header__logo-cele-wrapper">
          <img src={DiakonieLogoCele} alt="Logo Diakonie" />
        </div>
        <div className="right">
        {/* <span> Projekty </span>
        <span> Web školy </span>
        <span> Košík</span> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
