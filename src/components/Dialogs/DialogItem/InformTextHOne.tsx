import React from "react";
import { DialogsKeyType } from "../../../redux/dialogs-reducer";
import { UserPhotosType } from "../../../redux/profile_reducer";
import styles from './../Dialogs.module.css';
import notPhoto from '../../../assets/images/image-user.png';

export const InformTextHOne: React.FC<InformTextHOneType> = (props) => {
  const { dialogs, friendId, saveUserPhotosArr, title } = props;
  let recivePhoto;
  if (!dialogs.some(f => f.id === +friendId)) {
    const getObj = saveUserPhotosArr.filter(m => m.id === +friendId);
    if (getObj.length > 0 && getObj[0].photo !== null) {
      recivePhoto = getObj[0].photo;
    } else {
      recivePhoto = notPhoto;
    }
  } else {
    if (dialogs.length > 0) {
      let obgUserReciver = dialogs.filter(f => f.id === +friendId);
      if (obgUserReciver.length > 0 && obgUserReciver[0].photos?.small !== null) {
        recivePhoto = obgUserReciver[0].photos?.small;
      }
    }
  }

  let reciveName;
  if (!dialogs.some(f => f.id === +friendId)) {
    const getObj = saveUserPhotosArr.filter(m => m.id === +friendId);
    if (getObj.length > 0) {
      reciveName = getObj[0].name;
    } else {
      reciveName = 'User';
    }
  } else {
    if (dialogs.length > 0) {
      let obgUserReciver = dialogs.filter(f => f.id === +friendId);
      if (obgUserReciver.length > 0 && obgUserReciver[0] !== undefined) {
        reciveName = obgUserReciver[0].userName;
      } else {
        reciveName = 'User';
      }
    }

  }

  return (<>
    <h1> {title}
      <span className={styles.reciverTextName}>send to: <span className={styles.reciverNameTexts}>{reciveName}</span> 
        <img className={styles.intiTlePhoto} src={recivePhoto === undefined ? notPhoto : recivePhoto} alt="recivePhoto" />
      </span> </h1>
  </>
  );
};

type InformTextHOneType = {
  dialogs: Array<DialogsKeyType>;
  friendId: string;
  saveUserPhotosArr: Array<UserPhotosType>;
  title: string;
};
