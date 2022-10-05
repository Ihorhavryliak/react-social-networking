import se from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Messege from './Messege/Messege';
import React from 'react';
import {adMessegeActionCreater, updateMesegeActionCreater} from './../../redux/dialogs-reducer'

const Dialog = (props) => {

  let dialogList = props.state.diaDate.map(names => (<DialogItem  src={names.src} name={names.name} id={names.id}/>));
  let phraList = props.state.mesegeDate.map(phar => (<Messege messege={phar.name} />) );
  

  let sendTextMessege = () => {
    props.dispatch(adMessegeActionCreater())
  }
  let textMessege = (e) => {
    let newText = e.target.value;
    props.dispatch(updateMesegeActionCreater(newText));
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
             onChange={textMessege} value={props.state.textMessege} ></textarea>
            </div>
            <div>
            <button onClick={sendTextMessege}>Send</button>
            </div>
          </div>
        </div>
  )
}

export default Dialog;