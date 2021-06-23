import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    handleLogin(email, password);
  };
  return (
    <div className="register">
      <p className="register__welcome">Вход</p>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          className="register__input"
          placeholder="Email"
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />

        <input
          className="register__input"
          placeholder="Пароль"
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <div className="register__button-container">
          <button type="submit" className="register__button">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
