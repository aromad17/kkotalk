import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import '../styles/chatting.scss'
import Header from './Header'
import Nav from './Nav'
import CommentMy from './CommentMy'
import CommentOtherInfo from './CommentOtherInfo'
import CommentOtherChat from './CommentOtherChat'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaSmile, FaMicrophone, FaPlusSquare } from "react-icons/fa"
import { GrSend } from "react-icons/gr";
import { collection, addDoc, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { db, storage } from '../fbase';
import CommentMy2 from './CommentMy2';
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';



function Chatting({ userObj }) {

  const navigate = useNavigate();

  const lastPage = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  const [Comments, setComments] = useState([]);
  const [chat, setChat] = useState('');
  const [chats, setChats] = useState([]);
  const [post, setPost] = useState('');


  useEffect(() => {
    
    getComments();
    const q = query(collection(db, "talks"), where("userName.name", "==", name), where("userId", "==", userObj.uid), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ id: doc.id, ...doc.data() });
      });
      setChats(newArray);
    });
    
  
    return () => {
      unsubscribe();
    };
  }, []);
  



  const getComments = async () => {
    const { data: comment } = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=3');
    setComments(comment);
  }

  const location = useLocation();
  // useLocation으로 전달받은 스테이트를 가져올수있다.
  const { name, pic, bg, msg } = location.state;

  const onChange = (e) => {
    const { target: { value } } = e;
    setChat(value);
  }



  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "talks"), {
        userName: { name },
        chat,
        createdAt: Date.now(),
        userId: userObj.uid
      });
      setChat('');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const previewBg = document.querySelector(".preview_bg");

  const sendImg = (e) => {
    e.preventDefault();
    previewBg.style.display = "block";
  }

  const goBack = () => {
    previewBg.style.display = "none";
  }

  const onFileChange = (e) => {
    const { target: { files } } = e;
    const postedImg = files[0];
    const reader = new FileReader();

    reader.readAsDataURL(postedImg);
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result } } = finishedEvent;
      setPost(result);
    }
  }

  const onSend = async (e) => {
    e.preventDefault();
    try {
      let postUrl = "";
      if (post !== "") {
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        //내 파이어베이스 스토리지에 uuidv4를 사용하여 랜덤한 경로를 생성
        const response = await uploadString(storageRef, post, 'data_url');
        console.log('response->', response);
        postUrl = await getDownloadURL(ref(storage, response.ref))
      }
      const docRef = await addDoc(collection(db, "talks"), {
        userName: { name },
        createdAt: Date.now(),
        creatorId: userObj.uid,
        postUrl,
        userId: userObj.uid
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setPost('');
    goBack();
  }

  return (
    <div className='chatting'>
      <div className='preview_bg'>
        <form>
          <input type='file' accept='images/*' onChange={onFileChange} />
          {post &&
            <img src={post} alt="" width="200" height="180" />
          }
          <input type="submit" className='pic_back_btn' onClick={onSend} value="전송" />
          <div className='pic_send_btn' onClick={goBack}>닫기</div>
        </form>

      </div>
      <Header
        titleleft={<FaChevronLeft />}
        titlename={name}
        titleright={" "}
        lastPage={lastPage}
      />

      <hr />
      {/* <!-- main --> */}
      <main>



        <span className="date_info">Thursday,March 23,2023</span>

        {/* <!-- my --> */}
        <div className="chat_box my">
          {Comments.map((comment, idx) =>
            <CommentMy
              key={idx}
              comment={comment.name}
            />
          )}

          <span className="chat_time"><span>15</span>:<span>39</span></span>
        </div>

        <div className="chat_box other">

          <CommentOtherInfo state={{ name, pic, bg, msg }}
          />

          {Comments.map((comment, idx) =>
            <CommentOtherChat
              key={idx}
              comment={comment.name}
            />
          )}
          <span className="chat_time"><span>15</span>:<span>39</span></span>
        </div>


        {/* <!-- my --> */}
        <div className="chat_box my">
          {chats.map((chat, idx) =>
            <CommentMy2
              key={idx}
              addChat={chat}
            />
          )}


        </div>



        {/* <!--// my --> */}
      </main >
      {/* <!-- //main --> */}
      < hr />

      <footer>
        <span className="plus_btn"><a href="#" onClick={sendImg}><FaPlusSquare /></a></span>
        <form action="" method="post">
          <fieldset className="text_box">
            <legend className="blind">채팅 입력창</legend>
            <label htmlFor="chatting_input" className="blind">채팅입력</label>
            <input type="text" id="chatting_input" className="text_field"
              value={chat}
              onChange={onChange}
            />
            <span className="emoticon_btn"><a href="#"><FaSmile /><FaMicrophone /></a></span>
            <button className="send_btn" onClick={onSubmit}><GrSend /></button>
          </fieldset>
        </form>
      </footer>

      <Nav />
    </div >
  )
}

export default Chatting




