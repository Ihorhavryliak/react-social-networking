import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { ChatMessaeType } from "../../api/chat-api"
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

  useEffect(() => {
    dispatch(startMessageLisiner());
    return () => {
      dispatch(stopMessageLisiner())
    }
  }, [])

  return (
    <div>
      <Messages  />
      <AdMesegeForm  />
    </div>
  )
}

const Messages: React.FC = () => {

  const message = useSelector( (state: AppStateType)  => state.chat.message)

  return (
    <div style={{ height: '400px', overflowY: 'auto' }}>
      {message.map((m: any, index) => <Messege key={index} message={m} />)}
    </div>
  )
}

const Messege: React.FC<{message: ChatMessaeType}> = ({message}) => {

  return (
    <div>
      <img alt={message.userName} style={{ width: '50px' }} src={message.photo} /><b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  )
}

const AdMesegeForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const [redyStatus, setRedyStatus] = useState<'pending' | 'ready'>('pending');

  const dispatch: AppDispatch = useDispatch();


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
        <button disabled={false} onClick={sendMessegeHandle}>Send</button>
      </div>
    </div>
  )
}


export default ChatPage;