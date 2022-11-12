import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { Messege } from "./Messege";
import s from '../chat/chat.module.css'

export const Messages: React.FC = React.memo(() => {

  const message = useSelector((state: AppStateType) => state.chat.message);
  const messegAncorRef = useRef<HTMLDivElement>(null);

  const [scloor, setScloor] = useState(0)
  const [isAtutoScroll, setAtutoScrollIs] = useState(true);

  
  const scrolHanfar = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const element = e.currentTarget;
      setScloor(element.scrollHeight)
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAtutoScroll && setAtutoScrollIs(true);
    } else {
      isAtutoScroll && setAtutoScrollIs(false);
    }
  };

  useEffect(() => {
    setTimeout(()=>{
      messegAncorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500)
     
  }, [message]);

  return (
    <div className={s.scroolChat} style={{ height: '400px', overflowY: 'auto' }} onScroll={(e)=> setScloor(e.currentTarget.scrollHeight)}>
      {message.map((m: any, index) => <Messege key={m.id} message={m} />)}
      <div className={s.refChat} ref={messegAncorRef}>
      </div>
    </div>
  );
});

