import React, { useState }  from 'react';
import { Link } from 'react-router-dom';


const Register = ({ handleRegister }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const {name, value} = e.target;

    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
      const {email, password} = data;
      handleRegister( email, password );
  }
  return(
    <div className="register">
      <p className="register__welcome">
        Регистрация
      </p>
      <form onSubmit={handleSubmit} className="register__form">
        <input className="register__input" id="email" name="email" type="email" value={data.email} onChange={handleChange} placeholder='Email'/>
        <input className="register__input" id="password" name="password" type="password" value={data.password} onChange={handleChange} placeholder='Пароль'/>
          <button type="submit" className="register__button">Зарегистрироваться</button>
      </form>
        <Link to="/sign-in" className="register__login-link">Уже зарегистрированы? Войти</Link>
    </div>
  );
}

export default Register;