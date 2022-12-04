
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllDialogs, getFrendMesseges, getisSearchMessege, getMyId, getMyPhoto, getSaveFilterPage,  } from "../../../redux/dialog-selector";
import { reciveDataMessege, setDialog, setItemFriendMessages } from "../../../redux/dialogs-reducer";
import { getUserProfile } from "../../../redux/profile_reducer";
import { AppDispatch } from "../../../redux/redux-store";
import { getSsFeching } from "../../../redux/user-selectors";
import Preloader from "../../Common/Preloader/Preloader";
import styles from './../Dialogs.module.css'



export const SearchMessage = React.memo(() => {

  const title = 'Search messages'
  document.title = title

  const dispatch: AppDispatch = useDispatch();
  const bodyMessege = useSelector(getFrendMesseges);
  const dialogs = useSelector(getAllDialogs);
  const myPhoto = useSelector(getMyPhoto);
  const myId = useSelector(getMyId);
  const isDialogsLoads = useSelector(getSsFeching);
  const searchMessege = useSelector(getisSearchMessege)
  const location = useLocation();
  const dateUrl = location.search.slice(-1 * location.search.lastIndexOf('='));
  const [defaultData, setdefaultData] = useState(dateUrl);
  const [isFileter, setFilter] = useState('false');
  const SaveFilterPage = useSelector(getSaveFilterPage);
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

  useEffect(() => {
    dispatch(setItemFriendMessages(+friendId, pageGetNumber, selectPages));
    dispatch(setDialog());
    if (myId !== null) {
      dispatch(getUserProfile(myId));
    }
    return ()=> {}
  }, []);

  const navigate = useNavigate();
  
  let photo: any;
  if(bodyMessege.length > 0) {
    photo = dialogs.filter(ob => ob.id === +friendId)[0];
    if(photo && photo.photos?.small !== undefined) {
      photo = photo.photos?.small
    }else{
      photo = '';
    }
  } 
  
  const reciveDataMesseges = (userId: number, data: string, isSearch: boolean) => {
    setdefaultData(data);
    navigate('?newerThen='  + data);
    if (data.length > 0) {
      dispatch(reciveDataMessege(userId, data, isSearch));
    }
  }

  const isFiltSpam = (e: string) => {
    setFilter(e);
  }
  return (
    <>
    {isDialogsLoads && <Preloader/>}
    <h1>{title}</h1>
    <div className={styles.blockFilter}>
    <button className="ant-btn ant-btn-default" style={{marginRight: '10px'}} onClick={() =>  navigate(`/dialogs/${+friendId}/messages`)}>Go back </button>
    Show messages newer ones than: 
    <input className={styles.inputData} type="date" value={defaultData} onChange={(event)=> reciveDataMesseges(+friendId, event.target.value, true)} />
    <select  className={styles.selectorSerchMessage}  onChange={(e)=>isFiltSpam(e.currentTarget.value)}>
        <option  value="All">All</option>
        <option value="true" >Message spam by Recipient</option>
        <option  value="Delete">Message deleted by Recipient</option>
   </select>
     </div>
      <div className={styles.blockListMessage} >
          {searchMessege.length > 0 ? searchMessege
          .filter(s => (isFileter === 'true')  ? s.isSpam === true && s.senderId !== +friendId 
          : isFileter === 'Delete' ? s.deletedByRecipient === true
          : s)
          .map((m, i) => {
            return (
              <div key={m.id} className={+friendId === m.senderId ? styles.sender : styles.user} >
             
                <div>
                  {myPhoto && 
                    <img style={{ maxWidth: '40px', borderRadius: '50px' }} src={+friendId === m.senderId ? photo : myPhoto} alt="photosfd" />
                  }
                  <span className={styles.userName}>{m.senderName}</span>
                  <span style={{ float: 'right' }}>{m.addedAt}</span>
                </div>
                {m.body.includes('<br />') ? m.body.split('<br />').map((v, i) => <span key={v + i} className={styles.textMessage}>{v}<br /></span>)
                  : <span className={styles.textMessage}>{m.body}</span>}
                   {m.senderId !== +friendId && 
                <div className={styles.showSpam}>
                 <div>Message spam by Recipient:  {m.isSpam ? <span className={styles.searchSelectorRed}>yes</span>  : <span>no</span>}</div> 
                 <div>Message deleted by Recipient: {m.deletedByRecipient ? <span className={styles.searchSelectorRed}>yes</span>  : <span>no</span>}</div> 
                 </div>
                }
              </div>
            )
          })
          //
         
         : <>No founded any message. Choose another date please .</>
        }
        {searchMessege.length > 0 ? searchMessege.filter(s => (isFileter === 'true')  ? s.isSpam === true && s.senderId !== +friendId 
          : isFileter === 'Delete' ? s.deletedByRecipient === true
          : s)
          .length === 0 ? <>No founded any message.</> : ''
          : ''
        }
      </div>

    </>
  )
});


export default SearchMessage