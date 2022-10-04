import se from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Messege from './Messege/Messege';
import React from 'react';


const Dialog = (props) => {
  let dialogList = props.state.diaDate.map(names => (<DialogItem  src={names.src} name={names.name} id={names.id}/>));
  let phraList = props.state.mesegeDate.map(phar => (<Messege messege={phar.name} />) );
  
  let textS = React.createRef();

  let sendTextMessege = () => {
    props.addMessege()
  }
  let textMessege = () => {
    let newText = textS.current.value;
    props.updateMessege(newText)
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
            <textarea ref={textS} onChange={textMessege} value={props.state.textMessege} ></textarea>
            <button onClick={sendTextMessege}>Send</button>
          </div>
        </div>
  )
}

export default Dialog;