import React from 'react'
import { FaPlane, FaBluetoothB, FaWifi, FaBatteryThreeQuarters, FaEllipsisH } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
import '../styles/header.scss'
import { authService } from '../fbase';

function Header({ titlename, titleleft, titleright }) {


  return (
    <header>
      <div className="status_bar">
        <div className="left_item">
          <FaPlane />
          <FaWifi />
        </div>
        <div className="center_item"><span>15</span>:<span>33</span></div>
        <div className="right_item">
          <FaBluetoothB />
          <span>100%</span>
          <FaBatteryThreeQuarters />
        </div>
      </div>
      <div className="title_bar">
        <h1>{titlename}</h1>
        <div className="left_item"><Link to="/">{titleleft}</Link></div>
        <div className="right_item"><a href="#">{titleright}</a></div>
      </div>
    </header >
  )
}

export default Header