import React from 'react'

function MoreMy({ userObj }) {

  console.log(userObj)

  return (
    <div className='moreMy'>
      <span className="profile_img empty">

        <img src={userObj.photoURL} alt="" />
      </span>
      <span className="profile_info">
        {userObj.displayName ?
          <span className="profile_name">{userObj.displayName}</span>
          : "나"
        }
        <span className="profile_email">aromad1117@naver.com</span>
      </span>
    </div>
  )
}

export default MoreMy