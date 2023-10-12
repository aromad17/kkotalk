import React from 'react'
import { Link } from 'react-router-dom';

function Users({ key, pic, name, msg, id, bg }) {
  return (
    <li key={key}>
      <Link to={'/profile'} state={{ pic, name, msg, id, bg }}>
        <span className="profile_img empty">

          <img src={pic} alt={pic} />

        </span>
        <span className="profile_name">{name}</span>
        <span className="profile_messages">{msg}</span>
      </Link>
    </li>

  )
}
export default Users;