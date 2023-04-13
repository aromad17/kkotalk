import React from 'react'
import '../styles/profile.scss'
import { FaTimes, FaUser } from "react-icons/fa"
import Header from '../components/Header'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Profile() {

  const location = useLocation();
  // useLocation으로 전달받은 스테이트를 가져올수있다.
  const { pic, name, id, bg, msg } = location.state;

  const navigate = useNavigate();
  if (location.state === undefined) {
    navigate(-1); // 홈으로 이동 즉 리다이렉트가 가능하다
  }
  const lastPage = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <div className='profile_wrap'>

      {/* < !--header --> */}
      <Header
        titleleft={<FaTimes />}
        titlename={" "}
        titleright={<FaUser />}
        lastPage={lastPage}
      />
      {/* <!-- //header --> */}
      < hr />
      {/* < !--main --> */}
      <main>
        <section className="background" style={{ backgroundImage: `url(${bg})` }}>
          <h2 className="blind">My profile background image</h2>
        </section>

        <section className="detail_profile" key={id}>
          <div className="detail_profile_img empty">
            <img src={pic} alt=" " />
          </div>
          <div className="detail_profile_cont">
            <span className="detail_profile_name">{name}</span>
            <span className='detail_profile_message'>
              {msg}
            </span>
            <ul className="detail_profile_menu">
              {/* <!-- my chatroom --> */}
              <li>
                <Link to='/chatting' state={{ name, pic, id, bg, msg }}>
                  <span className="icon">

                  </span>
                  채팅
                </Link>
              </li>
              {/* <!-- //my chatroom --> */}


            </ul>

          </div>
        </section>
      </main>
      {/* <!-- //main --> */}

    </div >
  )
}

export default Profile
