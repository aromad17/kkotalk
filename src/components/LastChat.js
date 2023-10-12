import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../fbase';
import { FaCameraRetro } from "react-icons/fa";

function LastChat({ name, userObj }) {

  const [lastChat, setLastChat] = useState('');
  const [lastPic, setLastPic] = useState('');


  useEffect(() => {
    const q = query(collection(db, "talks"), where("userName.name", "==", name), where("userId", "==", userObj.uid), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      const picArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push(doc.data().chat);
        picArray.push(doc.data().postUrl);
      });

      setLastChat(newArray[newArray.length - 1] || '');
      setLastPic(picArray[picArray.length - 1] || '');
    });

    return () => unsubscribe(); // cleanup 함수
  }, [name, lastPic, lastChat]);

  console.log(lastPic);



  console.log(lastChat)

  return (
    <span className="chats_latest">
      {lastPic ? <> <FaCameraRetro />&nbsp;사진 </> : lastChat}
    </span>
  )
}

export default LastChat