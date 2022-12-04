import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { startMessageLisiner, stopMessageLisiner } from "../../redux/chat-reducer";
import { AppDispatch, AppStateType } from "../../redux/redux-store";
import { AdMesegeForm } from "./AdMesegeForm";
import { Messages } from "./Messages";
import s from '../chat/chat.module.css'


export const Chat: React.FC = () => {

  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status);
  const messege = useSelector((state: AppStateType) => state.chat.message);


  useEffect(() => {
    dispatch(startMessageLisiner());
    return () => {
      dispatch(stopMessageLisiner());
    };
  }, []);

  return (
    <div className={s.blockChat}>
      {status === "error" && <div> Some erorr. Refresh page please</div>}
        <Messages />
        <AdMesegeForm />
    </div>
  );
};
