import React from 'react'

function Comment({ comment }) {
  return (
    <>
      <span className="chat">{comment}</span>
      <span className="chat_time"><span>15</span>:<span>39</span></span>
    </>
  )
}

export default Comment