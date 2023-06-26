import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sendMessege } from "../../redux/chat-reducer";
import { AppDispatch, AppStateType } from "../../redux/redux-store";
import s from '../chat/chat.module.css'

export const AdMesegeForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status);
  const [error, setError] = useState<{len?: string}>({})

  useEffect(()=>{
    if(message.length === 1) {
      setError({len: ''}) 
    }
  },[message])

  const sendMessegeHandle = () => {
    if (message.length <= 0) {
      setError({len: 'Require'}) 
      return null
    } else {
      setError({len: ''}) 
    }
    dispatch(sendMessege(message));
    setMessage('');
  };

  return (
    <div>
      <div className={s.texareaChat}>
        <textarea className={s.texareaFieldChat} onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
       <span className={s.texareaErrorText}>{error.len && error.len}</span> 
      </div>
      <div>
        <Button disabled={status !== 'ready'} onClick={sendMessegeHandle}>Send</Button>
      </div>
    </div>
  );
};
