import React from 'react';
import './ListFriend.css';
import { NavLink } from 'react-router-dom';

import { amigos } from './amigos';

export default function ListFriend() {
 

  return (
    <div className='list-friend'>
      <div>
      <h1>Lista de amigos</h1>
      </div>
      <div className='lista'>
      {amigos.map(amigo => (
        <div key={amigo.id} className="card">
          <img className='perfil' src={amigo.foto} alt=""></img>
          <h1>{amigo.nombre}</h1>
          <p>Edad: {amigo.edad} años</p>
          <h2>Descripción</h2>
          <p>{amigo.descripcion}</p>
          <NavLink className= "btnC" to={`/listFriend/${amigo.id}`}>Alquilar</NavLink>
        </div>
      ))}
      </div>
    </div>
  );
}
