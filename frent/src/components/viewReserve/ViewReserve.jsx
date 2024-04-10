import React, { useEffect, useState } from "react";
import { FaUserFriends, FaCalendar, FaClock } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import imgApp from "../../assets/imgApp";
import "./ViewReserve.css";
import { getClient, getRent, getPrice, deleteRent, get_likes_user} from "../../api/register.api";

export default function ViewReserve() {
    const [listRent, setListRent] = useState([]);
    const [listClient, setListClient] = useState([]);
    const [price, setPrice] = useState([]);
    const [likes_user, setLikesUser] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    //Para obtener los gustos de los clientes que alquilaron xd
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
                setListRent(resRent.data);
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

     //Para obtener los gustos de un cliente especifico
    const getClientLikes = (clientId) => {
        const clientLikes = likes_user.find((like) => like.id_user === clientId);
        if (clientLikes) {
            return clientLikes.gustos;
        }
        return [];
    };

    const handleAccept = async (rentId) => {
        try {
            const accepted = window.confirm("¿Aceptas ser el amigo?");
            if (accepted) {
                await deleteRent(rentId);
                fetchData(); // Actualizar datos después de aceptar
            }
        } catch (error) {
            console.error("Error al aceptar el alquiler:", error);
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
            console.error( error);
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
                    {listRent.map((rent, index) => (
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
                                    <p className="time">{rent.time}</p>
                                </div>
                                <div className="request-info">
                                    <h3 className="name-client">
                                        {getClientName(rent.client)}
                                    </h3>
                                    <p className="date-time">
                                        <FaCalendar className="icon" />
                                        {rent.fecha_cita} <FaClock className="timeR" /> {rent.time}
                                    </p>
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
                                        <p >{rent.description}</p>
                                        {getClientLikes(rent.client).map(like => (
                                            <p key={like} className="description">{like}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="action-buttons">
                                <button className="btnV"
                                    onClick={() => handleAccept(rent.id)}
                                >Aceptar</button>
                                <button className="btnVR"
                                    onClick={() => handleReject(rent.id)}
                                >Rechazar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
