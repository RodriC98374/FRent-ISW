import React, { useState } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([
        { text: 'Pasa viste ya por casa?', isIncoming: true, time: '9:42' },
        { text: 'Por su casa yo pasá', isIncoming: false, time: '9:45' },
        { text: 'A su dueño no lo vi', isIncoming: true, time: '9:48' },
        { text: 'Andaba don Jose', isIncoming: false, time: '9:52' },
    ]);

    const [currentMessage, setCurrentMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (currentMessage !== '') {
            setMessages([
                ...messages,
                { text: currentMessage, isIncoming: false, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
            ]);
            setCurrentMessage('');
        }
    };

    const handleChange = (event) => {
        setCurrentMessage(event.target.value);
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="header-info">
                    <div className="avatar">
                        {/* Render friend's avatar image here */}
                    </div>
                    <div className="user-info">
                        <h3>Juan Mecánico</h3>
                        <p>Última vez activo...</p>
                    </div>
                </div>
            </div>

            <div className="chat-body">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.isIncoming ? 'incoming' : 'outgoing'}`}>
                            <div className="message-content">
                                <p>{message.text}</p>
                                <span className="message-time">{message.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="chat-input">
                <form className="new-message" onSubmit={handleSubmit}>
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
    );
};

export default Chat;