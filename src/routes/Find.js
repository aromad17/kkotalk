import React from 'react'
import '../styles/find.scss'
import { FaFacebook, FaQrcode, FaMobileAlt, FaRegEnvelope } from "react-icons/fa";
import Nav from '../components/Nav';
import Header from '../components/Header';

function Find() {
  return (
    <div className='find_wrap'>
      <Header
        titleleft={"Edit"}
        titlename={"Find"}
        titleright={" "}
      />
      {/* <!-- header --> */}
      {/* <!-- //header --> */}
      <hr />
      {/* <!-- main --> */}
      <main>
        <ul className="find_method">
          <li><a href="#"><FaFacebook />Find</a></li>
          <li><a href="#"><FaQrcode />QR Code</a></li>
          <li><a href="#"><FaMobileAlt />Shake</a></li>
          <li><a href="#"><FaRegEnvelope />Invite via SMS</a></li>
        </ul>

        <section className="recommend_section">
          <div className='recommend_header'>
            <h2>Recommended Friends</h2>
          </div>
          <ul>
            <li>You Have no recommended</li>
          </ul>
        </section>
      </main>
      {/* <!-- //main --> */}
      <hr />
      {/* <!-- nav --> */}
      <Nav />
      {/* <!-- //nav --> */}

    </div >
  )
}

export default Find


