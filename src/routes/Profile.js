import React from 'react'
import '../styles/profile.scss'
import { FaTimes, FaUser, FaComment, FaPen } from "react-icons/fa"
import Header from '../components/Header'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Profile() {

  const location = useLocation();
  // useLocation으로 전달받은 스테이트를 가져올수있다.
  const { pic, name, id } = location.state;

  const navigate = useNavigate();
  
  if (location.state === undefined) {
    navigate(-1); // 홈으로 이동 즉 리다이렉트가 가능하다
  }

  return (
    <div className='profile_wrap'>

      {/* < !--header --> */}
      <Header
        titleleft={<FaTimes />}
        titlename={" "}
        titleright={<FaUser />}
      />
      {/* <!-- //header --> */}
      < hr />
      {/* < !--main --> */}
      <main>
        <section className="background">
          <h2 className="blind">My profile background image</h2>
        </section>

        <section className="detail_profile" key={id}>
          <div className="detail_profile_img empty">
            <img src={pic} alt=" " />
          </div>
          <div className="detail_profile_cont">
            <span className="detail_profile_name">{name}</span>
            <input type="mail" className="profile_email" placeholder="userId@naver.com" />
            <ul className="detail_profile_menu">
              {/* <!-- my chatroom --> */}
              <li>
                <Link to='/chatting' state={{ name, pic, id }}>
                  <span className="icon">
                    <FaComment />
                  </span>
                  My Chatroom
                </Link>
              </li>
              {/* <!-- //my chatroom --> */}

              {/* <!-- Edit Profile --> */}
              <li>
                <a href="#">
                  <span className="icon">
                    <FaPen />
                  </span>
                  Eidt Profile
                </a>
              </li>
              {/* <!-- //Edit Profile --> */}
            </ul>

          </div>
        </section>
      </main>
      {/* <!-- //main --> */}

    </div>
  )
}

export default Profile

