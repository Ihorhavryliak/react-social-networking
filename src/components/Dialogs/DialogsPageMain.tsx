import React from 'react';
import { useSelector } from 'react-redux';
import Preloader from '../Common/Preloader/Preloader';
import { getSsFeching } from '../../redux/user-selectors';
import { DialogsPage } from './DialogsPage';
import { Navigate } from 'react-router-dom';
import { getisAiuth } from '../../redux/chat-selector';
import { LoginPage } from '../Login/LoginPage';



const DialogsPageMain = React.memo(() => {
  const title = 'All message';
  document.title = title;
  const isDialogsLoads = useSelector(getSsFeching);
  const isAuth = useSelector(getisAiuth);
  if (!isAuth) {
    return <LoginPage />
  }
  return (
    <>
      {isDialogsLoads && <Preloader />}
      <h1>{title}</h1>
      <DialogsPage />
    </>
  );
}
);

export default DialogsPageMain;