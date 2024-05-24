import React from 'react'

export default function FriendsList({friends}) {
  return (
    <div>
        <div className="friend-list">
        {friends.map(friend => (
            <div key={friend.id_user} className="friend-item">
            <div className="profile-picture">
                <img src={`data:image/png;base64,${friend.image}`} alt={`${friend.first_name}'s profile`} />
            </div>
            <div className="friend-info">
                <div className="friend-name">{friend.first_name} {friend.last_name}</div>
                <div className="friend-likes">{friend.like_count} <span role="img" aria-label="heart">❤️</span></div>
            </div>
            </div>
        ))}
        </div>
    </div>
  )
}
