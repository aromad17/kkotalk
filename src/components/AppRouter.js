import React from 'react'
import { BrowserRouter, HashRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from '../routes/Auth';
import Friends from '../routes/Friends';
import Chats from '../routes/Chats';
import Find from '../routes/Find';
import More from '../routes/More';
import Profile from '../routes/Profile';
import Chatting from './Chatting';
import MyProfile from '../routes/MyProfile';
import MyGallery from './MyGallery';


function AppRouter({ isLoggedIn, userObj }) {

  return (

    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {isLoggedIn ? (
          <Route path='/' element={<Friends userObj={userObj} />} />
        ) : (
          <Route path='/' element={<Auth />} />
        )}
        <Route path="/chats" element={<Chats userObj={userObj} />} />
        <Route path="/find" element={<Find />} />
        <Route path="/more" element={<More userObj={userObj} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chatting" element={<Chatting userObj={userObj} />} />
        <Route path="/myprofile" element={<MyProfile userObj={userObj} />} />
        <Route path="/gallery" element={<MyGallery userObj={userObj} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

