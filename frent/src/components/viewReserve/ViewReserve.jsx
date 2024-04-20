import React, { useEffect, useState } from "react";
import { FaUserFriends, FaCalendar, FaClock } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import imgApp from "../../assets/imgApp";
import "./ViewReserve.css";
import { getClient, getRent, getPrice, get_likes_user, deleteRent, getRegister, getClientID } from "../../api/register.api";

export default function ViewReserve() {
    const [listRent, setListRent] = useState([]);
    const [listClient, setListClient] = useState([]);
    const [price, setPrice] = useState([]);
    const [likes_user, setLikesUser] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (listRent.length > 0) {
            const fetchDataForLikes = async () => {
                try {
                    const likesPromises = listRent.map(async rent => {
                        const idClient = {
                            id_user: rent.client
                        }
                        const resLikesUser = await get_likes_user(idClient);
                        return resLikesUser.data || [];
                    });
                    const likesData = await Promise.all(likesPromises);
                    setLikesUser(likesData.flat());
                } catch (error) {
                    console.error("Error fetching likes data:", error);
                }
            };
            fetchDataForLikes();
        }
    }, [listRent]);

    const fetchData = async () => {
        try {
            const resRent = await getRent();
            if (resRent && resRent.data) {
                const sortedRent = resRent.data.sort((a, b) => {
                    const dateA = new Date(a.create);
                    const dateB = new Date(b.create);
                    return dateB - dateA;
                });
                setListRent(sortedRent);
            }

            const resClient = await getClient();
            if (resClient && resClient.data) {
                setListClient(resClient.data);
            }

            const resPrice = await getPrice();
            if (resPrice && resPrice.data) {
                const pricesArray = resPrice.data.map(item => item.total_price);
                setPrice(pricesArray);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getClientName = (clientId) => {
        const client = listClient.find((clientName) => clientName.id_user === clientId);
        if (client) {
            return `${client.first_name} ${client.last_name}`;
        }
        return "Cliente Desconocido";
    };

    const getClientLikes = (clientId) => {
        const clientLikes = likes_user.find((like) => like.id_user === clientId);
        if (clientLikes) {
            return clientLikes.gustos;
        }
        return [];
    };



    const calculateTimePassed = (createdAt) => {
        const currentTime = new Date();
        const createdAtDate = new Date(createdAt);
        const difference = currentTime.getTime() - createdAtDate.getTime();
        const secondsPassed = Math.floor(difference / 1000);
        if (secondsPassed < 60) {
            return `${secondsPassed} seg`;
        } else if (secondsPassed < 3600) {
            return `${Math.floor(secondsPassed / 60)} min`;
        } else if (secondsPassed < 86400) {
            return `${Math.floor(secondsPassed / 3600)} horas`;
        } else {
            return `${Math.floor(secondsPassed / 86400)} días`;
        }
    };

    const handleAccept = async (rentId) => {
        fetchClientEmail();

        try {
            const accepted = window.confirm("¿Aceptas ser el amigo?");
            if (accepted) {

                await deleteRent(rentId);
                fetchData();
            }
        } catch (error) {
            console.error("Error al aceptar el alquiler:", error);
            console.log("los datos no aceptado:", rentId);
        }

    };

    const handleReject = async (rentId) => {
        try {
            const rejected = window.confirm("¿Estás seguro de que deseas rechazar ser amigo?");
            if (rejected) {
                await deleteRent(rentId);
                fetchData();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchClientEmail = async () => {
        const clientId = 8; // ID del cliente que deseas obtener
        try {
            const response = await getClientID(clientId);
            const clientData = response.data;
            const clientEmail = clientData.email;
            console.log("Correo electrónico del cliente:", clientEmail);
        } catch (error) {
            console.error('Error al obtener el correo electrónico del cliente:', error);
        }
    };


    return (
        <>
            <div className="contV">
                <div>
                    <h1 className="title">
                        <FaUserFriends className="icon" />
                        Alquileres Pendientes
                    </h1>
                </div>
                <div id="pendings">

                    {listRent.length === 0 ? (
                        <div className="placeholder-container">
                            <p className="placeholder-text">
                                No existen solicitudes de alquileres pendientes
                            </p>
                        </div>

                    ) : (
                        listRent.map((rent, index) => (
                            <div
                                key={rent.id}
                                className="pending"
                            >
                                <div className="pending-info">
                                    <div className="user-info">
                                        <img
                                            src={rent.profilePic || imgApp.image}
                                            alt="Foto de perfil"
                                            className="profile-pic"
                                        />
                                        <p className="time">Hace {calculateTimePassed(rent.create)}</p>
                                    </div>
                                    <div className="request-info">
                                        <h3 className="name-client">
                                            {getClientName(rent.client)}
                                        </h3>
                                        <div className="details">
                                            <p className="verified-date">
                                                <FaCalendar className="icon" />
                                                {rent.fecha_cita}
                                            </p>
                                            <p className="locationR">
                                                <FaClock className="icon" />
                                                {rent.time}
                                            </p>
                                        </div>
                                        <div className="details">
                                            <p className="verified">
                                                <RiVerifiedBadgeFill className="icon" />
                                                Verificado
                                            </p>
                                            <p className="locationR">
                                                <IoLocationSharp className="icon" />
                                                {rent.location}
                                            </p>
                                        </div>
                                        <div className="price-description">
                                            <p className="price">{price[index]}Bs</p>
                                            <div className="description">
                                                <p >{rent.description}</p>
                                            </div>
                                            {getClientLikes(rent.client).map(like => (
                                                <p key={like} className="descriptionLike">{like}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>

                                <div className="action-buttons">
                                    <button className="btnV"
                                        onClick={() => handleAccept(rent.id)} //rent.id
                                    >Aceptar</button>
                                    <button className="btnVR"
                                        onClick={() => handleReject(rent.id)}
                                    >Rechazar</button>
                                </div>

                            </div>
                        ))
                    )}
                </div>
            </div >
        </>
    );
}