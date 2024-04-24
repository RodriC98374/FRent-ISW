import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaUserFriends, FaCalendar, FaClock, FaSearch  } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import imgApp from "../../assets/imgApp";
import "./ViewReserve.css";
import "./Details.css";
import { getClient, getRent, getPrice, get_likes_user, deleteRent, create_notification, update_pending_rent, getPendingRent} from "../../api/register.api";

export default function ViewReserve() {
  const [listRent, setListRent] = useState([]);
  const [listClient, setListClient] = useState([]);
  const [price, setPrice] = useState([]);
  const [likes_user, setLikesUser] = useState([]);
  const [selectedRent, setSelectedRent] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (listRent.length > 0) {
      const fetchDataForLikes = async () => {
        try {
          const likesPromises = listRent.map(async (rent) => {
            const idClient = {
              id_user: rent.client,
            };
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
      const resRent = await getPendingRent(); //Cuando exista una sesion pasar el id del amigo xd
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
        const pricesArray = resPrice.data.map((item) => item.total_price);
        setPrice(pricesArray);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
    const handleAccept = async (rentId, rentClient, rentFriend) => {
        try {
            const accepted = window.confirm("¿Aceptas ser el amigo?");
            if (accepted) {
                
              const data = {
                status: "accepted"
              }
                const res = await update_pending_rent(rentId, data);

                console.log("el daots ess", res.data)

                const dataNotification = {
                    message: "Acepto ser tu amigo de alquiler!",
                    from_user: rentFriend,
                    to_user: rentClient,
                    is_reading: false
                }
                
                await create_notification(dataNotification);
                fetchData();
            }
        } catch (error) {
            console.error("Error al aceptar el alquiler:", error);
        }
    };

    const handleReject = async (rentId, rentClient, rentFriend) => {
        try {
            const rejected = window.confirm("¿Estás seguro de que deseas rechazar ser amigo?");
            if (rejected) {
                await deleteRent(rentId);
                const dataNotification = {
                    message: "Rechazo tu solicitud de alquiler :(",
                    from_user: rentFriend,
                    to_user: rentClient,
                    is_reading: false
                }
                await create_notification(dataNotification);
                fetchData();
            }
        } catch (error) {
            console.error(error);
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

    const openModal = (rent) => {
        setSelectedRent(rent);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setSelectedRent(null);
    };

    const DetailsModal = ({ isOpen, closeModal, rent }) => {
        if (!isOpen || !rent) return null;
      
        return (
          <div className="modal1">
            <div className="modal-header1">
              
              <div className="modalPrueba"><FaSearch className="icon1" />
              Detalles del alquiler</div>
              <AiOutlineClose className="icon1"
                size={30}
                color="#000"
                onClick={closeModal}
                cursor={"pointer"}
              />
            </div>
            <div className="container1">
              <div className="user-info1">
                <img
                  src={rent.profilePic || imgApp.image}
                  alt="Foto de perfil"
                  className="profile-pic1"
                />
              </div>
              <div className="request-info1">
                <h3 className="name-client1">{getClientName(rent.client)}</h3>
                <div className="detalle1">
                  <p className="verified-date1">
                    <FaCalendar className="icon" />
                    {rent.fecha_cita}
                  </p>
                  <p className="locationR1">
                    <FaClock className="icon" />
                    {rent.time}
                  </p>
                </div>
                <div className="detalle1">
                  <p className="verified1">
                    <RiVerifiedBadgeFill className="icon" />
                    Verificado
                  </p>
                  <p className="locationR1">
                    <IoLocationSharp className="icon" />
                    {rent.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="cuerpo1">
              <p>
                <strong>Duración:</strong>{" "}
              </p>
              <p>{rent.duration} horas</p>
              <div className="PrecioModal">
                <h3>Precio</h3>
                <div className="PrecioDetail">
                  <p>40 BOB x 1 hora</p>
                  <p>40 BOB</p>
                </div>
              </div>
              <p>
                <strong>Lugar:</strong>
              </p>
              <p>{rent.location}</p>
              <p>
                <strong>Tipo de evento:</strong>
              </p>
              {/*<p>{rent.event_id ? rent.event_id : <i>No especificado</i>}</p>*/}
              <p>Boda</p>
              <p>
                <strong>Vestimenta del evento:</strong>{" "}
              </p>
              {/*<p>{rent.outfit_id ? rent.outfit_id : <i>No especificado</i>}</p>*/}
              <p>Elegante</p>
              <p>
                <strong>Descripción:</strong>{" "}
              </p>
              <p>{rent.description ? rent.description : <i>No especificado</i>}</p>
              <p><strong>Intereses:</strong></p>
                        {getClientLikes(rent.client).map((like) => (
                        <p key={like} className="descriptionLike">
                        {like}
                        </p>
                        ))}
            </div>
            <div className="pie1">
              <p>
                <strong>Estado de la reserva:</strong>
              </p>
              <p className="pie.estado1">
                <span>Pendiente</span>
              </p>
            </div>
          </div>
        );
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
                                        
                                        <div className="price-details">
                                            <div className="price-container">
                                                <p className="price">{price[index]}Bs</p>
                                                
                                                <button className="details-button" onClick={() => openModal(rent)}>
                                                <FaSearch className="icon" />
                                                VER DETALLES
                                                </button>
                                            </div>
                                            </div>
                                                </div>
                                </div>
                                <hr></hr>
                                <div className="action-buttons">
                                    <button className="btnV"
                                        onClick={() => handleAccept(rent.id, rent.client, rent.friend)}
                                    >Aceptar</button>
                                    <button className="btnVR"
                                        onClick={() => handleReject(rent.id, rent.client, rent.friend)}
                                    >Rechazar</button>
                                </div>
                                {/* Renderiza el modal si se ha seleccionado un alquiler */}
                <DetailsModal isOpen={selectedRent !== null} closeModal={closeModal} rent={selectedRent} />
                                </div>
                           
                        ))
                    )}
                </div>
            </div>
        </>
    );

  
  
}
