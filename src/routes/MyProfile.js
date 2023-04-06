import React, { useEffect, useState } from 'react'
import '../styles/profile.scss'
import { FaTimes, FaPen } from "react-icons/fa"
import Header from '../components/Header'
import { IoCheckmarkSharp, IoCreateSharp } from "react-icons/io5";
import { db, storage } from "../fbase";
import "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';


function MyProfile({ userObj }) {

  const [editing, setEditing] = useState(false);
  const [editBg, setEditBg] = useState(false);
  const [newBg, setNewBg] = useState('');
  const [backgroundUrl, setBackgrounUrl] = useState('');

  const onProfileToggle = () => {
    setEditing((prev) => !prev)
  };

  const onBgToggle = () => {
    setEditBg((prev) => !prev)
  };

  const onBgChange = (e) => {

    console.log(e);
    const { target: { files } } = e;
    const theBg = files[0];

    const reader = new FileReader();

    reader.readAsDataURL(theBg);
    reader.onloadend = (finishedBg) => {
      const { currentTarget: { result } } = finishedBg;

      setNewBg(result);
    }

  };

  const onBgSubmit = async (e) => {
    e.preventDefault();

    try {
      let bgUrl = "";

      const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      //내 파이어베이스 스토리지에 uuidv4를 사용하여 랜덤한 경로를 생성
      const response = await uploadString(storageRef, newBg, 'data_url');
      console.log('response->', response);
      bgUrl = await getDownloadURL(ref(storage, response.ref));

      const docRef = await addDoc(collection(db, "profileImg"), {
        userId: userObj.uid,
        bgUrl,
        createdAt: Date.now(),
      });
      setNewBg('');
    } catch (error) {

      console.log("에러남");

    }
  }

  useEffect(() => {
    const q = query(collection(db, "profileImg"), orderBy("createdAt", "asc"));
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
    return () => unsubscribe();
  }, []);
  console.log(backgroundUrl);
  console.log(backgroundUrl);
  return (
    <div className='profile_wrap'>

      {/* < !--header --> */}
      <Header
        titleleft={<FaTimes />}
        titlename={" "}
        titleright={" "}
      />
      {/* <!-- //header --> */}
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
                <img src={userObj.photoURL} alt=" " />
                <button onClick={onBgToggle}><IoCreateSharp /></button>
              </div>






              <div className="detail_profile_cont">
                <span className="detail_profile_name">{userObj.displayName} <button><IoCreateSharp /></button></span>
                <span className='detail_profile_email'>이메일을 설정해주세요
                  <button><IoCreateSharp /></button>
                </span>




                <ul className="detail_profile_menu">
                  <li>
                    <a href="#">
                      <button className="profile_modify" onClick={onProfileToggle}>
                        <span className="icon">
                          <FaPen />
                        </span>
                        Done
                      </button>
                    </a>
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
                  <span className="detail_profile_name">{userObj.displayName}</span>
                  <input type="mail" className="profile_email" placeholder="userId@naver.com" />
                  <ul className="detail_profile_menu">
                    {/* <!-- Edit Profile --> */}
                    <li>
                      <a href="#">
                        <button onClick={onProfileToggle}>
                          <span className="icon">
                            <FaPen />
                          </span>
                          Eidt Profile
                        </button>
                      </a>
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