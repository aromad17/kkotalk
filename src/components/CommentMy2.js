import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { IoTrashSharp, IoCreateSharp } from "react-icons/io5";
import { db, storage } from '../fbase';


function CommentMy2(props) {

  const [editing, setEditing] = useState(false);
  const [editTalk, setEditTalk] = useState('');
  const { addChat: { chat, postUrl, id, createdAt } } = props;
  const [nowDate, setNowDate] = useState(createdAt);

  const onPicDelete = async (e) => {
    const deleteCofim = window.confirm("삭제하시겠습니까?");

    if (deleteCofim) {
      await deleteDoc(doc(db, "talks", `/${id}`));
      const desertRef = ref(storage, postUrl);
      await deleteObject(desertRef);
    }
  }

  const toggleEditing = () => setEditing((prev) => !prev);

  const chatBtns = document.querySelectorAll(".my_chat_box>button");

  useEffect(() => {
    let timeStamp = createdAt;
    const now = new Date(timeStamp);
    setNowDate(now.toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul', hour12: false, hour: '2-digit', minute: '2-digit' }));
  }, [createdAt])

  const onChange = (e) => {
    const { target: { value } } = e;
    setEditTalk(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const updateTalkRef = doc(db, "talks", `${id}`);
    await updateDoc(updateTalkRef, {
      chat: editTalk
    })
    setEditing(false)
  }


  return (
    <>
      {chat && (
        editing ? (
          <>
            <form>
              <input type="text" onChange={onChange} name="edit" value={editTalk} required />
              <input type='submit' value='edit confirm' onClick={onSubmit} />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
          </>
        ) : (
          <div className='my_chat_box'>
            <button onClick={toggleEditing}><IoCreateSharp /></button>
            <button onClick={onPicDelete}><IoTrashSharp /></button>
            <span className="chat">{chat}</span>
            <span className="chat_time">{nowDate}</span>
          </div>
        )
      )}

      {postUrl && (
        <div className="img_box">
          <button onClick={onPicDelete}><IoTrashSharp /></button>
          <img src={postUrl} alt=' ' />

        </div>
      )}

    </>

  )
}

export default CommentMy2