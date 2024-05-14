import "./chatList.css";
import { useState } from "react";

const ChatList = ({ onSelectUser }) => {

    const [searchText, setSearchText] = useState('');
    const users = [
        { id: 1, name: 'Jane Doe', message: 'Hello3', avatar: './avatar.png' },
        { id: 2, name: 'John Smith', message: 'Hi there!', avatar: './avatar.png' },
        { id: 3, name: 'Alice Johnson', message: 'Good morning', avatar: './avatar.png' },
        { id: 4, name: 'Armando Gaspar', message: 'Good morning', avatar: './avatar.png' },
        { id: 5, name: 'Jhoel Mamani', message: 'Good morning', avatar: './avatar.png' },
        { id: 6, name: 'ALfredo Torrico', message: 'Good morning', avatar: './avatar.png' },
        { id: 7, name: 'John Henry', message: 'Good morning', avatar: './avatar.png' },
        { id: 8, name: 'Michael Padilla', message: 'Good morning', avatar: './avatar.png' },
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
                <button key={user.id} className="chatListItem" onClick={() => handleUserClick(user)}>
                    <img className="chatListAvatarLarge" src={user.avatar} alt="" />
                    <div className="chatListItemTexts">
                        <span className="chatListItemName">{user.name}</span>
                        <p className="chatListItemMessage">{user.message}</p>
                    </div>
                </button>
            ))}
            </div>
        </div>
    );
};

export default ChatList;
