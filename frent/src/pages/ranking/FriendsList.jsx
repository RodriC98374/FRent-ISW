import React from 'react'

export default function FriendsList({friends}) {
  return (
    <div>
        <div className="friend-list">
        {friends.map(friend => (
            <div key={friend.id} className="friend-item">
            <div className="profile-picture">
                <img src={friend.profile_picture} alt={`${friend.name}'s profile`} />
            </div>
            <div className="friend-info">
                <div className="friend-name">{friend.name}</div>
                <div className="friend-likes">{friend.likes} <span role="img" aria-label="heart">❤️</span></div>
            </div>
            </div>
        ))}
        </div>
    </div>
  )
}
