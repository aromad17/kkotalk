import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../fbase';
import Header from './Header'
import '../styles/mygallery.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa"

function MyGallery({userObj}) {

  const [photoList, setPhotList] = useState([]);

  const navigate = useNavigate();

  const lastPage = (e) => {
    e.preventDefault();
    navigate(-1);
  }
  useEffect(() => {
    const q = query(collection(db, "profileImg"), where("userId", "==", userObj.uid), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const profileImgs = [];
      querySnapshot.forEach((doc) => {
        profileImgs.push({ id: doc.id, ...doc.data() });
        setPhotList(profileImgs);
      });
    });
  }, [])

  return (
    <>
      <Header
        titleleft={<FaAngleLeft />}
        titlename={"My Gallery"}
        titleright={" "}
        lastPage={lastPage}
      />

      <div className='gallery_wrap'>


        {photoList.map((item, idx) => (

          <div className='gallery_frame'>
            <span className='gallery_name'>나의 배경 사진</span>
            <div className='gallery_cont'>

              <span className='gallery_time' key={idx}>
                {item.nowDate.year}년 {item.nowDate.month}월 {item.nowDate.date}일
              </span>
              <div className='gallery_bg'>
                <img key={idx} src={item.bgUrl} alt="" />
              </div>

            </div>

          </div>
        ))}
      </div>
    </>
  )
}

export default MyGallery