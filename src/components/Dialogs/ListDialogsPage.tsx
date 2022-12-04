import React from 'react';
import { DialogsKeyType } from '../../redux/dialogs-reducer';
import { NavLink } from 'react-router-dom';
import noPhoto from '../../assets/images/image-user.png';
import st from './Dialogs.module.css';

type ListDialogsPageType = {
  d: DialogsKeyType;
};

export const ListDialogsPage: React.FC<ListDialogsPageType> = React.memo(({ d }) => {
  return (
  
    <NavLink key={d.id} to={`${d.id}/messages`}>
      <div  className={st.blockListUserMasssage}>
        {d.photos?.large ? <div> <img style={{ borderRadius: '50%' }} className={st.imgNoPhoto} alt={'user1'} src={d.photos?.large} /></div>
          : <div> <img style={{ borderRadius: '50%' }} className={st.imgNoPhoto} alt={'user1'} src={noPhoto} /></div>}
        <div className={st.userNameMessage}>
          {d.userName}
        </div>
        <div className={st.newMessageCount}> {d.hasNewMessages && 'New message'}</div>
        {/*    <p>{d.lastUserActivityDate} lastUserActivityDate</p>
         <p>{d.lastDialogActivityDate} lastUserActivityDate</p>  */}
      </div>
    </NavLink>
   
  );
});