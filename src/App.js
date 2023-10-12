import React, { useEffect, useState } from 'react'
import AppRouter from "./components/AppRouter";
import { authService } from "./fbase"
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState('');
  useEffect(() => {

    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })

  })

  return (
    <>
      {init ? <AppRouter
        userObj={userObj}
        isLoggedIn={isLoggedIn} /> : "Loading...."}
    </>
  );
}

export default App;
