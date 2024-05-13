import "./chatList.css";
import { useState } from "react";


const ChatList = () => {

    return (
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Search" />
                </div>
                
            </div>

            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Jane Doe</span>
                    <p>Hello3</p>
                </div>
            </div>


        </div>
    );
};

export default ChatList;