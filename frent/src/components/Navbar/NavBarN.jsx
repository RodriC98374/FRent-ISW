import React from "react";
import { Link } from "react-router-dom";
import "./NavbarU.css";
import imgApp from "../../assets/imgApp";

export default function NavBarN() {
  return (
    <>
      <nav className="sidebar">
        <header>
          <div className="image-text">
            <span className="image">
              <img
                src={imgApp.perfil}
                alt="logo"
              />
            </span>

            <div className="text header-text">
              <span className="name"> Codigo</span>
              <span className="profession">Rent Frient</span>
            </div>
          </div>
          <i className="bx bx-chevron-right toogle"></i>
        </header>
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
                <Link to="home">
                  <i className="bx bx-home-alt icon"></i>
                  <span className="text nav-text">Inicio</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="listfriend">
                  <i className="bx bx-bar-chart-alt-2 icon"></i>
                  <span className="text nav-text">Lista de amigos</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="form">
                  <i className="bx bx-bell icon"></i>
                  <span className="text nav-text">Notificaciones</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="#">
                  <i className="bx bx-pie-chart-alt icon"></i>
                  <span className="text nav-text">Analytics</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="#">
                  <i className="bx bx-heart icon"></i>
                  <span className="text nav-text">Likes</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="#">
                  <i className="bx bx-wallet icon"></i>
                  <span className="text nav-text">Wallets</span>
                </Link>
              </li>
            </ul>
          </div>
          
        </div>
      </nav>
    </>
  );
}
