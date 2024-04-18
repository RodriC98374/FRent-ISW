import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./Details.css";
import { FaUserFriends, FaCalendar, FaClock } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import imgApp from "../../assets/imgApp";

export const DetailsModal = ({ isOpen, closeModal, rent }) => {
    if (!isOpen || !rent) return null;

    return (
        <div className="modal">
            <AiOutlineClose
                size={30}
                color="#000"
                onClick={closeModal}
                cursor={"pointer"}
            />
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
                    <div className="details">
                        <p className="verified-date">
                            <FaCalendar className="icon" />
                            18/04/2024
                        </p>
                        <p className="locationR">
                            <FaClock className="icon" />
                            15:30
                        </p>
                    </div>
                    <div className="details">
                        <p className="verified">
                            <RiVerifiedBadgeFill className="icon" />
                            Verificado
                        </p>
                        <p className="locationR">
                            <IoLocationSharp className="icon" />
                            Mi casa bv
                        </p>
                    </div>
                    <div className="price-description">
                        <p className="price">45 Bs</p>
                        <div className="description">
                            <p >Veamonos miamor</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsModal;
