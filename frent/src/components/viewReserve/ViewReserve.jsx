import React, { useEffect, useState } from 'react';
import { FaUserFriends, FaCalendar, FaClock } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import imgApp from '../../assets/imgApp';
import './ViewReserve.css';
import { ButtonSecondary } from '../Buttons/buttonSecondary';
import { ButtonPrimary } from '../Buttons/buttonPrimary';
import { getClient, getRent } from '../../api/register.api';

export default function ViewReserve() {
    const [listRent, setListRent] = useState([]);
    const [listClient, setListClient] = useState([]);

    useEffect(() => {
        async function loadRent(){
            const res = await getRent();
            if (res && res.data) {
                setListRent(res.data);
            }
        }
        loadRent();

        async function loadClient() {
            const resClient = await getClient()
            if(resClient && resClient.data){
                setListClient(resClient.data)
            }
        }
        loadClient();
    }, []);

    return (
        <>
            <div id="pendings">
                <h1 className="title"><FaUserFriends className='icon' />Alquileres Pendientes</h1>
                {listRent.map(rent => (
                    <div key={rent.id} className="pending">
                       <div className='pending-info'>
                            <div className="user-info">
                                <img src={rent.profilePic || imgApp.image} alt="Foto de perfil" className="profile-pic" />
                                <p className="time">{rent.time}</p>
                            </div>
                            <div className="request-info">
                                <p className="date-time"><FaCalendar className='icon' />{rent.fecha_cita} <FaClock /> {rent.time}</p>
                                <div className="details">
                                    <p className="verified"><RiVerifiedBadgeFill className='icon'/>Verificado</p>
                                    <p className="location"><IoLocationSharp  className='icon'/>{rent.location}</p>
                                </div>
                                <div className="price-description">
                                    <p className="price">{rent.price}</p>
                                    <p className="description">{rent.description}</p>
                                </div>
                            </div>
                        </div>
                    <div className="action-buttons">
                        <ButtonPrimary type={"submit"} label={"Aceptar"}/>
                        <ButtonSecondary label={"Cancelar"}/>
                    </div>
                <hr></hr>
                    </div>
                    
                ))}
                <hr></hr>
            </div>
        </>
    )
}
