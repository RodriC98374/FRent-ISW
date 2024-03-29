import React from 'react';
  import { useParams } from 'react-router-dom';
  import imgApp from '../../assets/imgApp';
  import { amigos } from './amigos';
  
  const Perfil = () => {
    const { id } = useParams();
    const amigo = amigos.find(amigo => amigo.id === parseInt(id));
  
    if (!amigo) {
      return <div>Amigo no encontrado</div>;
    }
    return (
      <div className="perfil">
        <h1>{amigo.nombre}</h1>
        <img src={amigo.foto || imgApp} alt={amigo.nombre} />
        <p>Edad: {amigo.edad} años</p>
        <h2>Descripción</h2>
        <p>{amigo.descripcion}</p>
      </div>
    );
  };
  
  export default Perfil;
  
