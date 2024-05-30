import React from "react";
import "./Footer.css";
import { MdMobileFriendly } from "react-icons/md";
import { GiThreeFriends } from "react-icons/gi";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { SlCallEnd } from "react-icons/sl";

export default function Footer() {
  return (
    <div>
      <footer className="pie-pagina">
        <div className="grupo-1">
          <div className="box">
            <figure>
              <a href="/">
                <img
                  src="https://i.ibb.co/hZwZSSN/Logo-frent.png"
                  alt="Logo de SLee Dw"
                />
              </a>
            </figure>
          </div>
          <div className="box">
            <h2>SOBRE FRENT</h2>
            <p>
              ¿Alguna vez has deseado tener a alguien con quien compartir un
              café, asistir a un evento o simplemente disfrutar de una
              conversación agradable? ¡Estás en el lugar correcto!
            </p>
          </div>
          <div className="box">
            <h2>En frent te ofrecemos los siguientes servicios:</h2>
            <div className="red-social">
              <a href="/" className="fa fa-facebook">
                <MdMobileFriendly className="icon-footer" />
              </a>
              <a href="/" className="fa fa-instagram">
                <GiThreeFriends className="icon-footer" />
              </a>
              <a href="/" className="fa fa-twitter">
                <MdOutlineMarkUnreadChatAlt className="icon-footer" />
              </a>
              <a href="/" className="fa fa-youtube">
                <SlCallEnd className="icon-footer" />
              </a>
            </div>
          </div>
        </div>
        <div className="grupo-2">
          <small>
            &copy; 2024 <b>Punto y Coma && QAquest</b> - Todos los Derechos
            Reservados son de ellos.
          </small>
          <div className="cta">
            <a href="/form" className="btn-registro">
              ¡Regístrate ahora!
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
