import { Button } from "antd"
import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { ChatMessaeAPIType } from "../../api/chat-api"
import { sendMessege,  startMessageLisiner, stopMessageLisiner } from "../../redux/chat-reducer"
import { AppDispatch, AppStateType } from "../../redux/redux-store"


const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  )
}


export const Chat: React.FC = () => {

  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status);


  useEffect(() => {
    dispatch(startMessageLisiner());
    return () => {
      dispatch(stopMessageLisiner())
    }
  }, [])

  return (
    <div>
      {status === "error" && <div> Some erorr. Rephresh page please</div>}
            <>
            <Messages  />
            <AdMesegeForm  />
            </>
    

    </div>
  )
}

const Messages: React.FC = () => {

  const message = useSelector( (state: AppStateType)  => state.chat.message)
  const messegAncorRef = useRef<HTMLDivElement>(null);
  const [isAtutoScroll, setAtutoScrollIs] = useState(false);

  const scrolHanfar = (e:  React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if(Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
  
      !isAtutoScroll && setAtutoScrollIs(true);
    } else {
      isAtutoScroll && setAtutoScrollIs(false);
    }
  }


  setTimeout(()=>{
    setAtutoScrollIs(true)
  }, 5)
  
  useEffect(() => {
    if (isAtutoScroll) {
      messegAncorRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    
  }, [message]);
  
  return (
    <div style={{ height: '400px', overflowY: 'auto' }} onScroll={scrolHanfar}>
      {message.map((m: any, index) => <Messege key={m.id} message={m} />)}
      <div ref={messegAncorRef}>

      </div>
    </div>
  )
}

const Messege: React.FC<{message: ChatMessaeAPIType}> = React.memo( ({message}) => {

  return (
    <div>
      <img alt={message.userName} style={{ width: '50px' }} src={message.photo} /><b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  )
})

const AdMesegeForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status)

  const sendMessegeHandle = () => {
    if (!message) {
      return;
    }
   
    dispatch(sendMessege(message));
    setMessage('');
  }
  return (
    <div>
      <div>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
      </div>
      <div>
        <Button disabled={status !== 'ready'} onClick={sendMessegeHandle}>Send</Button>
      </div>
    </div>
  )
}


export default ChatPage;