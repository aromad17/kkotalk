import React from 'react'
import '../styles/more.scss'
import { FaComment, FaSmile, FaPaintBrush, FaHandHoldingHeart, FaUserCircle, FaUtensils, FaWarehouse, FaTv, FaPencilAlt, FaGraduationCap, FaRegBuilding, FaWonSign, FaVideo, FaInfoCircle, FaSlidersH, FaSignOutAlt } from "react-icons/fa";
import Nav from '../components/Nav';
import Header from '../components/Header';
import user from '../data/user.json';
import MoreMy from '../components/MoreMy';
import { useNavigate } from 'react-router-dom';
import { authService } from '../fbase';


function More({ userObj }) {

  const navigate = useNavigate();

  const onLogOut = (e) => {

    authService.signOut();
    navigate('/');
  }


  return (
    <div className='more_wrap'>
      <Header
        titleleft={" "}
        titlename={"More"}
        titleright={<FaSlidersH />}
      />
      {/* <!-- header --> */}

      {/* <!-- //header --> */}
      <hr />
      {/* <!-- main --> */}
      <main>
        {/* <!-- user_info --> */}
        <section className="user_info">
          <h2 className="blind">사용자정보</h2>

          <MoreMy userObj={userObj} />

          <span className="chat_img" onClick={onLogOut}><a href="#"><FaSignOutAlt /></a></span>
        </section>
        {/* <!-- //user_info --> */}

        {/* <!-- user_menu --> */}
        <section className="user_menu">
          <h2 className="blind">사용자 메뉴</h2>
          <ul>
            <li><a href="#"><FaSmile />Emoticon</a></li>
            <li><a href="#"><FaPaintBrush />Theme</a></li>
            <li><a href="#"><FaHandHoldingHeart />Plus Friend</a></li>
            <li><a href="#"><FaUserCircle />Account</a></li>
          </ul>
        </section>
        {/* <!-- //user_menu --> */}

        {/* <!-- plus Friends --> */}
        <section className="plus_friends">
          <div className="more_header">
            <h2>Plus Friends</h2>
            <span><FaInfoCircle />Learn More</span>
          </div>

          <ul className="plus_list">
            <li><a href="#"><FaUtensils />order</a></li>
            <li><a href="#"><FaWarehouse />store</a></li>
            <li><a href="#"><FaTv />TV Channel/Radio</a></li>
            <li><a href="#"><FaPencilAlt />Creation</a></li>
            <li><a href="#"><FaGraduationCap />Education</a></li>
            <li><a href="#"><FaRegBuilding />Politices/Society</a></li>
            <li><a href="#"><FaWonSign />Finance</a></li>
            <li><a href="#"><FaVideo />Movies/Music</a></li>
          </ul>

        </section>
        {/* <!-- //plus Friends --> */}

        {/* <!-- more app --> */}
        <section className="more_app">
          <h2 className="blind">앱 더보기</h2>
          <ul>
            <li><a href="#"><span className="app_icon"></span>Kakao Story</a></li>
            <li><a href="#"><span className="app_icon"></span></a>Path</li>
            <li><a href="#"><span className="app_icon"></span></a>Kakao friends</li>
          </ul>
        </section>
        {/* <!-- //more app --> */}
      </main>
      {/* <!-- //main --> */}
      <hr />
      {/* <!-- nav --> */}
      <Nav />
      {/* <!-- //nav --> */}
    </div >
  )
}

export default More


