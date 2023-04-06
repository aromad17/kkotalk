import React from 'react'
import { Link } from 'react-router-dom'

function Chatfriend({ name, title, pic }) {

  return (
    <li>
      <Link to={'/chatting'} href="#" state={{ name, pic }}>
        <span className="chats_img empty">
          <img src={pic} alt={title} />
        </span>
        <span className="chats_cont">
          <span className="chats_name">{name}</span>
          <span className="chats_latest">{title}</span>
        </span>
        <span className="chats_time"><span>17</span>:<span>35</span></span>
      </Link>
    </li>
  )
}

export default Chatfriend