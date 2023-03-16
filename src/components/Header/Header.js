import react, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

import DiakonieLogoCele from "../../images/Diakonie/Diakonie_Logo_Cele.png";

import "./Header.scss";

const Header = (props) => {
  return (
    <header>
      <div className="header-content">
        <Link to="/" className="header__logo-cele-wrapper">
          <img src={DiakonieLogoCele} alt="Logo Diakonie" />
        </Link>
        <div className="right">
          {props.auth.token ? (
            <Fragment>
              <NavLink className="btn--secondary btn-small" to="/moje-objednavky">
                Moje objednávky
              </NavLink>
              <NavLink className="btn--secondary btn-small" to="/kosik">
                Košík
              </NavLink>
              <button
                className="btn--secondary btn-small"
                onClick={props.auth.logout}
              >
                Odhlásit se
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <NavLink className="btn--secondary btn-small" to="/prihlaseni">
                Přihlásit se
              </NavLink>
              <NavLink className="btn--secondary btn-small" to="/kosik">
                Košík
              </NavLink>
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
