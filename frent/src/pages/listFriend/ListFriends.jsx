import React, { useState, useEffect } from "react";
import "./ListFriend.css";
import { NavLink } from "react-router-dom";

import { getFriends } from "../../api/register.api";

export default function ListFriend() {
  const [friends, setFriends] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const staticImage =
    "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const res = await getFriends();
        setFriends(res.data);
      } catch (error) {
        console.error("Error al cargar la lista de amigos:", error);
      }
    };
    loadFriends();
  }, []);

  const calculateAge = (birthDate) => {
    const currentDate = new Date();
    const dob = new Date(birthDate);
    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }
    return age;
  };

  const formatDescription = (description) => {
    let newDescription = "";

    for (let i = 0; i < description.length; i++) {
      if (i !== 30 && i !== 57) {
        newDescription += description.charAt(i);
      } else if (i >= 57) {
        newDescription += "...";
        break;
      } else {
        newDescription += " " + description.charAt(i);
      }
    }
    return newDescription;
  };

  const getImage = (imageFriend) => {
    if(imageFriend){
      return `data:image/png;base64,${imageFriend}`;
    }
    return staticImage;
  }


  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="list-friend">
      <h1>Lista de amigos</h1>
      <div className='lista'>
        {friends.map((friend) => (
          <div key={friend.id_user} className="card">
            <div className="top-card"></div>
            <img
              src={`data:image/png;base64,${friend.image}`}
              alt="foto de perfil"
              onClick={() => openModal(getImage(friend.image))}
            />
            <div className="card-texts">
              <p className="name-card">
                {friend.first_name} {friend.last_name}
              </p>
              <p className="age-card">
                Edad: {calculateAge(friend.birth_date)} años
              </p>
              <p className="subtitle-card">Descripción</p>
              <p className="text-card">
                {formatDescription(friend.personal_description)}
              </p>
              <p>{friend.price} bs.</p>
            </div>
            <NavLink
              className="button-card"
              to={`/rentaForm/${friend.id_user}`}
            >
              Alquilar
            </NavLink>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="modalF">
          <div className="modal-content">
            <button className="close" onClick={closeModal}>
              Cerrar
            </button>
            <img
              src={selectedImage}
              alt="imagen en tamaño grande"
              height="500px"
              width="500px"
            />
          </div>
        </div>
      )}
      {selectedImage && <div className="modal-background"></div>}
    </div>
  );
}