import react, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import DiakonieLogoCele from "../../images/Diakonie/Diakonie_Logo_Cele.png";
import ErrorBackdrop from "../Error/ErrorBackdrop";

import "./Header.scss";

const Header = (props) => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const closeMobileNav = () => {
    setShowMobileNav(false)
  }

  return (
    <Fragment>
      <header>
        <div className="header-content">
          <Link to="/" className="header__logo-cele-wrapper">
            <img src={DiakonieLogoCele} alt="Logo Diakonie" />
          </Link>
          <div className="right">
            <button
              className="btn--secondary nav-menu-btn"
              onClick={() => setShowMobileNav((prev) => !prev)}
            >
              MENU
            </button>
            <div className="nav-desktop-buttons">
              {props.auth.token ? (
                <Fragment>
                  <NavLink
                    className="btn--secondary"
                    to="/moje-objednavky"
                  >
                    Moje objednávky
                  </NavLink>
                  <NavLink className="btn--secondary" to="/kosik">
                    Košík
                  </NavLink>
                  <button
                    className="btn--secondary"
                    onClick={props.auth.logout}
                  >
                    Odhlásit se
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <NavLink
                    className="btn--secondary"
                    to="/prihlaseni"
                  >
                    Přihlásit se
                  </NavLink>
                  <NavLink className="btn--secondary" to="/kosik">
                    Košík
                  </NavLink>
                </Fragment>
              )}
            </div>
            {/* <span> Projekty </span>
        <span> Web školy </span>
        <span> Košík</span> */}
          </div>
        </div>
      </header>
      {showMobileNav && (
        <Fragment>
          <div className="mobile-nav--wrapper">
          {props.auth.token ? (
                <Fragment>
                  <NavLink
                    className="btn--secondary"
                    to="/moje-objednavky"
                    onClick={closeMobileNav}
                  >
                    Moje objednávky
                  </NavLink>
                  <NavLink className="btn--secondary" to="/kosik"
                  onClick={closeMobileNav}>
                    Košík
                  </NavLink>
                  <button
                    className="btn--secondary"
                    onClick={() => {
                      props.auth.logout()
                      closeMobileNav()
                    }}
                  >
                    Odhlásit se
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <NavLink
                    className="btn--secondary"
                    to="/prihlaseni"
                    onClick={closeMobileNav}
                  >
                    Přihlásit se
                  </NavLink>
                  <NavLink className="btn--secondary" to="/kosik"
                  onClick={closeMobileNav}>
                    Košík
                  </NavLink>
                </Fragment>
              )}
          </div>
          <ErrorBackdrop onClick={() => setShowMobileNav(false)} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Header;
