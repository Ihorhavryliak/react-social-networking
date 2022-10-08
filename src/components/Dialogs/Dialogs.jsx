import se from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Messege from './Messege/Messege';
import React from 'react';

const Dialog = (props) => {

  let state = props.dialogsPage;
  let dialogList = state.diaDate.map(names => (<DialogItem key={names.id}  src={names.src} name={names.name} id={names.id}/>));
  let phraList = state.mesegeDate.map(phar => (<Messege key={phar.id}  messege={phar.name} />) );
  

  let sendTextMessege = () => {
    props.adMessege()
  }
  let textMessege = (e) => {
    let newText = e.target.value;
    props.updateMesege(newText);
  }
  return (
        <div className={se.dialogs}>
          <div className={se.dialogs_items}>
          {dialogList}
          </div>
          <div className={se.messeges}>
            {phraList}
          </div>
          <div>
            <div>
             <textarea placeholder='Enter your messege'
             onChange={textMessege} value={state.textMessege} ></textarea>
            </div>
            <div>
            <button onClick={sendTextMessege}>Send</button>
            </div>
          </div>
        </div>
  )
}

export default Dialog;