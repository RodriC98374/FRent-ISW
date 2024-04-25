import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom'; 
import { useForm } from 'react-hook-form';
import InputText from '../../components/Forms/Inputs/InputText';
import './LoginForm.css';
import logoImage from '../../assets/img/Logo frent.png';
import { validarLogin } from '../../api/register.api';
import { UserContext } from './UserProvider';

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { userData, setUserData } = useContext(UserContext); // Acceder al contexto
  const [isLoggedIn, setIsLoggedIn] = useState(false);

console.log(userData)

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    const requestData = { email, password }; 
    
    try {
      const { data: responseData } = await validarLogin(requestData);
      console.log('Respuesta del servidor:', responseData); 
      
      setUserData({
        first_name: responseData.first_name,
        last_name: responseData.last_name,
        user_id: responseData.user_id,
        user_type: responseData.user_type
      });

      setIsLoggedIn(true); 

      
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  });

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <div className="login-info">
        <img src={logoImage} alt="Logo FREnt" className="login-logo" />
        <h1>Inicia Sesión</h1>
        <Link to="/" className="login-link">Ir a FREnt</Link>
        <Link to="/form" className="register-link">¿No tienes una cuenta? ¡Regístrate!</Link>
      </div>
      <div className="login-form-container">
        <form onSubmit={onSubmit} className="login-form">
          <div className="input-group">
            <InputText
              type={"text"}
              id={"email"}
              label={"Correo electrónico"}
              placeholder={"Escribe tu correo electrónico"}
              required={true}
              register={register("email", {
                required: {
                  value: true,
                  message: "El correo es requerido"
                },
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message: "Formato de email inválido",
                }
              })}
              errors={errors}
            />
          </div>
          <div className="input-group">
            <InputText
              id={"password"}
              label={"Contraseña"}
              type={"password"}
              required={true}
              placeholder={"Ingrese su contraseña"}
              register={register("password", {
                required: {
                  value: true,
                  message: "La contraseña es requerida",
                },
                minLength: {
                  value: 8,
                  message: "Debe tener al menos 8 caracteres",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: "La contraseña debe contener al menos una letra y un número",
                },
              })}
              errors={errors}
            />
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}
