import React from 'react'
import { Link } from 'react-router-dom'

function My({ userObj }) {
  return (
    <li>
      <Link to={'/myprofile'}>
        <span className="profile_img empty">
          <img src={userObj.photoURL} alt="내 프로필 이미지" />
        </span>
        <span className="profile_name">{userObj.displayName}</span>
      </Link>
    </li>

  )
}

export default My