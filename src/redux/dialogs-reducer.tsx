import { FormAction } from "redux-form";
import { dialogsAPI, GetDialogsArrType, GetListFiwhFriendType, ItemListType, PhotosType, SearchMessageType } from "../api/dialogs-api"
import { BaseThunkType, InfertActionsTypes } from "./redux-store"
import { actionsUserReducer } from "./usere_reducer";

export type DialogsKeyType = {
  id: number | null;
  userName: string | null;
  hasNewMessages: boolean | null;
  lastDialogActivityDate: string | null;
  lastUserActivityDate: string | null;
  newMessagesCount: number | null;
  photos: PhotosType | null;
}
type SavePageType = {
  id: number
  pageNumber: number
  selectPage: number
}
const initialState = {
  dialogs: [] as Array<DialogsKeyType>,
  items: [] as Array<ItemListType>,
  isDeleteMessage: false as boolean,
  isDilogLoad: false as boolean,
  isMeesageVewe: false as boolean,
  messegaCount: 0 as number,
  searchMEssage: [] as Array<SearchMessageType>,
  isSearchActivate: false as boolean,
  isRestoreDiologs: false,
  totalCountpageMessage: 0 as number,
  saveFilterPage: [{ id: 0, pageNumber: 1, selectPage: 10 }] as Array<SavePageType>
}


export type InitialStateType = typeof initialState;

const dialogReducer = (state = initialState, action: ActionCreatsTypes): InitialStateType => {

  switch (action.type) {
    case "RSN/DIALOGS/DIALOGS_RESIVER":
      return { ...state, dialogs: action.payload };
    case "RSN/DIALOGS/MESSEGES_FRIEND_RECIVER":
      return { ...state, items: action.payload };
    case "RSN/DIALOGS/DELETE_MESSEGE":
      return {
        ...state,
        items: state.items.map(m => {
          if (m.id === action.payload) {
            return { ...m, translatedBody: true }
          }
          return m;
        })
      };
    case "RSN/DIALOGS/RESTORE_MESSAGE":
      return {
        ...state,
        items: state.items.map(obj => {
          if (obj.id === action.payload) {
            return { ...obj, translatedBody: null }
          }
          return obj;
        })
      };
    case "RSN/DIALOGS/IS_DILOG-LOAD":
      return { ...state, isDilogLoad: action.payload };
    case "RSN/DIALOGS/MESSEAGE_VIEW":
      return { ...state, isMeesageVewe: action.payload };
    case "RSN/DIALOGS/MESSEGE_COUNT":
      return { ...state, messegaCount: action.payload };
    case "RSN/DIALOGS/SET_SEARCH_MESSAGE":
      return { ...state, 
        saveFilterPage: [...state.saveFilterPage],
        searchMEssage: action.payload,
      };
    case "RSN/DIALOGS/SET_SEARCH_ACTIVE":
      return { ...state, isSearchActivate: action.payload };
    case "RSN/DIALOGS/SET_PAGE_COUNT":
      return { ...state, totalCountpageMessage: action.payload };
    case "RSN/SET_PAGE_NUMBER":
      const isSameFrien = state.saveFilterPage.some(s => s.id === action.friendId);
      const newObj = [{ id: action.friendId, pageNumber: action.page, selectPage: action.selectPage }]
      if (!isSameFrien) {
        return { ...state, saveFilterPage: [...state.saveFilterPage, ...newObj] }
      } else {
        return {
          ...state, saveFilterPage: state.saveFilterPage.map(m => {
            if (m.id === action.friendId) {
              return { ...m, id: action.friendId, pageNumber: action.page, selectPage: action.selectPage }
            }
            return m
          })
        }
      }

    default:
      return state
  }
}

export const actionsDialog = {
  dialigsRecive: (dialogs: GetDialogsArrType) => ({ type: 'RSN/DIALOGS/DIALOGS_RESIVER', payload: dialogs } as const),
  messagesFriedRecive: (items: Array<ItemListType>) => ({ type: 'RSN/DIALOGS/MESSEGES_FRIEND_RECIVER', payload: items } as const),
  deleteMessege: (messageId: string) => ({ type: 'RSN/DIALOGS/DELETE_MESSEGE', payload: messageId } as const),
  isDialogLoad: (bol: boolean) => ({ type: 'RSN/DIALOGS/IS_DILOG-LOAD', payload: bol } as const),
  messageView: (b: boolean) => ({ type: 'RSN/DIALOGS/MESSEAGE_VIEW', payload: b } as const),
  countMessege: (b: number) => ({ type: 'RSN/DIALOGS/MESSEGE_COUNT', payload: b } as const),
  reciveSearchMessege: (date: Array<SearchMessageType>) => ({ type: 'RSN/DIALOGS/SET_SEARCH_MESSAGE', payload: date } as const),
  searchActive: (date: boolean) => ({ type: 'RSN/DIALOGS/SET_SEARCH_ACTIVE', payload: date } as const),
  restoreMessage: (messageId: string) => ({ type: 'RSN/DIALOGS/RESTORE_MESSAGE', payload: messageId } as const),
  pageCount: (page: number) => ({ type: 'RSN/DIALOGS/SET_PAGE_COUNT', payload: page } as const),
  pageNumber: (friendId: number, page: number, selectPage: number) => ({ type: 'RSN/SET_PAGE_NUMBER', page, selectPage, friendId } as const),
}


export const setDialog = (): ThunkType => async (dispatch) => {
  try{ 
  dispatch(actionsUserReducer.toggleIsFerhing(true));
  const data = await dialogsAPI.getDialogs();
  dispatch(actionsDialog.dialigsRecive(data));
  dispatch(actionsUserReducer.toggleIsFerhing(false));
} catch (error: any) {
  dispatch(actionsUserReducer.toggleIsFerhing(false));
   alert('Reload The Page Please. ' +  error.request.response + ' ' + error) ;
 }

}

export const setItemFriendMessages = (friendId: number, page: number = 1, selectPage: number = 10): ThunkType => async (dispatch) => {
  try{ 
  dispatch(actionsUserReducer.toggleIsFerhing(true));
  const data = await dialogsAPI.getListFiwhFriend(friendId, page, selectPage);
  dispatch(actionsDialog.messagesFriedRecive(data.items));
  dispatch(actionsDialog.pageCount(data.totalCount));
  dispatch(actionsDialog.pageNumber(friendId, page, selectPage));
  dispatch(actionsUserReducer.toggleIsFerhing(false));
} catch (error: any) {
  dispatch(actionsUserReducer.toggleIsFerhing(false));
   alert('Reload The Page Please. ' +  error.request.response + ' ' + error) ;
 }
}

export const createDiologs = (friendId: number): ThunkType => async (dispatch) => {
  try{ 
  dispatch(actionsUserReducer.toggleIsFerhing(true));
  const items = await dialogsAPI.greateDialog(friendId);
  dispatch(actionsDialog.messagesFriedRecive(items));
  dispatch(actionsUserReducer.toggleIsFerhing(false));
} catch (error: any) {
  dispatch(actionsUserReducer.toggleIsFerhing(false));
   alert('Reload The Page Please. ' +  error.request.response + ' ' + error) ;
 }
}

export const sentFriendMesege = (friendId: number, message: string): ThunkType => async (dispatch) => {
  try{ 
  dispatch(actionsUserReducer.toggleIsFerhing(true));
  const resp = await dialogsAPI.sendFriandeMessege(friendId, message);
  dispatch(setItemFriendMessages(friendId));
  dispatch(actionsUserReducer.toggleIsFerhing(false));
} catch (error: any) {
  dispatch(actionsUserReducer.toggleIsFerhing(false));
   alert('Reload The Page Please. ' +  error.request.response + ' ' + error) ;
 }
}

export const deleteMyMessage = (messageId: string): ThunkType => async (dispatch) => {
  try{ 
  dispatch(actionsUserReducer.toggleIsFerhing(true));
  dispatch(actionsDialog.deleteMessege(messageId));
  const data = await dialogsAPI.deletMyMessega(messageId);
  dispatch(actionsUserReducer.toggleIsFerhing(false));
} catch (error: any) {
  dispatch(actionsUserReducer.toggleIsFerhing(false));
   alert('Reload The Page Please. ' +  error.request.response + ' ' + error) ;
 }
}

export const restorMessage = (messageId: string): ThunkType => async (dispatch) => {
  try{ 
    dispatch(actionsUserReducer.toggleIsFerhing(true));
  dispatch(actionsDialog.restoreMessage(messageId))
  const response = await dialogsAPI.restoreMessage(messageId);
  dispatch(actionsUserReducer.toggleIsFerhing(false));
} catch (error: any) {
  dispatch(actionsUserReducer.toggleIsFerhing(false));
   alert('Reload The Page Please. ' +  error.request.response + ' ' + error) ;
 }
}
export const isMessageView = (messageId: string): ThunkType => async (dispatch) => {
  const isMesView = await dialogsAPI.isViewMessege(messageId);
  dispatch(actionsDialog.messageView(isMesView))
}

export const messegeDisCount = (): ThunkType => async (dispatch) => {
  const count = await dialogsAPI.messageCount();
  dispatch(actionsDialog.countMessege(count));
}

export const spamSendMessage = (messegeId: string): ThunkType => async (dispatch) => {
  try{ 
    dispatch(actionsUserReducer.toggleIsFerhing(true));
  const count = await dialogsAPI.spamMesage(messegeId);
  dispatch(actionsUserReducer.toggleIsFerhing(false));
} catch (error: any) {
  dispatch(actionsUserReducer.toggleIsFerhing(false));
   alert('Reload The Page Please. ' +  error.request.response + ' ' + error) ;
 }
}



export const reciveDataMessege = (userID: number, data: string, isSeartch: boolean): ThunkType => async (dispatch) => {
  try{ 
    dispatch(actionsUserReducer.toggleIsFerhing(true));
   const listMesege = await dialogsAPI.searchMessage(userID, data);
   dispatch(actionsDialog.reciveSearchMessege(listMesege));
   dispatch(actionsDialog.searchActive(isSeartch));
   dispatch(actionsUserReducer.toggleIsFerhing(false));
 } catch (error: any) {
  dispatch(actionsUserReducer.toggleIsFerhing(false));
   alert('Reload The Page Please. ' +  error.request.response + ' ' + error) ;
 }
 }

export default dialogReducer;

type ActionCreatsTypes = InfertActionsTypes<typeof actionsDialog>
type ThunkType = BaseThunkType<ActionCreatsTypes | FormAction>