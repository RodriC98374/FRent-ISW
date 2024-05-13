import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./profileEdits.css";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
import { ButtonPrimary } from "../../components/Buttons/buttonPrimary";
import { ButtonSecondary } from "../../components/Buttons/buttonSecondary";
import { getFriendID, getLikes } from "../../api/register.api";
import { calculateAge } from "../listFriend/ListFriends";

const ProfileFriend = () => {
  const { id } = useParams();
  const friendId = parseInt(id);
  const [friend, setFriend] = useState(null); // Utiliza un único amigo en lugar de una lista de amigos
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const loadFriend = async () => {
      try {
        const res = await getFriendID(friendId);
        console.log("res", res.data); // Verifica la estructura de los datos recibidos
        setFriend(res.data); // Establece el amigo individual obtenido
        const resLikes = await getLikes();
        setLikes(resLikes.data);
      } catch (error) {
        console.error("Error al cargar la información del amigo:", error);
      }
    };
    loadFriend();
  }, [friendId]);

  const staticImage =
    "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";

  const getImage = (imageFriend) => {
    if (imageFriend) {
      return `data:image/png;base64,${imageFriend}`;
    }
    return staticImage;
  };

  return (
    <div className="user-profile">
    <div className="user-card">
      {friend ? (
        <div >
          <img
            src={getImage(friend.image)}
            alt="Profile"
            className="user-avatar"
          />
          <h2 className="user-name">{friend.first_name}</h2>
          <div className="user-details">
            <p>Edad: {calculateAge(friend.birth_date)}</p>
            <p>Género: {friend.gender}</p>
            <p>
              <IoLocationSharp className="icon" /> {friend.country}
            </p>
            <p>
              <RiVerifiedBadgeFill className="icon" /> Verificado
            </p>
          </div>
          <p className="user-price">{friend.price}</p>
          <NavLink to={`/rentaForm/${friendId}`}>
            <ButtonSecondary label={"Alquilar"} />
          </NavLink>
          <div className="user-description">
            <h3>Descripción personal:</h3>
            <p>{friend.personal_description}</p>
            <h3>Intereses:</h3>
            <div className="user-interests">
              {friend && friend.interests ? (
                friend.interests.map((interest, index) => (
                  <span key={index} className="interest">
                    <svg
                      className="tag-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="white"
                        d="M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m15.91 4.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.11 0-2 .89-2 2v7c0 .55.22 1.05.59 1.41l8.99 9c.37.36.87.59 1.42.59c.55 0 1.05-.23 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.56-.23-1.06-.59-1.42"
                      />
                    </svg>
                    {interest}
                  </span>
                ))
              ) : (
                <p>No interests found.</p>
              )}
            </div>

            <NavLink to="/listFriend">
              <ButtonPrimary label={"Back"} />
            </NavLink>
          </div>
        </div>
      ) : (
        <p>Cargando amigo...</p>
      )}
      </div>
    </div>
  );
};

export default ProfileFriend;
