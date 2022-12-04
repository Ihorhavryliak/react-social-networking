import { APIResponseType, instance } from "./api"


export const dialogsAPI = {
  getDialogs() {
    return (
      instance.get<GetDialogsArrType>('dialogs/').then(res => res.data)
    );
  },

  getListFiwhFriend (friendId: number, page: number = 1, count: number = 10) {
    return (
      instance.get<GetListFiwhFriendType>(`dialogs/${friendId}/messages?page=${page}&count=${count}`).then(res => res.data)
    );
  },
  greateDialog (friendId: number) {
    return (
      instance.put<Array<ItemListType>>('dialogs/' + friendId).then( res => res.data)
    );
  },

  sendFriandeMessege (friendId: number, body: string) {
    return (
      instance.post<SendFriandeMessegeType>(`dialogs/${friendId}/messages`, {body}).then( res => res.data)
    );
  },
  deletMyMessega (messageId: string) {
    return (
      instance.delete<DeletMyMessegaType>('dialogs/messages/' + messageId).then( res => res.data)
    )
  },
  isViewMessege (messageId: string) {
    return (
      instance.get<boolean>(`dialogs/messages/${messageId}/viewed`).then( res => res.data)
    )
  },
  messageCount () {
    return (
      instance.get<number>(`dialogs/messages/new/count`).then( res => res.data)
    )
  },
  spamMesage (messageId: string) {
    return (
      instance.post<DeletMyMessegaType>(`dialogs/messages/${messageId}/spam`).then( res => res.data)
    )
  },
  searchMessage (userId: number, date: string) {
    return (
      instance.get<Array<SearchMessageType>>(`dialogs/${userId}/messages/new?newerThen=${date}`).then( res => res.data)
    )
  },
  restoreMessage (messageId: string) {
    return(
      instance.put<DeletMyMessegaType>(`dialogs/messages/${messageId}/restore`).then( res => res.data) 
    )
  }

/*    */
}


//

/* type ItemsArray = {
addedAt: string
body: string
id: string
recipientId: number
senderId: number
senderName: string
translatedBody: null | boolean
viewed: boolean
} */

export type SearchMessageType ={ 
  addedAt: string
body: string
deletedByRecipient: boolean 

deletedBySender: boolean
distributionId: null

id: string

isSpam: boolean
recipientId: number

recipientName: string
senderId: number
senderName: string

translatedBody: null
viewed: boolean
}


type DeletMyMessegaType = {
  resultCode: number
}


type SendFriandeMessegeType = {
error: null | string
items: Array<ItemListType> 
totalCount: number
resultCode: number
messages: Array<string>
}
export type PhotosType = {
  small: string | null
  large: string | null
}

export type GetDialogsType = {
  id: number,
    userName: string,
    hasNewMessages: boolean,
    lastDialogActivityDate: string,
    lastUserActivityDate: string,
    newMessagesCount: number,
    photos: PhotosType
}
export type GetDialogsArrType = Array<GetDialogsType>;

export type ItemListType = {
  id: string,
  body: string,
  translatedBody: null | true,
  addedAt: string,
  senderId: number,
  senderName: string,
  recipientId: number,
  viewed: boolean
}

export type GetListFiwhFriendType = {
  items : Array<ItemListType>
  totalCount: number
}
