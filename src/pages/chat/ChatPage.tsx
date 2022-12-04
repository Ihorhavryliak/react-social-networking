import React from "react"
import { useSelector } from "react-redux";
import Preloader from "../../components/Common/Preloader/Preloader";
import { LoginPage } from "../../components/Login/LoginPage";
import { getisAiuth } from "../../redux/chat-selector";
import { getSsFeching } from "../../redux/user-selectors";
import { Chat } from "./Chat"
import s from '../chat/chat.module.css'

const ChatPage: React.FC = () => {
  let title = 'Shared chat (web sockets)'
  document.title = title;
  const isAuth = useSelector(getisAiuth)
  const isDialogsLoads = useSelector(getSsFeching);

  if (!isAuth) {
    return <LoginPage />
  }

  return (<>
    {isDialogsLoads && <Preloader />}
    <div className={s.mainChatContainer}>
      <h1>{title}</h1>
      <Chat />
    </div></>
  )
}



export default ChatPage