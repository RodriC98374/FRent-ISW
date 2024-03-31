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

  // console.log(friends)

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
          <p>Edad: {friend.birth_date} años</p>
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