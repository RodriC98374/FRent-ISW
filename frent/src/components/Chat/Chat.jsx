import React, { useState } from "react";
import "./Chat.css";
import ChatList from "./chatList/ChatList";
import { IoIosClose, IoIosArrowBack } from "react-icons/io";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(true); // Estado para controlar la visibilidad del chat

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([
      { text: "Hola!", isIncoming: true, time: "10:00" },
      { text: "Hola, cómo estás?", isIncoming: false, time: "10:01" },
      { text: "Pasa viste ya por casa?", isIncoming: true, time: "9:42" },
      { text: "Por su casa yo pasá", isIncoming: false, time: "9:45" },
      { text: "A su dueño no lo vi", isIncoming: true, time: "9:48" },
      { text: "Andaba don Jose", isIncoming: false, time: "9:52" },
    ]);
    setIsChatVisible(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentMessage.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        text: currentMessage,
        isIncoming: false,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setCurrentMessage("");
    }
  };

  const handleBackButtonClick = () => {
    setSelectedUser(null);
    setIsChatVisible(false);
  };

  const handleChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleChatToggle = () => {
    setIsChatVisible(!isChatVisible);
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
                  {/* Renderizar la imagen del avatar del amigo aquí */}
                </div>
                <div className="user-info">
                  <h3>{selectedUser.name}</h3>
                  <p>Última vez activo...</p>
                </div>
              </div>
            </div>

            <div className="chat-body">
              <div className="chat-messages">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${
                      message.isIncoming ? "incoming" : "outgoing"
                    }`}>
                    <div className="message-content">
                      <p>{message.text}</p>
                      <span className="message-time">{message.time}</span>
                    </div>
                  </div>
                ))}
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

          <p>Envía o recibe mensajes </p>
  <p>Selecciona un amigo de la lista y comienza la conversación para cordinar un encuentro</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
