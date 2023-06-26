import React from "react";
import styles from './../Dialogs.module.css';
import { ItemListType } from "../../../api/dialogs-api";
import { useDispatch } from "react-redux";
import { deleteMyMessage, DialogsKeyType, restorMessage, spamSendMessage } from "../../../redux/dialogs-reducer";
import { AppDispatch } from "../../../redux/redux-store";
import { useSelector } from "react-redux";
import { getMyPhoto } from "../../../redux/dialog-selector";
import notPhoto from '../../../assets/images/image-user.png'



export const UserFriendMessages: React.FC<UserFriendMessagesType> = (props) => {
  const { friendId, m, bodyMessege, dialogs } = props;
  const { myId, setIsRestoreSpam } = props;
  const dispatch: AppDispatch = useDispatch();
  const myPhoto = useSelector(getMyPhoto);


  const deleteMyMessages = (messageId: string) => {
    dispatch(deleteMyMessage(messageId));
    setTimeout(() => {
      setIsRestoreSpam(true)
    }, 1500)
  }
  const spam = (id: string) => {
    dispatch(spamSendMessage(id));
    setIsRestoreSpam(true)
  }
  const onRestorMessage = (messageId: string) => {
    dispatch(restorMessage(messageId));
  }

  
  let notPhotoTwo: any;
  if (myPhoto === null || myPhoto === undefined) {
    notPhotoTwo = notPhoto
  } else {
    notPhotoTwo = myPhoto
  }

  let photo: any;
  if (bodyMessege.length > 0) {
    photo = dialogs.filter(ob => ob.id === +friendId)[0];
    if (photo && photo.photos?.small !== undefined) {
      photo = photo.photos?.small
    } else {
      photo = notPhoto;
    }
  }
  
  return (
    <div key={m.id} className={+friendId === m.senderId ? styles.sender : styles.user}>
      <div>
        <img style={{ maxWidth: '40px', borderRadius: '50px' }}
          src={+friendId === m.senderId ? photo : notPhotoTwo}
          alt="photosfd" />
        <span className={styles.userName}>{m.senderName}</span>
        <span style={{ float: 'right' }}>{m.addedAt}</span>
      </div>
      {m.body.includes('<br />') ? m.body.split('<br />').map((v, i) => <span key={v + i} className={styles.textMessage}>{v}<br /></span>)
        : <span className={styles.textMessage}>{m.body}</span>}
      <div>
        {m.translatedBody === true &&
          <button style={{ float: 'right' }} className="ant-btn ant-btn-default" onClick={() => onRestorMessage(m.id)}>Restore</button>}
        {m.translatedBody === null &&
          <button style={{ float: 'right' }} className="ant-btn ant-btn-default" onClick={() => deleteMyMessages(m.id)}>Delete</button>}
      </div>
      {myId === m.senderId &&
        <span>{m.viewed ? 'Reviewed' : ''}</span>}
      {myId !== m.senderId &&
        <button style={{ float: 'right' }} className="ant-btn ant-btn-default" onClick={() => spam(m.id)}>spam</button>}
    </div>
  );
};
type UserFriendMessagesType = {
  friendId: string;
  m: ItemListType;
  myId: number | null;
  setIsRestoreSpam: (b: boolean) => void
  dialogs: Array<DialogsKeyType> 
  bodyMessege: Array<ItemListType>  
};
