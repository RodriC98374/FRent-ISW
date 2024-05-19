import React, { useState, useEffect } from 'react';
import { get_acepted_friends } from "../../api/register.api";
import { save_comment } from "../../api/register.api";
import { getUser } from "../../pages/Login/LoginForm";
import './MisAmigos.css';

const MisAmigos = () => {
  const [amigos, setAmigos] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedAmigo, setSelectedAmigo] = useState(null);
  const [comment, setComment] = useState('');
  const dataUser = getUser();
  useEffect(() => {
    const fetchAmigos = async () => {
      try {
        const response = await get_acepted_friends(dataUser.user_id);
        setAmigos(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchAmigos();
  }, [dataUser.id_user]);

  const showForm = (amigo) => {
    setSelectedAmigo(amigo);
    setIsFormVisible(true);
  };

  const hideForm = () => {
    setIsFormVisible(false);
    setSelectedAmigo(null);
    setComment('');
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      rent_id: selectedAmigo.rent_id,
      friend_id: selectedAmigo.friend_id,
      client_id: dataUser.user_id,
      comment: comment,
    };

    try {
      await save_comment(commentData);
      hideForm();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="mis-amigos">
      <h1>Mi Historial de Amigos</h1>
      {amigos.map((amigo) => (
        <div key={amigo.friend_id} className="amigo-card">
          <div className="amigo-info">
            <div className="amigo-avatar"></div>
            <div className="amigo-details">
              <strong>{amigo.friend_full_name}</strong>
              <p>{amigo.friend_description}</p>
            </div>
          </div>
          <div className="amigo-action">
            <span>Alquiler hace {amigo.rent_done}</span>
            <button onClick={() => showForm(amigo)}>Dejar Comentario</button>
          </div>
        </div>
      ))}
      {isFormVisible && (
        <div className="comment-form-overlay">
          <div className="comment-form">
            <h2>Dejar Comentario para {selectedAmigo?.friend_full_name}</h2>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                required
                placeholder="Escribe tu comentario aquí"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
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