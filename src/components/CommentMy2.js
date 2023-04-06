import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useState } from 'react'
import { IoTrashSharp,IoCreateSharp } from "react-icons/io5";
import { db, storage } from '../fbase';


function CommentMy2(props) {

  const [editing,setEditing] = useState(false);
  const [editTalk, setEditTalk] = useState('');
  const { addChat: { chat, postUrl, id } } = props;


  const onPicDelete = async (e) => {
    const deleteCofim = window.confirm("삭제하시겠습니까?");

    if (deleteCofim) {
      await deleteDoc(doc(db, "talks", `/${id}`));
      const desertRef = ref(storage, postUrl);
      await deleteObject(desertRef);
    }
  }

  const toggleEditing= () =>  setEditing((prev) => !prev);

  const chatBtns = document.querySelectorAll(".my_chat_box>button");

  // const onMouseEnter = () => {
  //   for(let el of chatBtns){
  //     el.style.display = "block";
  //   }
  // }

  // const onMouseLeave = () => {
  //   for(let el of chatBtns){
  //     el.style.display = "none";
  //   }
  // }

  const onChange = (e) => {
    const {target:{value}} = e;
    setEditTalk(value)
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    const updateTalkRef = doc(db, "talks", `${id}`);
    await updateDoc(updateTalkRef, {
      text: editTalk,
      createdAt: Date.now(),
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
            <input type='submit' value='edit confirm' onClick={onSubmit}/>
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <div className='my_chat_box'>
          <button onClick={toggleEditing}><IoCreateSharp /></button>
          <button onClick={onPicDelete}><IoTrashSharp /></button>
          <span className="chat">{chat}</span>
        </div>
      )
    )}
  
    {postUrl && (
      <div className="img_box">
        <button onClick={onPicDelete}><IoTrashSharp /></button>
        <img src={postUrl} alt='' />
      </div>
    )}
  </>
  
  )
}

export default CommentMy2