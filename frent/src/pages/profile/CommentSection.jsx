import React, { useState } from 'react';

const CommentSection = () => {
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);

  // Datos de prueba para comentarios estáticos
  const comments = [
    'World Wrestling Entertainment es una empresa estadounidense de medios y entretenimiento, ​​ integrada principalmente por el área.',
    'BUENA PERSONA!!!',
    'Comentario adicional de prueba.',
  ];

  const handlePrevClick = () => {
    setCurrentCommentIndex((prevIndex) => (prevIndex === 0 ? comments.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentCommentIndex((prevIndex) => (prevIndex === comments.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="comment-section">
        {/* <h3>Pedro Picapiedra</h3> */}
      <div className="comment-text">
        <h4>Pedro Picapiedra:</h4><span>{comments[currentCommentIndex]}</span>
      </div>
      <div className="comment-navigation">
        <button className="comment-button" onClick={handlePrevClick}>Anterior</button>
        <button className="comment-button" onClick={handleNextClick}>Siguiente</button>
      </div>
    </div>
  );
};

export default CommentSection;