import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';
import logoImage from '../../assets/img/Logo frent.png';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let formIsValid = true;

    if (!email || !validateEmail(email)) {
      setEmailError('Escribe un correo electrónico válido.');
      formIsValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('La contraseña es requerida.');
      formIsValid = false;
    } else {
      setPasswordError('');
    }

    if (formIsValid) {
      console.log('Email:', email, 'Password:', password);
      // Lógica de inicio de sesión aquí
    }
  };

  return (
    <div className="login-container">
      <div className="login-info">
        <img src={logoImage} alt="Logo FREnt" className="login-logo" />
        <h1>Inicia Sesión</h1>
        <Link to="/" className="login-link">Ir a FREnt</Link>
        <Link to="/form" className="register-link">¿No tienes una cuenta? ¡Regístrate!</Link>
      </div>
      <div className="login-form-container">
        <form onSubmit={handleSubmit} noValidate className="login-form">
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Escribe tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emailError ? 'error-input' : ''}
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Escribe tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={passwordError ? 'error-input' : ''}
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
            <Link to="/forgot-password" className="forgot-password">¿Has olvidado tu contraseña?</Link>
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}
