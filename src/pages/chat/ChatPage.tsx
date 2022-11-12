import React from "react"
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { LoginPage } from "../../components/Login/LoginPage";
import { getisAiuth } from "../../redux/chat-selector";
import { Chat } from "./Chat"

 const ChatPage: React.FC = () => {
  let title = 'Shared chat (web sockets)'
  document.title = title;

  const isAuth = useSelector(getisAiuth)

if(!isAuth) {
  return <LoginPage />
}

  return (
    <div>
      <h1>{title}</h1>
      <Chat />
    </div>
  )
}



export default ChatPage