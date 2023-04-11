
import { Link } from 'react-router-dom'
import LastChat from './LastChat';
import ChatTime from './ChatTime';

function Chatfriend({ name, title, pic, bg, msg }) {



  return (
    <li>
      <Link to={'/chatting'} href="#" state={{ name, pic, bg, msg }}>
        <span className="chats_img empty">
          <img src={pic} alt={title} />
        </span>
        <span className="chats_cont">
          <span className="chats_name">{name}</span>
          <LastChat
            name={name}
          />

        </span>
        <ChatTime
          name={name}
        />
      </Link>
    </li>
  )
}

export default Chatfriend