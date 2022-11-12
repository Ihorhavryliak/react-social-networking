import se from './Dialogs.module.css';
import React, { useEffect } from 'react';
import { AppDispatch } from '../../redux/redux-store';
import { useDispatch } from 'react-redux';
import { setDialog } from '../../redux/dialogs-reducer';
import { useSelector } from 'react-redux';
import { getInformDialog, } from '../../redux/dialog-selector';
import { Navigate } from 'react-router-dom';
import { getisAiuth } from '../../redux/chat-selector';
import { ListDialogsPage } from './ListDialogsPage';


export const DialogsPage = React.memo(() => {

  const userId = useSelector(getInformDialog);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setDialog())
  }, [])



  /* const birthday = Date.parse('2022-11-08 T13:46:46.523'); 
  console.log(birthday) */
  return (
    <div className={se.dialogs}>
      {userId && userId.map(d => {
        return (
          <ListDialogsPage d={d} />
        )
      })}
    </div>
  );
});

export default DialogsPage;




