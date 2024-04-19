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
    <div className="modal">
        <div className="modal-header">
        <FaSearch className="icon" />
        Detalles del alquiler

        <AiOutlineClose
        size={30}
        color="#000"
        onClick={closeModal}
        cursor={"pointer"}/>
      </div>
      <div className="container">
        <div className="user-info">
          <img
            src={rent.profilePic || imgApp.image}
            alt="Foto de perfil"
            className="profile-pic"
          />
          <p className="time">Hace 10 min</p>
        </div>
        <div className="request-info">
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
              Mi casa bv
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;