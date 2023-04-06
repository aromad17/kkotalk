import React from 'react'
import { Link } from 'react-router-dom';

function Users({ key, pic, name, msg, id }) {
  return (
    <li key={key}>
      <Link to={'/profile'} state={{ pic, name, msg, id }}>
        <span className="profile_img empty">

          <img src={pic} alt={pic} />

        </span>
        <span className="profile_name">{name}</span>
        <span className="profile_messages">{msg}</span>
      </Link>
    </li>

    // <>
    //   <h1>No. {id}</h1>
    //   <h2>Name : {name}</h2>
    //   <img src={images} alt={name} />
    // </>
  )
}
export default Users;