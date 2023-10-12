import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../fbase';

function ChatTime({ name, userObj }) {

  const [lastChatTime, setLastChatTime] = useState('');
  const [nowDate, setNowDate] = useState(lastChatTime);


  useEffect(() => {
    const q = query(collection(db, "talks"), where("userName.name", "==", name), where("userId", "==", userObj.uid), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push(doc.data().createdAt);
      });

      setLastChatTime(newArray[newArray.length - 1] || '');
    });

    let timeStamp = lastChatTime;
    const now = new Date(timeStamp);
    setNowDate(now.toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul', hour12: false, hour: '2-digit', minute: '2-digit' }));


    return () => unsubscribe(); // cleanup 함수
  }, [name, lastChatTime]);


  return (
    <span className="chats_time">{nowDate === "Invalid Date" ?
      " " : nowDate
    }</span>

  )
}

export default ChatTime