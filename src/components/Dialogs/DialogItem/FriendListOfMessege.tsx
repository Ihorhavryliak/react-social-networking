
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllDialogs, getCountPage, getFrendMesseges, getMyId, getSaveFilterPage, getSaveUserPhotosArr, } from "../../../redux/dialog-selector";
import { messegeDisCount, sentFriendMesege, setDialog, setItemFriendMessages } from "../../../redux/dialogs-reducer";
import { getUserProfile } from "../../../redux/profile_reducer";
import { AppDispatch } from "../../../redux/redux-store";
import { getSsFeching } from "../../../redux/user-selectors";
import Preloader from "../../Common/Preloader/Preloader";
import { FriendMessageForm } from "../AddMessegeForm/FriendMessageForm";
import styles from './../Dialogs.module.css'
import PaginatorModern from "./PaginatorModern";
import { FIlterListMessages } from "./FIlterListMessages";
import { UserFriendMessages } from "./UserFriendMessages";
import { InformTextHOne } from "./InformTextHOne";

const FriendListOfMessege = React.memo(() => {

  const title = 'Messages';
  document.title = title;
  const dispatch: AppDispatch = useDispatch();
  const bodyMessege = useSelector(getFrendMesseges);
  const dialogs = useSelector(getAllDialogs);
  const myId = useSelector(getMyId);
  const isDialogsLoads = useSelector(getSsFeching);
  const pageCount = useSelector(getCountPage);
  const [isRestore, setIsRestore] = useState(false);
  const [isRestoreSpam, setIsRestoreSpam] = useState(false);
  const SaveFilterPage = useSelector(getSaveFilterPage);
  const saveUserPhotosArr = useSelector(getSaveUserPhotosArr);
  const messegAncorRef = useRef<HTMLDivElement>(null);
  const [scrollSend, setScrollSend] = useState(false);
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

  const sendFriednMeesege = (friendId: number, messege: string) => {
    setPageNumber(0)
    setTimeout(() => {
      setScrollSend(true);
    }, 300);
    dispatch(sentFriendMesege(friendId, messege))
  }

  const scrollToBottom = () => {
    messegAncorRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {isDialogsLoads && <Preloader />}
      <div className={styles.blockDiaols}>
        <InformTextHOne dialogs={dialogs} friendId={friendId} saveUserPhotosArr={saveUserPhotosArr} title={title} />
        <FIlterListMessages setCurrentPage={setCurrentPage} friendId={friendId} searchStrCountPage={searchStr.countPage} />
        <div>
        {bodyMessege.length > 0 &&
          <PaginatorModern itemsPerPage={searchStr.countPage} total_count={pageCount} setCurrentPage={setPageNumber} currentPage={pageNumber} />
        }
          </div>
        <div className={styles.blockListMessage}  >
          <div className={styles.scroolDialogs} style={{ maxHeight: '450px', overflowY: 'auto' }}  >
            {bodyMessege.length > 0 ? bodyMessege.map((m, i) => <UserFriendMessages key={m.id}
              friendId={friendId} m={m} bodyMessege={bodyMessege} dialogs={dialogs}
              setIsRestoreSpam={setIsRestoreSpam} myId={myId}
            />)
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




