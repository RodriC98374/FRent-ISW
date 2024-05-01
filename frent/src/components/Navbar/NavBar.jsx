import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  get_notifications_user,
  update_notifications_user,
  delete_notifications_user,
} from "../../api/register.api";
import "./Navbar.css";
import NotificationModal from "./notifications";
import { UserContext } from "../../pages/Login/UserProvider";
import { signOut } from "../../pages/Login/LoginForm";
import { FaUser } from "react-icons/fa";

export default function NavBar() {
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { userData} = useContext(UserContext);

  const openModal = () => {
    if (modalVisible === false) {
      loadNotifications();
      setModalVisible(true);
    } else {
      closeModal();
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  async function loadNotifications() {
    try {
      console.log("la id esss", userData.user_id)

      const res = await get_notifications_user(userData.user_id);
      setNotifications(res.data);
    } catch (error) {
      console.error("Error notifications:", error);
    }
  }

  const deleteNotifications = () => {
    if(notifications.length > 0){
      delete_notifications_user(userData.user_id);
      loadNotifications()
    }
  }

  const readNotifications = () => {
    if(notifications.length > 0){
      update_notifications_user(userData.user_id);
      loadNotifications()
    }
  }


  return (
    <>
      <nav className="navbar-body">
        <NavLink to="/">
          <img
            className="logo-img"
            src="https://i.ibb.co/hZwZSSN/Logo-frent.png"
            alt="Logo-frent"
          />
        </NavLink>
        <ul className="navbar-options-list">
          <li onClick={closeModal}>
            <NavLink className="navbar-option" to="/">
              Inicio
            </NavLink>
          </li>
          {userData && userData.user_type === 'Cliente' && (
            <li onClick={closeModal}>
              <NavLink className="navbar-option" to="listfriend">
                Amigos
              </NavLink>
            </li>
          )}
          {!userData && (
            <li onClick={closeModal}>
            <NavLink className="navbar-option" to="form">
              {" "}
              Registrarse
            </NavLink>
          </li>
          )
          }
          {userData && userData.user_type === 'Amigo' && (
            <li onClick={closeModal}>
              <NavLink className="navbar-option" to="/rentalSectio">
                Alquileres
              </NavLink>
            </li>
          )}
          {!userData && (
            <li>
              <NavLink className="navbar-option" to="/login">Iniciar Sesión</NavLink>
            </li>
          )}
          
          {userData && (
            <li>
              <div className="user-sesion-container">
                <div className="user-sesion">
                <span>{userData.first_name}</span>
              <span className="user">
                  {userData.user_type}
              </span>
                </div><FaUser className="icon-sesion"/>
              </div>
            </li>
          )}
          {userData && (
            <li>
            
              <button className="logout" onClick={signOut}>Cerrar Sesión</button>
            </li>
          )}
          {userData && userData.user_type === 'Client' &&(
            <li onClick={openModal}>
            <div className="navbar-option">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2"
                />
                <circle cx="19" cy="5" r="4" fill="red" />
              </svg>
            </div>
          </li>
          )}
        </ul>
      </nav>
      {<NotificationModal
        isVisible={modalVisible}
        notifications={notifications}
        deleteNotifications={deleteNotifications}
        readNotifications={readNotifications}
      />}
    </>
  );
}
