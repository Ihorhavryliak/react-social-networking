
let subscrubers = [] as Array<SubscrubersType>;

let ws: WebSocket | null = null;

const closeHandle = () =>{
  setTimeout(createChanel, 3000);
  };

  const messageHandal = (e: MessageEvent) => {
    const newMassage = JSON.parse(e.data);
    subscrubers.forEach(s=> s(newMassage));
  };

function createChanel() {
  ws?.removeEventListener('close', closeHandle);
  ws?.close();
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  ws?.addEventListener('close', closeHandle );
  ws?.addEventListener('message', messageHandal );
};

export const chatAPI = {
  start () {createChanel();},
  stop () {
    subscrubers = [];
    ws?.removeEventListener('close', closeHandle );
    ws?.removeEventListener('message', messageHandal );
    ws?.close();
  },
  subscrube(callBack: (message: ChatMessaeType[]) => void) {
    subscrubers.push(callBack);
    return () => {
      subscrubers = subscrubers.filter(s => s !== callBack);
    }
  },
  ussubscrube (callBack: SubscrubersType) {
    subscrubers = subscrubers.filter(s => s !== callBack);
  },
  sendMessege (message: string) {
    ws?.send(message);
  },

};

export type ChatMessaeType = {
  message: string,
  photo: string,
  userId: number,
  userName: string
};

type SubscrubersType = (message: ChatMessaeType[]) => void;
