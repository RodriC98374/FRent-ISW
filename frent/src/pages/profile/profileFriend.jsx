import React from 'react';
import './profileEdits.css'; // Archivo de estilos CSS
import profileImage from '../../assets/img/image.png';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
import { ButtonPrimary } from '../../components/Buttons/buttonPrimary';
import { ButtonSecondary } from '../../components/Buttons/buttonSecondary';
import { NavLink } from "react-router-dom";


const ProfileFriend = () => {
  // Datos de ejemplo del usuario
  const user = {
    name: 'John Doe',
    age: 30,
    gender: 'Masculino',
    location: 'New York',
    verified: true,
    description: 'Skibidi Sigma Pomni Digital Fortnite Chamba Free Gigachad Rizz Ohmygodfloo XXXTentacion Hotmail Lionel Ronaldo Junior Mewing Tercero Chiki Ibai Xocas',
    interests: ['Coding', 'Traveling', 'Reading','Bombardear naciones','Recuperar el Litoral'],
    price: '40 BOB'
  };

  return (
    <div className="user-profile">
      <div className="user-card">
        <img src={profileImage} alt="Profile" className="user-avatar" />
        <h2 className="user-name">{user.name}</h2>
        <div className="user-details">
          <p>Edad: {user.age}</p>
          <p>Género: {user.gender}</p>
          <p><IoLocationSharp className="icon" /> {user.location}</p>
          <p><RiVerifiedBadgeFill className="icon" /> Verificado</p>
        </div>
        <p className="user-price">{user.price}</p>
        <NavLink to="/">
          <ButtonSecondary label={"Alquilar"} />
        </NavLink>
      </div>
      <div className="user-description">
        <h3>Descripción personal:</h3>
        <p>{user.description}</p>
        <h3>Intereses:</h3>
        <div className="user-interests">
          {user.interests.map((interest, index) => (
            <span key={index} className="interest">
              <svg
                className="tag-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24">
                <path
                  fill="white"
                  d="M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m15.91 4.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.11 0-2 .89-2 2v7c0 .55.22 1.05.59 1.41l8.99 9c.37.36.87.59 1.42.59c.55 0 1.05-.23 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.56-.23-1.06-.59-1.42"
                />
              </svg>
              {interest}
            </span>
          ))}
        </div>
        <NavLink to="/">
              <ButtonPrimary label={"Back"} />
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileFriend;
