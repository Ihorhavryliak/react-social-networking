
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllDialogs, getCountPage, getFrendMesseges, getMyId, getMyPhoto, getSaveFilterPage, } from "../../../redux/dialog-selector";
import { deleteMyMessage, messegeDisCount, reciveDataMessege, restorMessage, sentFriendMesege, setDialog, setItemFriendMessages, spamSendMessage } from "../../../redux/dialogs-reducer";
import { getUserProfile } from "../../../redux/profile_reducer";
import { AppDispatch } from "../../../redux/redux-store";
import { getSsFeching } from "../../../redux/user-selectors";
import Preloader from "../../Common/Preloader/Preloader";
import { FriendMessageForm } from "../AddMessegeForm/FriendMessageForm";
import styles from './../Dialogs.module.css'
import PaginatorModern from "./PaginatorModern";
import notPhoto from '../../../assets/images/image-user.png'
import { FIlterListMessages } from "./FIlterListMessages";

const FriendListOfMessege = React.memo(() => {

  const title = 'Messages';
  document.title = title;

  const dispatch: AppDispatch = useDispatch();
  const bodyMessege = useSelector(getFrendMesseges);
  const dialogs = useSelector(getAllDialogs);
  const myPhoto = useSelector(getMyPhoto);
  const myId = useSelector(getMyId);
  const isDialogsLoads = useSelector(getSsFeching);
  const pageCount = useSelector(getCountPage);
  const [isRestore, setIsRestore] = useState(false);
  const [isRestoreSpam, setIsRestoreSpam] = useState(false);
  const SaveFilterPage = useSelector(getSaveFilterPage);

  const navigate = useNavigate();
  const location = useLocation();
  let friendId = '';
  for (let i = 0; i < location.pathname.length; i++) {
    if ('0123456789'.includes(location.pathname[i])) {
      friendId += location.pathname[i];
    }
  }

  let pageGetNumber = 0;
  let selectPages = 0;
  if (SaveFilterPage.some(m => m.id === +friendId)) {
    let oneFriend = SaveFilterPage.filter(n => n.id === +friendId)
    if (oneFriend[0].pageNumber !== undefined) {
      pageGetNumber = oneFriend[0].pageNumber;
      selectPages = oneFriend[0].selectPage;
    }
  } else {
    pageGetNumber = SaveFilterPage.filter(n => n.id === 0)[0].pageNumber;
    selectPages = SaveFilterPage.filter(n => n.id === 0)[0].selectPage;
  }

  const [pageNumber, setPageNumber] = useState(pageGetNumber);
  const [searchStr, setSearchStr] = useState({ countPage: selectPages });

  useEffect(() => {
    const query: QuelyType = {};
    if (pageNumber > 1) {
      query.page = pageNumber.toString()
    }
    if (searchStr.countPage > 10 || searchStr.countPage < 10) {
      query.count = searchStr.countPage.toString();
    }
    const queryString = require('query-string');
    const queryStrings = queryString.stringify(query);
    if (queryStrings.length >= 0) {
      navigate('?' + queryStrings)
    }
  }, [pageNumber, searchStr.countPage]);

  useEffect(() => {
    dispatch(setDialog());
    if (myId !== null) {
      dispatch(getUserProfile(myId));
    }
  }, []);

  useEffect(() => {

    if (pageNumber === 0) {
      dispatch(setItemFriendMessages(+friendId, 1, searchStr.countPage));
    } else {
      dispatch(setItemFriendMessages(+friendId, pageNumber, searchStr.countPage));
    }

    return () => { setIsRestore(false); setIsRestoreSpam(false); }
  }, [isRestore, isRestoreSpam, pageNumber, searchStr.countPage]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(messegeDisCount());
    }, 1000)
  }, []);

  const sendFriednMeesege = (friendId: number, messege: string) => {
    setPageNumber(0)
    setTimeout(() => {
      setScrollSend(true);
    }, 300);
    dispatch(sentFriendMesege(friendId, messege))
  }
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
  let photo: any;
  if (bodyMessege.length > 0) {
    photo = dialogs.filter(ob => ob.id === +friendId)[0];
    if (photo && photo.photos?.small !== undefined) {
      photo = photo.photos?.small
    } else {
      photo = notPhoto;
    }
  }
  const messegAncorRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messegAncorRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  const [scrollSend, setScrollSend] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      scrollToBottom()
    }, 500)
    return () => setScrollSend(false)
  }, [scrollSend]);

  const setCurrentPage = (e: string) => {
    setPageNumber(1)
    setSearchStr({ ...searchStr, countPage: +e })
  }
  useEffect(() => {
    if (bodyMessege.length === 0 && pageNumber !== 1) {
      setPageNumber(pageGetNumber - 1)
    }
  }, [bodyMessege])


  let recivePhoto;
  if (bodyMessege.length > 0 && dialogs.length > 0) {
    let obgUserReciver = dialogs.filter(f => f.id === +friendId);
    if (obgUserReciver.length > 1 && obgUserReciver[0].photos?.small !== null) {
      recivePhoto = obgUserReciver[0].photos?.small
    }
  } 

  let reciveName;
  if(dialogs.length > 0) {
    debugger
    let obgUserReciver = dialogs.filter(f => f.id === +friendId);
    if(obgUserReciver.length > 0){
      reciveName = obgUserReciver[0].userName;
    }
  } else {
    reciveName = 'User'
  }
  

  let notPhotoTwo: any;
  if (myPhoto === null || myPhoto === undefined) {
    notPhotoTwo = notPhoto
  } else {
    notPhotoTwo = myPhoto
  }
 
  return (
    <>
      {isDialogsLoads && <Preloader />}
      <div className={styles.blockDiaols}>
        <h1> {title}  <span className={styles.reciverTextName}>send to: {reciveName} <img className={styles.intiTlePhoto} src={recivePhoto === undefined ? notPhoto  : recivePhoto } alt="recivePhoto" /></span> </h1>
          <FIlterListMessages setCurrentPage={setCurrentPage}  friendId={friendId}  searchStrCountPage = {searchStr.countPage}/>
        <div>
          <PaginatorModern itemsPerPage={searchStr.countPage} total_count={pageCount} setCurrentPage={setPageNumber} currentPage={pageNumber} />
        </div>
        <div className={styles.blockListMessage}  >
          <div className={styles.scroolDialogs} style={{ maxHeight: '450px', overflowY: 'auto' }}  >
            {bodyMessege.length > 0 ? bodyMessege.map((m, i) => {
              return (
                <div key={m.id} className={+friendId === m.senderId ? styles.sender : styles.user} >
                  <div>
                      <img style={{ maxWidth: '40px', borderRadius: '50px' }} 
                      src={+friendId === m.senderId ? photo  : notPhotoTwo} 
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
                      <button style={{ float: 'right' }} className="ant-btn ant-btn-default" onClick={() => deleteMyMessages(m.id)}>Delete</button>
                    }
                  </div>
                  {myId === m.senderId &&
                    <span>{m.viewed ? 'Reviewed' : ''}</span>
                  }
                  {myId !== m.senderId &&
                    <button style={{ float: 'right' }} className="ant-btn ant-btn-default" onClick={() => spam(m.id)}>spam</button>
                  }
                </div>
              )
            })
              : <div>No message</div>
            }
            <div className={styles.refMessege} ref={messegAncorRef}></div>
          </div>
          <div className={styles.blockSendMessage}>
            <FriendMessageForm sendFriednMeesege={sendFriednMeesege} friendId={friendId} />
          </div>
        </div>
      </div>
    </>
  )
});


export default FriendListOfMessege

type QuelyType = {
  page?: string,
  count?: string
}




