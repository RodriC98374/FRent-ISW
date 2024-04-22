import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCalendar, FaClock ,FaSearch} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import imgApp from "../../assets/imgApp";
import "./Details.css";

export const DetailsModal = ({ isOpen, closeModal, rent }) => {
  if (!isOpen || !rent) return null;

  return (
    <div className="modal1">
        <div className="modal-header1">
        <FaSearch className="icon1" />
        Detalles del alquiler

        <AiOutlineClose
        size={30}
        color="#000"
        onClick={closeModal}
        cursor={"pointer"}/>
      </div>
      <div className="container1">
        <div className="user-info1">
          <img
            src={rent.profilePic || imgApp.image}
            alt="Foto de perfil"
            className="profile-pic1"
          />
          <p className="time1">Hace 10 min</p>
        </div>
        <div className="request-info1">
          <h3 className="name-client1">Carlos Bodoque</h3>
          <div className="detalle1">
            <p className="verified-date1">
              <FaCalendar className="icon1" />
              18/04/2024
            </p>
            <p className="locationR1">
              <FaClock className="icon1" />
              15:30
            </p>
          </div>
          <div className="detalle1">
            <p className="verified1">
              <RiVerifiedBadgeFill className="icon" />
              Verificado
            </p>
            <p className="locationR1">
              <IoLocationSharp className="icon" />
              Mi casa bb UwU
            </p>
          </div>
        </div>
        
      </div>
      <div className="cuerpo1">
            <p><strong>Duración:</strong> </p>
            <p>1 hora</p>
            <p><strong>Precio:</strong></p>
            <p>40 BOB x 1 hora &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; 
            &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;  40 BOB</p>
            <p><strong>Lugar:</strong></p>
            <p>Jose Aguirre Acha</p>
            <p><strong>Tipo de evento:</strong></p>
            <p>Boda</p>
            <p><strong>Vestimenta del evento:</strong> </p>
            <p>Elegante</p>
            <p><strong>Descripción:</strong> </p>
            <p>Es que te vi y dije, ig de la minita soy un lobo solitario auuuu</p>
            <p><strong>Intereses:</strong> &lt;null&gt;</p>
          </div>
          <div class="pie1">
            <p><strong>Estado de la reserva:</strong></p>
            <p class="pie.estado1">
              <span>Pendiente</span>
            </p>
          </div>
    </div>
  );
};

export default DetailsModal;