import React, { useEffect, useState } from "react";
import { FaUserFriends, FaCalendar, FaClock } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import imgApp from "../../assets/imgApp";
import "./ViewReserve.css";
import { ButtonSecondary } from "../Buttons/buttonSecondary";
import { ButtonPrimary } from "../Buttons/buttonPrimary";
import { getClient, getRent, getPrice } from "../../api/register.api";

export default function ViewReserve() {
    const [listRent, setListRent] = useState([]);
    const [listClient, setListClient] = useState([]);
    const [price, setPrice] = useState([]);
    console.log(price)

    useEffect(() => {
        async function fetchData() {
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
                console.log(resPrice);
                if (resPrice && resPrice.data) {
                    const pricesArray = resPrice.data.map(item => item.total_price);
                    setPrice(pricesArray);
                }
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    const getClientName = (clientId) => {
        const client = listClient.find((client) => client.id === clientId);
        if (client) {
            return `${client.first_name} ${client.last_name}`;
        }
        return "Cliente Desconocido";
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
                            className="pending">
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
                                        {getClientName(rent.client_id)}
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
                                        <p className="description">{rent.description}</p>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="action-buttons">
                                <ButtonPrimary
                                    type={"submit"}
                                    label={"Aceptar"}
                                />
                                <ButtonSecondary label={"Cancelar"} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
