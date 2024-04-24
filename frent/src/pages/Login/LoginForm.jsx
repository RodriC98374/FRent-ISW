import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { InputText } from '../../components/Forms/Inputs/inputText';
import './LoginForm.css';
import logoImage from '../../assets/img/Logo frent.png';
import { validarLogin } from '../../api/register.api';

export default function LoginForm() {  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const friend = {
      email: data.Email,
      password: data.Password,
    };

    try {
      const resFriend = await validarLogin(friend);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  });

  baseUrl = 

  iniciarSesion = async () => {
    await axios.get()
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
        <form onSubmit={onSubmit}  className="login-form">
          <div className="input-group">
            <InputText
              type= {"text"}
              id={"Email"}
              label={"Correo electrónico"}
              placeholder= {"Escribe tu correo electrónico"}
              required={true}
              register={register("Email", {
                required: {
                  value: true,
                  message: "El correo es requerido"
                },
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message: "Formato de email invalido",
                }
              })}
              errors={errors}
            />
          </div>
          <div className="input-group">
          <InputText
                id={"Password"}
                label={"Contraseña"}
                type={"password"}
                required={true}
                placeholder={"Ingrese su contraseña"}
                register={register("Password", {
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
