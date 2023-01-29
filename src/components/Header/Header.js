import react, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

import DiakonieLogoCele from "../../images/Diakonie/Diakonie_Logo_Cele.png";

import "./Header.scss";

const Header = (props) => {

  return (
    <header>
      <div className="header-content">
        <div to="/" className="header__logo-cele-wrapper">
          <img src={DiakonieLogoCele} alt="Logo Diakonie" />
        </div>
        <div className="right">
          {props.auth.token ? (
            <button onClick={props.auth.logout}>Odhlásit se</button>
          ) : (
            <Fragment>
              <NavLink to="/prihlaseni">Přihlásit se</NavLink>
              <NavLink to="/registrace">Registrace</NavLink>
              <NavLink to="/kosik">Košík</NavLink>
            </Fragment>
          )}

          {/* <span> Projekty </span>
        <span> Web školy </span>
        <span> Košík</span> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
