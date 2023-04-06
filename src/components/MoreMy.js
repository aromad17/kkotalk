import React from 'react'

function MoreMy({ pic, name, email }) {
  return (
    <div className='moreMy'>
      <span className="profile_img empty">
        <img src={pic} alt="" />
      </span>
      <span className="profile_info">
        <span className="profile_name">{name}</span>
        <span className="profile_email">{email}</span>
      </span>
    </div>
  )
}

export default MoreMy