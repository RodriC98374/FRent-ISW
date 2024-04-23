import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCalendar, FaClock ,FaSearch} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import imgApp from "../../assets/imgApp";


export const DetailsModal = ({ isOpen, closeModal, rent }) => {
  if (!isOpen || !rent) return null;

  return (
    <>
    <div className="modal-backdrop" onClick={closeModal}>

    </div>
    <div className="modalDet">
        <div className="modal-header">
        <FaSearch className="icon" />
        Detalles del alquiler

        <AiOutlineClose
        size={30}
        color="#000"
        onClick={closeModal}
        cursor={"pointer"}/>
      </div>
      <div className="containerDet">
        
          <img
            src={rent.profilePic || imgApp.image}
            alt="Foto de perfil"
            className="profile-pic"
          />
        
        <div className="request-inf">
          <h3 className="name-client">Carlos Bodoque</h3>
          <div className="detalle">
            <p className="verified-date">
              <FaCalendar className="icon" />
              18/04/2024
            </p>
            <p className="locationR">
              <FaClock className="icon" />
              15:30
            </p>
          </div>
          <div className="detalle">
            <p className="verified">
              <RiVerifiedBadgeFill className="icon" />
              Verificado
            </p>
            <p className="locationR">
              <IoLocationSharp className="icon" />
              Mi casa bb UwU
            </p>
          </div>
        </div>
      </div>
      
      <div className="cuerpo">
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
          <div class="pie">
            <p><strong>Estado de la reserva:</strong></p>
            <p class="pie.estado">
              <span>Pendiente</span>
            </p>
          </div>
          </div>
    </>
  );
};

export default DetailsModal;
