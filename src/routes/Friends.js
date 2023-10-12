import React, { useEffect, useState } from 'react'
import user from '../data/user.json'
import '../styles/friends.scss'
import Users from '../components/Users'
import { FaSearch, FaSlidersH } from "react-icons/fa"
import Header from '../components/Header'
import Nav from '../components/Nav'
import My from '../components/My'
import { useNavigate } from 'react-router-dom'
function Friends({ userObj }) {

  const [friendsCount, setFriendsCount] = useState(0);

  const navigate = useNavigate();



  useEffect(() => {
    const count = document.querySelectorAll(".friends_list li").length;
    setFriendsCount(count);
  }, []);


  return (
    <div className='friends_wrap'>
      <Header
        titleleft={"Manage"}
        titlename={"Friends"}
        titleright={<FaSlidersH />}
        friendsCount={friendsCount}
      />


      <main>


        {/* <!-- search box--> */}
        <form className="search_box" action="">
          <fieldset className="search_inner">
            <legend className="blind">검색창</legend>
            <FaSearch />
            <input type="search" name="search" id="search" placeholder="Find Friends, chats, Plus Friends, ..." />
          </fieldset>
        </form>
        {/* <!-- //search box--> */}

        {/* <!-- main_section --> */}
        <section className="main_section">
          <div className="section_header" >
            <h2>My Profile</h2>
          </div>
          <ul>

            <My userObj={userObj} />

          </ul>
        </section>



        <section className="main_section">
          <div className="section_header" >
            <h2>Friends</h2>
          </div>
          <ul className='friends_list'>
            {user.Friends.map((users1, idx) => (
              <Users
                key={idx}
                name={users1.name}
                pic={users1.img}
                msg={users1.message}
                bg={users1.bg}
              />
            ))
            }
          </ul>
        </section>
        {/* <!--// main_section --> */}


      </main>
      <Nav />
    </div>
  )
}

export default Friends