import "./chatList.css";
import { useState } from "react";

const ChatList = ({ onSelectUser }) => {

    const [searchText, setSearchText] = useState('');
    const users = [
        {
            id: 1,
            name: 'Jane Doe',
            avatar: './avatar.png',
            messages: [
                { text: 'Hello!', isIncoming: true, time: '10:00' },
                { text: 'How are you?', isIncoming: false, time: '10:01' }
            ]
        },
        {
            id: 2,
            name: 'John Smith',
            avatar: './avatar.png',
            messages: [
                { text: 'Hi there!', isIncoming: true, time: '11:00' },
                { text: 'Nice to meet you.', isIncoming: false, time: '11:01' }
            ]
        },
        {
            id: 3,
            name: 'Alice Johnson',
            avatar: './../../../image.png',
            messages: [
                { text: 'Good morning', isIncoming: true, time: '9:00' },
                { text: 'How was your day?', isIncoming: false, time: '9:01' }
            ]
        },
        {
            id: 4,
            name: 'Armando Gaspar',
            avatar: './avatar.png',
            messages: [
                { text: 'Buenos días', isIncoming: true, time: '8:30' },
                { text: '¿Qué tal estás?', isIncoming: false, time: '8:31' }
            ]
        },
        {
            id: 5,
            name: 'Jhoel Mamani',
            avatar: './avatar.png',
            messages: [
                { text: 'Hola!', isIncoming: true, time: '10:30' },
                { text: '¿Cómo estás?', isIncoming: false, time: '10:31' }
            ]
        },
        {
            id: 6,
            name: 'Alfredo Torrico',
            avatar: './avatar.png',
            messages: [
                { text: 'Buenos días!', isIncoming: true, time: '7:00' },
                { text: '¿Cómo va todo?', isIncoming: false, time: '7:01' }
            ]
        },
        {
            id: 7,
            name: 'John Henry',
            avatar: './avatar.png',
            messages: [
                { text: 'Good morning', isIncoming: true, time: '8:00' },
                { text: 'Have a great day!', isIncoming: false, time: '8:01' }
            ]
        },
        {
            id: 8,
            name: 'Michael Padilla',
            avatar: './avatar.png',
            messages: [
                { text: 'Hey!', isIncoming: true, time: '12:00' },
                { text: 'Let\'s catch up later.', isIncoming: false, time: '12:01' }
            ]
        }
    ];

    const handleUserClick = (user) => {
        onSelectUser(user); 
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
    );

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
            {filteredUsers.map((user) => (
                    <button
                        key={user.id}
                        className="chatListItem"
                        onClick={() => handleUserClick(user)}
                    >
                        <img className="chatListAvatarLarge" src={user.avatar} alt="" />
                        <div className="chatListItemTexts">
                            <span className="chatListItemName">{user.name}</span>
                            {/* Mostrar el último mensaje del usuario */}
                            {user.messages.length > 0 && (
                                <p className="chatListItemMessage">
                                    {user.messages[user.messages.length - 1].text}
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
