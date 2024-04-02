import React, { useEffect, useState } from 'react';
import { FaUserFriends, FaCalendar, FaClock } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import imgApp from '../../assets/imgApp';
import './ViewReserve.css';
import { ButtonSecondary } from '../Buttons/buttonSecondary';
import { ButtonPrimary } from '../Buttons/buttonPrimary';
import { getClient, getFriends, getRent, cancelRent } from '../../api/register.api';

export default function ViewReserve() {
    const [listRent, setListRent] = useState([]);
    const [listClient, setListClient] = useState([]);
    const [listFriend, setListFriend] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const resRent = await getRent();
                if (resRent && resRent.data) {
                    setListRent(resRent.data);
                }

                const resClient = await getClient();
                if(resClient && resClient.data){
                    setListClient(resClient.data);
                }

                const resFriend = await getFriends();
                if(resFriend && resFriend.data){
                    setListFriend(resFriend.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    const getClientName = (clientId) => {
        const client = listClient.find(client => client.id === clientId);
        if (client) {
            return `${client.first_name} ${client.last_name}`;
        }
        return "Cliente Desconocido";
    };

    const calculateTotalPrice = (duration, pricePerHour) => {
        return duration * pricePerHour;
    };

    const calculateElapsedTime = (time) => {
        const requestTime = new Date(time);
        const currentTime = new Date();
        const elapsedTime = currentTime - requestTime;
        console.log('ElapsedTime:', elapsedTime);
        const seconds = Math.floor(elapsedTime / 1000);
        console.log('Seconds:', seconds);
        const minutes = Math.floor(seconds / 60);
        console.log('Minutes:', minutes);
        const hours = Math.floor(minutes / 60);
        console.log('Hours:', hours);
        const days = Math.floor(hours / 24);
        console.log('Days:', days);
        let elapsedTimeMessage = '';
        if (days > 0) {
            elapsedTimeMessage = `${days} día${days > 1 ? 's' : ''} atrás`;
        } else if (hours > 0) {
            elapsedTimeMessage = `${hours} hora${hours > 1 ? 's' : ''} atrás`;
        } else if (minutes > 0) {
            elapsedTimeMessage = `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
        } else {
            elapsedTimeMessage = 'Hace unos segundos';
        }
        console.log('ElapsedTimeMessage:', elapsedTimeMessage);
        return elapsedTimeMessage;
    };
    

    const handleCancelReservation = async (reservationId) => {
        // Intentar cancelar la reserva en la base de datos
        try {
            await cancelRent(reservationId);
            console.log("La reserva se ha cancelado correctamente en la base de datos.");

            // Actualizar la lista local después de la eliminación en la base de datos
            const updatedList = listRent.filter(rent => rent.id !== reservationId);
            setListRent(updatedList);
        } catch (error) {
            console.error("Error al cancelar la reserva en la base de datos:", error);
        }
    };

    return (
        <>
            <div className='contV'>
            <div>
            <h1 className="title"><FaUserFriends className='icon' />Alquileres Pendientes</h1>
            </div>
            <div id="pendings">
                {listRent.map(rent => (
                    <div key={rent.id} className="pending">
                        <div className='pending-info'>
                            <div className="user-info">
                                <img src={rent.profilePic || imgApp.image} alt="Foto de perfil" className="profile-pic" />
                                <p className="time">{calculateElapsedTime(rent.time)}</p>
                            </div>
                            <div className="request-info">
                                <h3 className='name-client'>{getClientName(rent.client_id)}</h3> 
                                <p className="date-time"><FaCalendar className='icon' />{rent.fecha_cita} <FaClock className='timeR' /> {rent.time}</p>
                                <div className="details">
                                    <p className="verified"><RiVerifiedBadgeFill className='icon'/>Verificado</p>
                                    <p className="locationR"><IoLocationSharp  className='icon'/>{rent.location}</p>
                                </div>
                                <div className="price-description">
                                    <p className="price">{calculateTotalPrice(rent.duration, rent.price)}</p>
                                    <p className="description">{rent.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="action-buttons">
                            <ButtonPrimary type={"submit"} label={"Aceptar"}/>
                            <ButtonSecondary label={"Cancelar"} onClick={() => handleCancelReservation(rent.id)}/>
                        </div>
                        <hr></hr>
                    </div>
                ))}
                <hr></hr>
            </div>
            </div>
        </>
    )
}
