
import { Link } from 'react-router-dom'
import LastChat from './LastChat';
import ChatTime from './ChatTime';

function Chatfriend({ name, title, pic, bg, msg, userObj }) {



  return (
    <li>
      <Link to={'/chatting'} state={{ name, pic, bg, msg }}>
        <span className="chats_img empty">
          <img src={pic} alt={title} />
        </span>
        <span className="chats_cont">
          <span className="chats_name">{name}</span>
          <LastChat
            name={name}
            userObj={userObj}
          />

        </span>
        <ChatTime
          name={name}
          userObj={userObj}
        />
      </Link>
    </li>
  )
}

export default Chatfriend