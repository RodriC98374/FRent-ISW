import "./chatList.css";
import { useState, useEffect } from "react";
import { getFriends, getLikes, getPendingRent, getRent, getFriendID } from "../../../api/register.api";

const ChatList = ({ onSelectUser }) => {
    const [listchat, setListChat] = useState([]);
    const [friendsData, setFriendsData] = useState([]);
    const userDataString = sessionStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    const me = userData.user_id;
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
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
                messages: [] // Puedes inicializar las conversaciones vacías si es necesario
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

    const staticImage =
        "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";

    const handleUserClick = (user) => {
        onSelectUser(user);
    };
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <div className="chatListContainer">
            <div className="chatListSearch">
                <div className="chatListSearchBar">
                    <i className="fas fa-search"></i>
                    <input className="chatListSearchInput" type="text" placeholder="Search" value={searchText}
                        onChange={handleSearchChange} />
                </div>
            </div>

            <div className="user-chatList">
                {friendsData.map((friend) => (
                    <button
                        key={friend.id}
                        className="chatListItem"
                        onClick={() => handleUserClick(friend)}
                    >
                        <img className="chatListAvatarLarge" src={friend.avatar || staticImage} alt="" />
                        <div className="chatListItemTexts">
                            <span className="chatListItemName">{friend.name}</span>
                            {/* Mostrar el último mensaje del usuario */}
                            {friend.messages.length > 0 && (
                                <p className="chatListItemMessage">
                                    {friend.messages[friend.messages.length - 1].text}
                                </p>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChatList;
















// import "./chatList.css";
// import { useState, useEffect } from "react";

// import { getFriends, getLikes, getPendingRent, getRent, getFriendID } from "../../../api/register.api";
// const ChatList = ({ onSelectUser }) => {

//     const [users, setUsers] = useState([]); // Declarar el estado para users
//     const [searchText, setSearchText] = useState(''); // Declarar

//     const [listchat, setListChat] = useState([]);
//     const [friendsData, setFriendsData] = useState([]);
//     const userDataString = sessionStorage.getItem("userData");
//     const userData = JSON.parse(userDataString);
//     const me = userData.user_id;

//     useEffect(() => {


//         buscarAmigosAceptados();
//     }, []);

//     const obtenerDatosAmigo = async (amigoID) => {
//         try {
//             const friendResponse = await getFriendID(amigoID);
//             const id = friendResponse.data.id_user;
//             const name = friendResponse.data.last_name;
//             const avatar = friendResponse.data.image;




//             return {
//                 id: id,
//                 name: name,
//                 avatar: avatar,
//                 messages: [] // Puedes inicializar las conversaciones vacías si es necesario
//             };
//         } catch (error) {
//             console.error("Error al obtener datos del amigo:", error);
//             return null;
//         }
//     };

//     const obtenerDatosAmigos = async (amigosIDs) => {


//         try {
//             const amigosDataPromises = amigosIDs.map(async (amigoID) => {
//                 return await obtenerDatosAmigo(amigoID);
//             });

//             return await Promise.all(amigosDataPromises);
//         } catch (error) {
//             console.error("Error al obtener datos de amigos:", error);
//             return [];
//         }
//     };

//     const buscarAmigosAceptados = async () => {
//         try {


//             const response = await getRent();
//             const chatList = response.data;

//             const amigosAceptados = chatList
//                 .filter(registro => registro.client === me && registro.status === "accepted")
//                 .

//                 map(registro => registro.friend);

//             setListChat(amigosAceptados);

//             const amigosData = await obtenerDatosAmigos(amigosAceptados);
//             setFriendsData(amigosData);
//         } catch (error) {
//             console.error("Error al buscar amigos aceptados:", error);
//         }
//     };


//     const staticImage =
//         "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";


//     const handleUserClick = (user) => {
//         onSelectUser(user);
//     };

//     const filteredUsers = users.filter((user) =>
//         user.name.toLowerCase().includes(searchText.toLowerCase())
//     );

//     const handleSearchChange = (event) => {
//         setSearchText(event.target.value);
//     };

//     return (
//         <div className="chatListContainer">
//             <div className="chatListSearch">
//                 <div className="chatListSearchBar">
//                     <i className="fas fa-search"></i>
//                     <input className="chatListSearchInput" type="text" placeholder="Search" value={searchText}
//                         onChange={handleSearchChange} />
//                 </div>
//             </div>

//             <div className="user-chatList">
//                 {filteredUsers.map((user) => (
//                     <button
//                         key={user.id}
//                         className="chatListItem"
//                         onClick={() => handleUserClick(user)}
//                     >
//                         <img className="chatListAvatarLarge" src={staticImage} alt="" />
//                         <div className="chatListItemTexts">
//                             <span className="chatListItemName">{user.name}</span>
//                             {/* Mostrar el último mensaje del usuario */}
//                             {user.messages.length > 0 && (
//                                 <p className="chatListItemMessage">
//                                     {user.messages[user.messages.length - 1].text}
//                                 </p>
//                             )}
//                         </div>
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ChatList;
