import React from 'react'
import { useState } from 'react'
import { authService } from '../fbase';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import "../styles/auth.scss"
import { FaGoogle, FaGithub, FaCat } from "react-icons/fa";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState('');


  const onChange = e => {
    // const {target:{name, value}} = e;

    // if(name === "email"){
    //   setEmail(value);
    // }else if(name === "password"){
    //   setPassword(value);
    // }
    if ("email" === e.target.name) {
      setEmail(e.target.value);
    } else if ("password" === e.target.name) {
      setPassword(e.target.value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        //create account
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        //login
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
      alert(error.message)
    }
  };


  const onSocial = async (e) => {
    const { target: { name } } = e;
    let provider;

    if (name === "google") {
      //구글눌렀을때
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      //깃헙눌렀을때
      provider = new GithubAuthProvider();
    }
    try {
      const data = await signInWithPopup(authService, provider);
      console.log("data->", data);
    } catch (error) {
      setError(error.message);
    }
  }

  const toggleAccount = () => setNewAccount(prev => !prev);


  return (
    <div className="auth_wrap">
      <h1 className='logo'>로고</h1>
      <h2>{newAccount ? "회원 가입" : "로그인"} </h2>
      <div className='auth_form'>
        <form onSubmit={onSubmit}>
          <input className="input_id" name="email" type="email" placeholder='E-mail' required value={email} onChange={onChange} />
          <input className="input_pw" autocomplete="current-password" name="password" type="password" placeholder='Password' required value={password} onChange={onChange} />
          <input className="input_submit" type="submit" value={newAccount ? "위 내용으로 회원가입" : "로그인"} />
          {error}
        </form>
        <div>
          <button className='google_btn' name='google' onClick={onSocial}><FaGoogle />Continue With GOOGLE Account</button>
          <button className='github_btn' name='github' onClick={onSocial}><FaGithub />Continue With GITHUB Account</button>
        </div>
        <span onClick={toggleAccount}>
          {newAccount ? "이미 계정이 있다면 클릭하여 로그인하기" : "계정이 없다면 클릭하여 회원가입"}
        </span>
      </div>
    </div>
  )
}

export default Auth