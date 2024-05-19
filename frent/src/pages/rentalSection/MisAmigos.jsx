import React, { useState } from 'react';
import './MisAmigos.css';

const amigos = [
  {
    nombre: 'Esteban Dido',
    descripcion: 'Esta es mi descripcion',
    alquiler: 'Alquiler hace 5 min'
  },
  {
    nombre: 'Jon Leclere',
    descripcion: 'Esta es mi descripcion',
    alquiler: 'Alquiler hace 1 mes'
  },
  {
    nombre: 'Jon Leclere',
    descripcion: 'Esta es mi descripcion',
    alquiler: 'Alquiler hace 1 mes'
  }
];

const MisAmigos = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedAmigo, setSelectedAmigo] = useState(null);

  const showForm = (amigo) => {
    setSelectedAmigo(amigo);
    setIsFormVisible(true);
  };

  const hideForm = () => {
    setIsFormVisible(false);
    setSelectedAmigo(null);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el comentario enviado
    hideForm();
  };

  return (
    <div className="mis-amigos">
      <h1>Mis Amigos</h1>
      {amigos.map((amigo, index) => (
        <div key={index} className="amigo-card">
          <div className="amigo-info">
            <div className="amigo-avatar"></div>
            <div className="amigo-details">
              <strong>{amigo.nombre}</strong>
              <p>{amigo.descripcion}</p>
            </div>
          </div>
          <div className="amigo-action">
            <span>{amigo.alquiler}</span>
            <button onClick={() => showForm(amigo)}>Dejar Comentario</button>
          </div>
        </div>
      ))}
      {isFormVisible && (
        <div className="comment-form-overlay">
          <div className="comment-form">
            <h2>Dejar Comentario para {selectedAmigo?.nombre}</h2>
            <form onSubmit={handleCommentSubmit}>
              <textarea required placeholder="Escribe tu comentario aquí"></textarea>
              <div className="form-buttons">
                <button type="submit">Enviar</button>
                <button type="button" onClick={hideForm}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MisAmigos;