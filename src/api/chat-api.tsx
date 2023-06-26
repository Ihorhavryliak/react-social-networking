
const subscrubers = {
  'message-reseve': [] as MessageReciverSubscrubersType[],
  'status-change': [] as StatusChangerSubscrubersType[]

};

let ws: WebSocket | null = null;

const closeHandle = () =>{
  notifaSubscribesAboutStatus('pending');
  setTimeout(createChanel, 3000);
  };

  const messageHandal = (e: MessageEvent) => {
    const newMassage = JSON.parse(e.data);
    subscrubers['message-reseve'].forEach(s=> s(newMassage));
  };

  const openHandal = () => {
    notifaSubscribesAboutStatus('ready');
  };

  const errorHandal = () => {
    notifaSubscribesAboutStatus('error');
    console.error('RESTART PAGE PLEASE')
  };

  const cleanUp = () => {
    ws?.removeEventListener('close', closeHandle);
    ws?.removeEventListener('message', messageHandal );
    ws?.removeEventListener('open', openHandal);
    ws?.removeEventListener('error', errorHandal );
  };

  const notifaSubscribesAboutStatus = (status: StatusType) => {
    subscrubers['status-change'].forEach(s => s(status))
  };
function createChanel() {
  cleanUp();
  ws?.close();
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  notifaSubscribesAboutStatus('pending');
  ws.addEventListener('close', closeHandle );
  ws.addEventListener('message', messageHandal );
  ws.addEventListener('open', openHandal );
  ws.addEventListener('error', errorHandal );
};

export const chatAPI = {
  start () {createChanel();},
  stop () {
    subscrubers['message-reseve'] = [];
    subscrubers['status-change'] = [];
    cleanUp();
    ws?.close();
  },
  subscrube(eventName: SubscrubeType, callBack: StatusChangerSubscrubersType | MessageReciverSubscrubersType) {
    // @ts-ignore
    subscrubers[eventName].push(callBack);
    return () => {
       // @ts-ignore
      subscrubers['message-reseve'] = subscrubers['message-reseve'].filter(s => s !== callBack);
    }
  },
  ussubscrube (eventName: SubscrubeType, callBack: MessageReciverSubscrubersType | StatusChangerSubscrubersType) {
     // @ts-ignore
    subscrubers[eventName] = subscrubers[eventName].filter(s => s !== callBack);
  },

  sendMessege (message: string) {
    ws?.send(message);
  },

};

export type ChatMessaeAPIType = {
  message: string,
  photo: string,
  userId: number,
  userName: string
};

type MessageReciverSubscrubersType = (message: ChatMessaeAPIType[]) => void;
type StatusChangerSubscrubersType = (status: StatusType) => void;
export type StatusType =  'pending' | 'ready' | 'error';
 type SubscrubeType = 'message-reseve' | 'status-change';