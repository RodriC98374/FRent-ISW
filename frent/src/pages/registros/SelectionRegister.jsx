import React from 'react';
import { NavLink } from 'react-router-dom';
import './SelectionRegister.css';

export default function SelectionRegister() {
  return (
    <div className="selection-register-container">
      <h1>Cumpitas</h1>
      <div><p>EXPLORA UNA GALAXIA EXTENSA, ENCUETRA UNA ESTRELLA PARA TI Y OFRECE TU BRILLO</p></div>
      <div className='register'>
        <NavLink className='botonRegister' to="/cliente">Soy un cliente</NavLink>
        <NavLink className='botonRegister' to="/friend">Soy un amigo</NavLink>
      </div>
      <div>¿No tienes una cuenta? ¡Unete!</div>
    </div>
  );
}
