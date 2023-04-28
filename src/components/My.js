import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from "../fbase";
import { useState } from 'react';
function My({ userObj }) {
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const m = query(collection(db, "message"), where("userId", "==", userObj.uid), orderBy("createdAt", "asc"));

    const messageUnsubscribe = onSnapshot(m, (querySnapshot) => {
      const messageArray = [];
      querySnapshot.forEach((doc) => {
        messageArray.push({ id: doc.id, ...doc.data() });
      });
      if (messageArray.length > 0) { // 배열이 비어있는 경우 체크
        const lastMessage = messageArray[messageArray.length - 1].statusMessage;
        console.log(lastMessage)
        setNewMessage(lastMessage);
      } else {
        setNewMessage(""); // 비어있는 경우 빈 문자열("")을 상태값으로 설정
      }
    });

    return messageUnsubscribe;


  }, [])



  return (
    <li>
      <Link to={'/myprofile'}>
        <span className="profile_img empty">
          {userObj.photoURL ? 
          <img src={userObj.photoURL} alt="내 프로필 이미지" />
            :
           " "
          }
        </span>

        <span className="profile_name">
          {userObj.displayName ?
            userObj.displayName
            : "나"
          }
        </span>




        <span className="profile_messages">
          {newMessage ?

            <span>{newMessage}</span>
            :
            <span>상태메시지를 설정해주세요.</span>
          }

        </span>
      </Link>
    </li>

  )
}

export default My