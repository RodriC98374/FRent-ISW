import React from 'react';
import { FaUserFriends, FaCalendar, FaClock } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import imgApp from '../../assets/imgApp';
import './ViewReserve.css';
import { ButtonSecondary } from '../Buttons/buttonSecondary';
import { ButtonPrimary } from '../Buttons/buttonPrimary';

const pendingsData = [
  {
    id: 1,
    profilePic: imgApp.image,
    time: 'Hace 5 min',
    date: '26/03/2024',
    timeOfDay: '19:49 h',
    verified: true,
    location: 'Cochabamba',
    price: '40 BOB',
    description: 'Conocer gente nueva'
  },
  {
    id: 2,
    profilePic: imgApp.image,
    time: 'Hace 20 min',
    date: '31/03/2024',
    timeOfDay: '20:55 h',
    verified: true,
    location: 'Oruro',
    price: '20 BOB',
    description: 'Bailar'
  },
  
];

export default function ViewReserve() {
    return (
        <>
            <div id="pendings">
                <h1 className="title"><FaUserFriends className='icon' />Alquileres Pendientes</h1>
                {pendingsData.map(pending => (
                    <div key={pending.id} className="pending">
                       <div className='pending-info'>
                            <div className="user-info">
                                <img src={pending.profilePic || imgApp.image} alt="Foto de perfil" className="profile-pic" />
                                <p className="time">{pending.time}</p>
                            </div>
                            <div className="request-info">
                                <p className="date-time"><FaCalendar className='icon' />{pending.date} <FaClock /> {pending.timeOfDay}</p>
                                <div className="details">
                                    <p className="verified"><RiVerifiedBadgeFill className='icon'/>Verificado</p>
                                    <p className="location"><IoLocationSharp  className='icon'/>{pending.location}</p>
                                </div>
                                <div className="price-description">
                                    <p className="price">{pending.price}</p>
                                    <p className="description">{pending.description}</p>
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
