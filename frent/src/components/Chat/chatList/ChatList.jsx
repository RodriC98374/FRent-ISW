import "./chatList.css";
import { useState, useEffect } from "react";
import { getClient, getPendingRent } from "../../../api/register.api"; 
import { getUser } from "../../../pages/Login/LoginForm";

const ChatList = ({ onSelectUser }) => {
    const [searchText, setSearchText] = useState("");
    const [usersClient, setUsersClient] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const dataUser = getUser()
    console.log("ds",usersClient)

    const fetchData = async () => {
        try {
            const resRent = await getPendingRent(dataUser.user_id); // Obtener clientes de la base de datos
            setUsersClient(resRent.data); // Actualizar el estado con los clientes obtenidos
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    };

    useEffect(() => {
        fetchData(); // Llamar a fetchData al montar el componente
    }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        onSelectUser(user); // Notificar al componente padre sobre la selección
    };
  
    const filteredUsers = usersClient.filter((user) =>
        user &&
        (user.first_name || user.nombre_cliente || user.description || user.image) &&
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
