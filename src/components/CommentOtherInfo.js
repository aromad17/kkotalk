import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import user from '../data/user.json'

function Comment() {

  const location = useLocation();
  // useLocation으로 전달받은 스테이트를 가져올수있다.
  const { name, pic, bg, msg } = location.state;

  return (
    <div className="other_info">

      <Link to="/profile" state={{ name, pic, bg, msg }}>
        <span className="profile_img empty">
          <img src={pic} alt=" " />
        </span>
      </Link>




      <span className="profile_name">{name}</span>
    </div >
  )
}

export default Comment