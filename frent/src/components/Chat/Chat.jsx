import React, { useState, useEffect } from "react";
import "./Chat.css";
import ChatList from "./chatList/ChatList";
import { IoIosArrowBack } from "react-icons/io";
import { getUser } from "../../pages/Login/LoginForm";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentMessage, setCurrentMessage] = useState("");
    const [isChatVisible, setIsChatVisible] = useState(true);
    const dataUser = getUser();
    const [socket, setSocket] = useState(null);
    const roomName = dataUser.user_type;

    useEffect(() => {
        const connectWebSocket = () => {
            if (selectedUser) {
                const IdReceptor = dataUser.user_type === "Amigo" ? selectedUser.client_id : selectedUser.id_user;
                const ws = new WebSocket(`ws://localhost:9000/ws/chat/${dataUser.user_id}/${IdReceptor}/`);
                console.log("HOla s", IdReceptor)
                
                ws.onopen = () => {
                    console.log('Conexión WebSocket abierta');
                    const message = {
                        sender: 'React Client',
                        message: 'Hola desde el cliente React'
                    };
                    ws.send(JSON.stringify(message));
                };

                ws.onmessage = (e) => {
                    const message = JSON.parse(e.data);
                    console.log('Mensaje recibido desde el servidor:', message);
                    
                    // Actualizar el estado de los mensajes en el componente
                    setMessages(prevMessages => [...prevMessages, {
                        id: prevMessages.length + 1,
                        text: message.message,
                        isIncoming: true, // Indica que es un mensaje entrante
                        time: new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                        senderId: message.sender, // El remitente del mensaje
                    }]);
                };

                ws.onerror = (error) => {
                    console.error('Error en la conexión WebSocket:', error);
                };

                ws.onclose = () => {
                    console.log('Conexión WebSocket cerrada');
                };

                setSocket(ws); // Guardar la instancia del WebSocket en el estado
            } else {
                console.log('No hay usuario seleccionado para chatear');
            }
        };

        if (roomName) {
            connectWebSocket();
        }

        return () => {
            if (socket) {
                socket.close(); // Cerrar la conexión al desmontar el componente
            }
        };
    }, [roomName, selectedUser]);


    const handleUserSelect = (user) => {
        setSelectedUser(user);
        if (user && user.messages) {
            setMessages(user.messages);
        } else {
            setMessages([]);
        }
        setIsChatVisible(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const recipientID = dataUser.user_type === "Cliente" ? selectedUser.id_user : selectedUser.client_id;
        if(recipientID != dataUser.user_id){
        if (currentMessage.trim() !== "" && socket) {
            const newMessage = {
                id: messages.length + 1,
                text: currentMessage,
                isIncoming: false,
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                recipientId:  recipientID
            };

            setMessages([...messages, newMessage]);
            setCurrentMessage("");

            let senderId, recipientId, senderName, recipientName;

            if (dataUser.user_type === "Amigo") {
                senderId = dataUser.user_id;
                recipientId = selectedUser.client_id;
                senderName = dataUser.first_name;
                recipientName = selectedUser.nombre_cliente;
            } else {
                senderId = dataUser.user_id;
                recipientId = selectedUser.id_user;
                senderName = dataUser.first_name;
                recipientName = selectedUser.first_name;
            }

            const messagePayload = {
                sender: senderId,
                recipient: recipientId,
                message: currentMessage,
                senderName: senderName,
                recipientName: recipientName
            };

            console.log('messagePayload:', messagePayload);
            socket.send(JSON.stringify(messagePayload));
        }else{
            console.log("no")
        }
    }else{
        console.log("hoasl")
    }
        
    };

    const handleBackButtonClick = () => {
        setSelectedUser(null);
        setIsChatVisible(false);
    };

    const handleChange = (event) => {
        setCurrentMessage(event.target.value);
    };

    return (
        <div className="containerChat-list">
            <h1>Chats</h1>
            <div className="message-chat">
                <ChatList onSelectUser={handleUserSelect} />
                {isChatVisible && selectedUser ? (
                    <div className="chat-container">
                        <div className="chat-header">
                            <div className="header-info">
                                <button
                                    className="add"
                                    onClick={handleBackButtonClick}>
                                    <IoIosArrowBack />
                                </button>
                                <div className="avatar">
                                    <img className="avatar-chat" src={`data:image/png;base64,${selectedUser.image}`} alt={selectedUser.name} />
                                </div>
                                <div className="user-info">
                                    <h3>{selectedUser.nombre_cliente} {selectedUser.first_name} {selectedUser.last_name}</h3>
                                    <p>Última vez activo...</p>
                                </div>
                            </div>
                        </div>

                        <div className="chat-body">
                            <div className="chat-messages">
                                <div className="chat-messages">
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`message ${message.isIncoming ? "incoming" : "outgoing"}`}
                                        >
                                            <div className="message-content">
                                                <div className="message-text">{message.isIncoming ? selectedUser.nombre_cliente : (message.isSent ? "Tú" : "Yo")}: {message.text}</div>
                                                <span className="message-time">{message.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="chat-input">
                            <form
                                className="new-message"
                                onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={currentMessage}
                                    onChange={handleChange}
                                    placeholder="Escribir un mensaje..."
                                    rows={4}
                                />
                                <button type="submit">
                                    <i className="fa fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="chat-placeholder">
                        <img
                            src="https://i.ibb.co/hZwZSSN/Logo-frent.png"
                            alt="Logo FREnt"
                            className="login-logo-chat"
                        />
                        <h3>Inicia un chat con los amigos de FRent</h3>

                        <p>Envía o recibe mensajes</p>
                        <p>Selecciona un amigo de la lista y comienza la conversación para coordinar un encuentro</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;