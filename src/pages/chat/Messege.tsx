import React from "react";
import { useSelector } from "react-redux";
import { ChatMessaeAPIType } from "../../api/chat-api";
import { getMyUserId } from "../../redux/chat-selector";
import s from '../chat/chat.module.css'
import userPhoto from './../../assets/images/image-user.png'

export const Messege: React.FC<{ message: ChatMessaeAPIType; }> = React.memo(({ message }) => {
  const muId = useSelector(getMyUserId)

  let myPhoto;
  if (message.photo === null) {
    myPhoto = userPhoto
  } else {
    myPhoto = message.photo
  }


  return (
    <>
      {muId === message.userId ?
        <div className={s.my}>
          <img className={s.photoChat} alt={message.userName} src={myPhoto} />
          <span className={s.nameChat}>{message.userName}</span>
          <div className={s.textMessageChat} >
            {message.message}
          </div >
        </div>
        : <div className={s.anotherUser}>
              <img className={s.photoChat} alt={message.userName} src={myPhoto} />
          <span className={s.nameChat}>{message.userName}</span>
          <div className={s.textMessageChat} >
            {message.message}
          </div >
        </div>}
    </>
  );
});
