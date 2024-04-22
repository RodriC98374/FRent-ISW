import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';
import logoImage from '../../assets/img/Logo frent.png';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  // Función para validar el correo electrónico
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formIsValid = true;
    let errors = {};

    // Validar email
    if (!email || !validateEmail(email)) {
      errors.email = 'Escribe un correo electrónico válido.';
      formIsValid = false;
    }

    // Validar contraseña
    if (!password) {
      errors.password = 'La contraseña es requerida.';
      formIsValid = false;
    }

    setErrors(errors);

    if (formIsValid) {
      console.log('Email:', email, 'Password:', password);
      // Aquí iría la lógica de inicio de sesión
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
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({...errors, email: '' });
              }}
              className={errors.email ? 'error-input' : ''}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Escribe tu contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({...errors, password: '' });
              }}
              className={errors.password ? 'error-input' : ''}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
            <Link to="/forgot-password" className="forgot-password">¿Has olvidado tu contraseña?</Link>
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;