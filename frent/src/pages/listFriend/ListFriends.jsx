import React, { useState, useEffect } from 'react';
import './ListFriend.css';
import { NavLink } from 'react-router-dom';
import imgApp from '../../assets/imgApp';

import { getFriends } from '../../api/register.api';

export default function ListFriend() {
 

  const [friends, setFriends] = useState([]);

  useEffect(() => {
        async function loadFriends(){
        const res = await getFriends();
        setFriends(res.data)
      }
      loadFriends();
  }, []);

  const calculateAge = (birthDate) => {
    const currentDate = new Date();
    const dob = new Date(birthDate);
    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  return (

    <div className='list-friend'>
      <div>
      <h1>Lista de amigos</h1>
      </div>
      <div className='lista'>
      {friends.map(friend => (
        <div key={friend.id_user} className="card">
          <img src={imgApp.image}></img>
          <h1>{friend.first_name}</h1>
          <p>Edad: {calculateAge(friend.birth_date)} años</p>
          <h2>Descripción</h2>
          <p>{friend.personal_description}</p>
          <NavLink className="btnC" to = '/rentaForm'> Alquilar</NavLink>
          {/* <NavLink className="btnC" to={`/listFriend/${friend._user}`}>Alquilar</NavLink> */}
        </div>
      ))}
      </div>
    </div>
  );
}