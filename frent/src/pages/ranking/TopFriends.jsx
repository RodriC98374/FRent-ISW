import React from 'react'
import { Link } from 'react-router-dom'

export default function TopFriends({friends}) {
  return (
    <div className='top-friends-section'>
        <div className="top-friends">
        {friends.map((friend, index) => (
            <div key={friend.id_user} className={`top-friend rank-${index + 1}`}>
              <div className="profile-picture">
                <Link to={`/profileFriend/${friend.id_user}`}>
                    <img src={`data:image/png;base64,${friend.image}`} alt={`${friend.first_name}'s profile`} />
                </Link>
              </div>
              <div className="rank">#{index + 1}</div>
              <div className="likes">{friend.like_count} <span role="img" aria-label="heart">❤️</span></div>
            </div>
        ))}
        </div>
    </div>
  )
}
