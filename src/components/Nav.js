import React from 'react'
import '../styles/tab.scss'
import { FaUserAlt, FaComment, FaSearch, FaEllipsisH } from "react-icons/fa";
import { Link } from 'react-router-dom';


function Nav() {
  return (

    <nav className="tab_bar">
      <ul>
        <li><Link to="/"><FaUserAlt />Friends</Link></li>
        <li><Link to="/chats"><FaComment />Chats</Link></li>
        <li><Link to="/find"><FaSearch />Find</Link></li>
        <li><Link to="/more"><FaEllipsisH />More</Link></li>
      </ul>
    </nav>
  );
}

// function Nav() {
//   return (

//     <nav class="tab_bar">
//       <ul>
//         <li><a href="index.html"><FaUserAlt />Friends</a></li>
//         <li><a href="chats.html"><FaComment />Chats</a></li>
//         <li><a href="find.html"><FaSearch />Find</a></li>
//         <li><a href="more.html"><FaEllipsisH />More</a></li>
//       </ul>
//     </nav >
//   )
// }

export default Nav



