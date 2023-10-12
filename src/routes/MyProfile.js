import React, { useEffect, useState } from 'react'
import '../styles/profile.scss'
import { FaTimes, FaPen, FaIdBadge } from "react-icons/fa"
import Header from '../components/Header'
import { IoCheckmarkSharp, IoCreateSharp } from "react-icons/io5";
import { db, storage } from "../fbase";
import "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { updateProfile } from "@firebase/auth";
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { addDoc, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';


function MyProfile({ userObj }) {

  const [editing, setEditing] = useState(false);
  const [editBg, setEditBg] = useState(false);
  const [editPhoto, setEditPhoto] = useState(false);
  const [newBg, setNewBg] = useState("");
  const [newPhoto, setNewPhoto] = useState("");
  const [backgroundUrl, setBackgrounUrl] = useState("");
  const [nameEdit, setNameEdit] = useState(false);
  const [newName, setNewName] = useState("")
  const [MessageEdit, setMessageEdit] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  const lastPage = (e) => {
    e.preventDefault();
    navigate(-1);
  }



  const onProfileToggle = () => {
    setEditing((prev) => !prev)
  };

  const onBgToggle = (e) => {
    e.preventDefault();
    setEditBg((prev) => !prev)
  };

  const onPhotoEdit = (e) => {
    e.preventDefault();
    setEditPhoto((prev) => !prev)
  };

  const onNameToggle = (e) => {
    e.preventDefault();
    setNameEdit((prev) => !prev)
  };

  const onMessageToggle = (e) => {
    e.preventDefault();
    setMessageEdit((prev) => !prev)
  };

  let myPhotoUrl = "";
  const onPhotoChange = async (e) => {
    e.preventDefault();
    try {
      const { target: { files } } = e;
      const thePhoto = files[0];
      const reader = new FileReader();

      reader.readAsDataURL(thePhoto);

      reader.onloadend = (finishedPhoto) => {
        const { currentTarget: { result } } = finishedPhoto;
        setNewPhoto(result);
        console.log(newPhoto)
      }
    } catch (error) {
      console.log(error)
    }
  };


  const onPhotoSubmit = async (e) => {
    e.preventDefault();
    try {
      let myPhotoUrl = "";

      const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, newPhoto, 'data_url');
      console.log("response->", response)
      myPhotoUrl = await getDownloadURL(ref(storage, response.ref));

      await updateProfile(userObj, {
        photoURL: myPhotoUrl,//!== "" ? myPicUrl : userObj.photoURL,
      });

    } catch (error) {
      console.log(error)
    }


    setEditPhoto((prev) => !prev)

  }




  const onBgChange = (e) => {
    e.preventDefault();

    const { target: { files } } = e;
    const theBg = files[0];

    const reader = new FileReader();

    reader.readAsDataURL(theBg);
    reader.onloadend = (finishedBg) => {
      const { currentTarget: { result } } = finishedBg;
      setNewBg(result);
    }
    console.log("newphoto->", newBg);
  };

  const onBgSubmit = async (e) => {

    e.preventDefault();

    try {

      const now = new Date(); // 현재 시간 가져오기
      const year = now.getFullYear(); // 연도
      const month = now.getMonth() + 1; // 월
      const date = now.getDate(); // 일

      let bgUrl = "";
      const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      //내 파이어베이스 스토리지에 uuidv4를 사용하여 랜덤한 경로를 생성
      const response = await uploadString(storageRef, newBg, 'data_url');

      bgUrl = await getDownloadURL(ref(storage, response.ref));

      const docRef = await addDoc(collection(db, "profileImg"), {
        userId: userObj.uid,
        bgUrl,
        createdAt: Date.now(),
        nowDate: {
          year,
          month,
          date,
        },
      });
      setNewBg('');
    } catch (error) {

      console.log("에러남");

    }
  }

  const onNameChange = (e) => {
    e.preventDefault()
    const { target: { value } } = e;
    setNewName(value);
    console.log(newName);
  }

  const onNameSubmit = async (e) => {
    e.preventDefault();

    await updateProfile(userObj, {
      displayName: newName,
    });
    setNameEdit((prev) => !prev)
    setNewName('');
  }


  const onMessageChange = (e) => {
    e.preventDefault();
    const { target: { value } } = e;
    setNewMessage(value);
    console.log(newMessage);
  }


  const onMessageSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "message"), {
        userId: userObj.uid,
        statusMessage: newMessage,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.log("에러남");
    }
    setMessageEdit((prev) => !prev)
  }






  useEffect(() => {
    const q = query(collection(db, "profileImg"), where("userId", "==", userObj.uid), orderBy("createdAt", "asc"));

    const m = query(collection(db, "message"), where("userId", "==", userObj.uid), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ id: doc.id, ...doc.data() });
      });
      if (newArray.length > 0) { // 배열이 비어있는 경우 체크
        const lastBackgroundUrl = newArray[newArray.length - 1].bgUrl;
        setBackgrounUrl(lastBackgroundUrl);
      } else {
        setBackgrounUrl(""); // 비어있는 경우 빈 문자열("")을 상태값으로 설정
      }

    });

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




  }, []);

  console.log(newMessage.statusMessage);

  return (
    <div className='profile_wrap'>

      <Header
        titleleft={<FaTimes />}
        titlename={" "}
        titleright={(
          <Link
            to={{
              pathname: '/gallery',
            }}
          >
            <FaIdBadge />
          </Link>
        )}
        lastPage={lastPage}
      />
      < hr />
      {/* < !--main --> */}
      <main>

        {editing ? (
          <form>
            <section className="background">
              <h2 className="blind">My profile background image</h2>

              <>
                {backgroundUrl && <img src={backgroundUrl} alt="background" />}
                {!backgroundUrl && <></>}
              </>



              {editBg ? (
                <>
                  <div className='edit_bg'>
                    <label for="bgChanger">이미지 선택</label>
                    <input type='file' id="bgChanger" accept='image/*' onChange={onBgChange} />
                    {newBg &&
                      (
                        <>
                          <img src={newBg} alt="" />
                          <button onClick={onBgSubmit}><IoCheckmarkSharp /></button>
                        </>
                      )
                    }

                  </div>

                  <button onClick={onBgToggle}>
                    <IoCreateSharp />
                  </button>

                </>
              ) : (
                <></>
              )
              }
              <button onClick={onBgToggle}><IoCreateSharp /></button>
            </section>

            <section className="detail_profile">
              <div className="detail_profile_img empty">
                {editPhoto ?
                  <>
                    <div className='photo_bg'>
                      <div className='photo_cover'></div>
                      <label htmlFor="photo">이미지 변경</label>
                      <input type='file' accept='image/*' id="photo" onChange={onPhotoChange} />
                      {newPhoto ? <img src={newPhoto} alt='' /> : <img src={userObj.photoURL} />}
                      <button onClick={onPhotoSubmit}><IoCheckmarkSharp /></button>
                    </div>
                  </>

                  : <>
                    <img src={userObj.photoURL} alt=" " /><button onClick={onPhotoEdit}><IoCreateSharp /></button>
                  </>}





              </div>






              <div className="detail_profile_cont">
                {nameEdit ?
                  <>
                    <div className='edit_name'>
                      <input type="text" placeholder="새 이름을 입력해주세요" value={newName} onChange={onNameChange} />
                      <button onClick={onNameSubmit}><IoCheckmarkSharp /></button>
                    </div>
                  </>
                  :
                  <>
                    <span className="detail_profile_name">{userObj.displayName ?
                      userObj.displayName
                      : "나"
                    }
                      <button onClick={onNameToggle}><IoCreateSharp /></button>
                    </span>
                  </>

                }

                {MessageEdit ?
                  <div className='message_wrap'>
                    <input type='text' placeholder='상태메시지를 입력해주세요.' onChange={onMessageChange} value={newMessage} className='detail_profile_message' />
                    <button onClick={onMessageSubmit}><IoCheckmarkSharp /></button>
                  </div>

                  :

                  <span className='detail_profile_message'>
                    {newMessage ?

                      <span>{newMessage}</span>
                      :
                      <span>상태메시지를 설정해주세요.</span>
                    }
                    <button onClick={onMessageToggle}><IoCreateSharp /></button>
                  </span>

                }



                <ul className="detail_profile_menu">
                  <li>
                    <Link href="#">
                      <button className="profile_modify" onClick={onProfileToggle}>
                        <span className="modify_icon">

                        </span>
                        적용
                      </button>
                    </Link>
                  </li>
                  {/* <!-- //Edit Profile --> */}
                </ul>
              </div>
            </section>
          </form>
        )

































          :
          (
            <>
              <section className="background">
                {backgroundUrl !== "" ? (
                  <img src={backgroundUrl} alt='' />
                ) : (
                  <>
                  </>
                )
                }
                <h2 className="blind">My profile background image</h2>
              </section>
              <section className="detail_profile">
                <div className="detail_profile_img empty">
                  <img src={userObj.photoURL} alt=" " />
                </div>
                <div className="detail_profile_cont">
                  <span className="detail_profile_name">{userObj.displayName ?
                    userObj.displayName : "나"
                  }</span>
                  <span className='detail_profile_message'>
                    {newMessage ?

                      <span>{newMessage}</span>
                      :
                      <span>상태메시지를 설정해주세요.</span>
                    }
                  </span>
                  <ul className="detail_profile_menu">
                    {/* <!-- Edit Profile --> */}
                    <li>
                      <Link href="#">
                        <button onClick={onProfileToggle}>
                          <span className="modify_icon">

                          </span>
                          프로필 수정
                        </button>
                      </Link>
                    </li>
                    {/* <!-- //Edit Profile --> */}
                  </ul>
                </div>
              </section>
            </>
          )


        }

      </main>
      {/* <!-- //main --> */}

    </div >
  )
}

export default MyProfile