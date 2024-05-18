import "./chatList.css";
import { useState, useEffect } from "react";
import {
    getPendingRent,
    getRent,
    getFriendID,
} from "../../../api/register.api";
import { getUser } from "../../../pages/Login/LoginForm";

const ChatList = ({ onSelectUser }) => {
    const [usersClient, setUsersClient] = useState([]);
    const [friendsData, setFriendsData] = useState([]);
    const userData = getUser()
    const [searchText, setSearchText] = useState('');

    console.log("CLiente", usersClient)
    console.log("Amigo", friendsData)

    useEffect(() => {
       if (userData.user_type === "Amigo"){
            fetchData();
       } else{
        obtenerDatosAmigosAceptados();
       }
    }, []);
    const obtenerDatosAmigosAceptados = async () => {
        try {
            const response = await getRent();
            const chatList = response.data;
            
            const amigosAceptados = chatList
                .filter(registro => registro.client === userData.user_id && registro.status === "accepted")
                .map(registro => registro.friend);
    
            const amigosDataPromises = amigosAceptados.map(async (amigoID) => {
                try {
                    const friendResponse = await getFriendID(amigoID);
                    return friendResponse.data;
                } catch (error) {
                    console.error("Error al obtener datos del amigo:", error);
                    return null;
                }
            });
    
            const nuevosAmigosDataArray = await Promise.all(amigosDataPromises);
    
            // Filtrar amigos duplicados
            const amigosDataUnicos = nuevosAmigosDataArray.filter(nuevoAmigo => {
                return !friendsData.some(amigoExistente => amigoExistente.id_user === nuevoAmigo.id_user);
            });
    

            const amigosDataActualizados = [...friendsData, ...amigosDataUnicos];
    
            setFriendsData(amigosDataActualizados);
        } catch (error) {
            console.error("Error al buscar amigos aceptados:", error);
        }
    };
    
    

    const fetchData = async () => {
        try {
            const resRent = await getPendingRent(userData.user_id); 
            setUsersClient(resRent.data);
            console.log(resRent.data)
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    };

    
        const getUniqueUsers = (users) => {
            const uniqueUsers = new Set();
            const filteredUsers = [];
    
            users.forEach((user) => {
                if (!uniqueUsers.has(user.rent_id)) {
                    uniqueUsers.add(user.rent_id);
                    filteredUsers.push(user);
                }
            });
    
            return filteredUsers;
        };
    
        const filteredUsers = getUniqueUsers(usersClient).filter((user) =>
            user &&
            (user.first_name || user.nombre_cliente || user.description || user.image) &&
            (user.status === "Aceptado") &&
            (
                (user.first_name && user.first_name.toLowerCase().includes(searchText.toLowerCase())) ||
                (user.nombre_cliente && user.nombre_cliente.toLowerCase().includes(searchText.toLowerCase()))
            )
        );
    
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleUserClick = (user) => {
        onSelectUser(user);
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
                {friendsData.map((friend) => (
                    <button
                        key={friend.id_user}
                        className="chatListItem"
                        onClick={() => handleUserClick(friend)}
                    >
                        <img className="chatListAvatarLarge" src={`data:image/png;base64,${friend.image}`} alt="" />
                        <div className="chatListItemTexts">
                            <span className="chatListItemName">{friend.first_name} {friend.last_name}</span>
                            <p className="chatListItemMessage">
                                {truncateMessage(friend.personal_description, 45)}
                            </p>
                        </div>
                    </button>
                ))}

                {filteredUsers.map((user) => (
                    <button
                        key={user.rent_id}
                        className="chatListItem"
                        onClick={() => handleUserClick(user)}
                    >
                        <img className="chatListAvatarLarge" src={`data:image/png;base64,${user.image}`} alt="" />
                        <div className="chatListItemTexts">
                            <span className="chatListItemName">{user.nombre_cliente}</span>
                            <p className="chatListItemMessage">
                                {truncateMessage(user.description, 45)}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChatList;
