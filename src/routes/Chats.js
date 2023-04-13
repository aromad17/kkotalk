import React from 'react'
import '../styles/chats.scss'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Chatfriend from '../components/Chatfriend';
import user from '../data/user.json';
import { FaSearch, FaCommentDots } from "react-icons/fa"
import Header from '../components/Header';
import Nav from '../components/Nav';
import { useLocation } from 'react-router-dom';

function Chats({ userObj }) {

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    getFriends();
  }, [])

  const getFriends = async () => {
    const { data: friends } = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
    setFriends(friends);
  }

  return (
    <div className='chats_wrap'>
      <Header
        titleleft={"Edit"}
        titlename={"Chats"}
        titleright={" "}
      />
      {/* < !--header --> */}

      < hr />
      {/* < !--main --> */}
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
          <ul>
            {user.Friends.map((user, idx) =>
              <Chatfriend
                key={idx}
                name={user.name}
                title={user.message}
                pic={user.img}
                bg={user.bg}
                msg={user.message}
                userObj={userObj}
              />
            )}
          </ul>
        </section>
        {/* <!--// main_section --> */}

        {/* <!-- floating btn --> */}
        <div className="chat_fa_btn">
          <a href="#">
            <FaCommentDots />
          </a>
        </div>
        {/* <!-- //floating btn --> */}
      </main>
      {/* <!-- //main --> */}
      < hr />
      {/* < !--nav --> */}
      <Nav />
      {/* <!-- //nav --> */}

    </div>
  )
}

export default Chats













