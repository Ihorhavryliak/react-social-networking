import { instance } from "./api"

type PhotosType = {
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

export const dialogsAPI = {
  getDialogs(messege: string) {
    return (
      instance.get<GetDialogsType>('dialogs/')
    )
  }
}