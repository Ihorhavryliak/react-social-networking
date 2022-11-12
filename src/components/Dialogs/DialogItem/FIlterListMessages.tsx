import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reciveDataMessege } from "../../../redux/dialogs-reducer";
import { AppDispatch } from "../../../redux/redux-store";
import styles from './../Dialogs.module.css';


type FIlterListMessagesType = {
  friendId: string
  searchStrCountPage: number
  setCurrentPage: (e: string)=> void
}

export const FIlterListMessages: React.FC<FIlterListMessagesType> = React.memo((props) => {
  const { friendId, searchStrCountPage, setCurrentPage} = props;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const reciveDataMesseges = (userId: number, data: string, isSearch: boolean) => {
    if (data.length > 0) {
      dispatch(reciveDataMessege(userId, data, isSearch));
      return navigate(`/dialogs/${userId}/messages/new?newerThen=${data}`)
    }
  }

  return (
    <div className={styles.blockFilter}>
      <button className="ant-btn ant-btn-default" style={{ marginRight: '10px' }} onClick={() => navigate('/dialogs')}>Go to All dialogs </button>
      Show messages newer ones than:
      <input className={styles.inputData} type="date" onChange={(event) => reciveDataMesseges(+friendId, event.target.value, true)} />
      <span className={styles.textPage}>Pages: </span>  <select value={searchStrCountPage} name="1" onChange={(e) => setCurrentPage(e.currentTarget.value)} className={styles.selectorSerchMessage}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
});
