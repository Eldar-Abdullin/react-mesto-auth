import React from "react";
import logo from "../images/Logo.svg";
import { Link, Route } from "react-router-dom";

function Header({ onSignOut, userData }) {
  console.log(userData);
  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo" />
      <Route path="/sign-up">
        <Link className="header__link" to="sign-in">
          Войти
        </Link>
      </Route>
      <Route path="/sign-in">
        <Link className="header__link" to="sign-up">
          Регистрация
        </Link>
      </Route>
      <Route exact path="/">
        <div className="header__info">
          <p className="header__email">{userData}</p>
          <Link className="header__link header__link_exit" onClick={onSignOut} to="/sign-in">
            Выйти
          </Link>
        </div>
      </Route>
    </header>
  );
}
export default Header;
