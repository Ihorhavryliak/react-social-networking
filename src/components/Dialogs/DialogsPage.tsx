import se from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Messege from './Messege/Messege';
import React from 'react';
import { AddMessegeFormRedux } from './AddMessegeForm/AddMessegeForm';
import { actions } from '../../redux/dialogs-reducer';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/redux-store';
import { useDispatch } from 'react-redux';
import { getDialogsPage } from '../../redux/user-selectors';


export type NewMessegeFormType = {
  newMessegeBoddy: string,  
};

const DialogsPage: React.FC = (props) => {

  const dialogsPage = useSelector(getDialogsPage);
  const dispatch: AppDispatch = useDispatch();
  let state = dialogsPage;
  let dialogList = state.diaDate.map(names => (<DialogItem key={names.id}  src={names.src} name={names.name} id={names.id}/>));
  let phraList = state.mesegeDate.map(phar => (<Messege key={phar.id}  messege={phar.name} />) );
  
  const handleSubmit = (values: NewMessegeFormType) => {
    dispatch(actions.sendMesseege(values.newMessegeBoddy))
  };


  return (
        <div className={se.dialogs}>
          <div className={se.dialogs_items}>
          {dialogList}
          </div>
          <div className={se.messeges}>
            {phraList}
          </div>
          <AddMessegeFormRedux onSubmit={handleSubmit} />
        </div>
  )
}

export default DialogsPage;


