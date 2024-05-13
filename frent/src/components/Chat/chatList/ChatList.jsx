import "./chatList.css";
import { useState } from "react";

const ChatList = () => {
    return (
        <div className="chatListContainer">
            <div className="chatListSearch">
                <div className="chatListSearchBar">
                    <i className="fas fa-search"></i>
                    <input className="chatListSearchInput" type="text" placeholder="Search" />
                </div>
            </div>

            <button className="chatListItem">
                <img className="chatListAvatarLarge" src="./avatar.png" alt="" />
                <div className="chatListItemTexts">
                    <span className="chatListItemName">Jane Doe</span>
                    <p className="chatListItemMessage">Hello3</p>
                </div>
            </button>
        </div>
    );
};

export default ChatList;
