import "./chatList.css";
import { useState, useEffect } from "react";
import {
    getFriends,
    getLikes,
    getPendingRent,
    getRent,
    getFriendID,
    getClient
} from "../../../api/register.api";
import { getUser } from "../../../pages/Login/LoginForm";

const ChatList = ({ onSelectUser }) => {
    const [usersClient, setUsersClient] = useState([]);
    const dataUser = getUser();
    const [listchat, setListChat] = useState([]);
    const [friendsData, setFriendsData] = useState([]);
    const userDataString = sessionStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    const me = userData.user_id;
    const [searchText, setSearchText] = useState('');
    const [renderedClientIDs, setRenderedClientIDs] = useState(new Set());

    useEffect(() => {
        fetchData();
        buscarAmigosAceptados();
    }, []);

    const obtenerDatosAmigo = async (amigoID) => {
        try {
            const friendResponse = await getFriendID(amigoID);
            const id = friendResponse.data.id_user;
            const name = friendResponse.data.last_name;
            const avatar = friendResponse.data.image;
            const im = getImage(avatar);
            return {
                id: id,
                name: name,
                avatar: im,
                messages: [] 
            };
        } catch (error) {
            console.error("Error al obtener datos del amigo:", error);
            return null;
        }
    };

    const getImage = (imageFriend) => {
        if (imageFriend) {
            return `data:image/png;base64,${imageFriend}`;
        }
        return staticImage;
    };

    const obtenerDatosAmigos = async (amigosIDs) => {
        try {
            const amigosDataPromises = amigosIDs.map(async (amigoID) => {
                return await obtenerDatosAmigo(amigoID);
            });

            return await Promise.all(amigosDataPromises);
        } catch (error) {
            console.error("Error al obtener datos de amigos:", error);
            return [];
        }
    };

    const buscarAmigosAceptados = async () => {
        try {
            const response = await getRent();
            const chatList = response.data;

            const amigosAceptados = chatList
                .filter(registro => registro.client === me && registro.status === "accepted")
                .map(registro => registro.friend);

            setListChat(amigosAceptados);

            const amigosData = await obtenerDatosAmigos(amigosAceptados);
            setFriendsData(amigosData);
        } catch (error) {
            console.error("Error al buscar amigos aceptados:", error);
        }
    };

    const staticImage = "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";

    const handleUserClick = (user) => {
        onSelectUser(user);
    };

    const fetchData = async () => {
        try {
            const resRent = await getPendingRent(dataUser.user_id); // Obtener clientes de la base de datos
            setUsersClient(resRent.data);
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    };

    const filteredUsers = usersClient.filter((user) =>
        user &&
        (user.first_name || user.nombre_cliente || user.description || user.image) &&
        user.status === "Aceptado" &&
        (
            (user.first_name && user.first_name.toLowerCase().includes(searchText.toLowerCase())) ||
            (user.nombre_cliente && user.nombre_cliente.toLowerCase().includes(searchText.toLowerCase()))
        )
    );

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const truncateMessage = (message, maxLength) => {
        if (message && message.length > maxLength) {
            return message.slice(0, maxLength) + "...";
        }
        return message || "";
    };

    return (
        <div className="chatListContainer">
            <div className="chatListSearch">
                <div className="chatListSearchBar">
                    <i className="fas fa-search"></i>
                    <input
                        className="chatListSearchInput"
                        type="text"
                        placeholder="Search"
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div className="user-chatList">
                {[...friendsData, ...filteredUsers].map((user) => {
                    if (!renderedClientIDs.has(user.id)) {
                        setRenderedClientIDs(new Set(renderedClientIDs.add(user.id)));
                        return (
                            <button
                                key={user.id}
                                className="chatListItem"
                                onClick={() => handleUserClick(user)}
                            >
                                <img className="chatListAvatarLarge" src={user.avatar || staticImage} alt="" />
                                <div className="chatListItemTexts">
                                    <span className="chatListItemName">{user.name || user.nombre_cliente}</span>
                                    {/* Mostrar el último mensaje del usuario */}
                                    {user.messages.length > 0 && (
                                        <p className="chatListItemMessage">
                                            {user.messages[user.messages.length - 1].text}
                                        </p>
                                    )}
                                </div>
                            </button>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default ChatList;
