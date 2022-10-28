import se from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Messege from './Messege/Messege';
import React from 'react';
import { AddMessegeFormRedux } from './AddMessegeForm/AddMessegeForm';
import { InitialStateType } from '../../redux/dialogs-reducer';

type OwnProps = {
  dialogsPage: InitialStateType
  sendMesseege: (messege: string) => void
}

export type NewMessegeFormType = {
  newMessegeBoddy: string,  
}

const Dialog: React.FC<OwnProps> = (props) => {

  let state = props.dialogsPage;
  let dialogList = state.diaDate.map(names => (<DialogItem key={names.id}  src={names.src} name={names.name} id={names.id}/>));
  let phraList = state.mesegeDate.map(phar => (<Messege key={phar.id}  messege={phar.name} />) );
  
  const handleSubmit = (values: NewMessegeFormType) => {
    props.sendMesseege(values.newMessegeBoddy)
  }


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



export default Dialog;