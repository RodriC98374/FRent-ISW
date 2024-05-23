import React from 'react'

export default function TopFriends({friends}) {
  return (
    <div>
        <div className="top-friends">
        {friends.map((friend, index) => (
            <div key={friend.id} className={`top-friend rank-${index + 1}`}>
              <div className="profile-picture">
                  <img src={friend.profile_picture} alt={`${friend.name}'s profile`} />
              </div>
              <div className="rank">{index + 1}</div>
              <div className="likes">{friend.likes} <span role="img" aria-label="heart">❤️</span></div>
            </div>
        ))}
        </div>
    </div>
  )
}
