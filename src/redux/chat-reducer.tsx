import { Dispatch } from "react";
import { FormAction } from "redux-form";
import { chatAPI, ChatMessaeAPIType } from "../api/chat-api";
import { BaseThunkType, InfertActionsTypes } from "./redux-store";
import { v1 } from 'uuid';
import { actionsUserReducer } from "./usere_reducer";

let initialState = {
  message: [] as ChatMessegeType[],
  status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionCreatsTypes): initialStateType => {
  switch (action.type) {
    case "RSN/chat/MESSAGES_RECIVE":
    
      return {
        ...state,
        message: [...state.message,
        ...action.payload.message.map(m => ({ ...m, id: v1() }))]
        /*  .filter( (m, index, arr) => index >= arr.length - 100) */
      }
    case "RSN/chat/STATUS_CHANGE":
      return {
        ...state,
        status: action.payload.status
      }
      case 'RSN/chat/RESTORE_CHAT':
        return {
          ...state,
          message: []
        }
    default:
      return state;
  }
}
// action
export const actions = {
  messageRecive: (message: ChatMessaeAPIType[]) =>({ type: 'RSN/chat/MESSAGES_RECIVE', payload: { message } } as const),
  statusChange: (status: StatusType) => ({ type: 'RSN/chat/STATUS_CHANGE', payload: { status } } as const),
  restoreMessage:  () => ({ type: 'RSN/chat/RESTORE_CHAT' } as const),
}

//thunk
let _newMassageHand: ((message: ChatMessaeAPIType[]) => void) | null = null;
const newMassageHandleCreator = (dispatch: Dispatch<{}>) => {
  if (_newMassageHand === null) {
    _newMassageHand = (message) => {
      dispatch(actions.messageRecive(message));
    }
  }
  return _newMassageHand;
}

let _statusChange: ((status: StatusType) => void) | null = null;
const statusChangeCreator = (dispatch: Dispatch<{}>) => {
  if (_statusChange === null) {
    _statusChange = (status) => {
      dispatch(actions.statusChange(status));
    }
  }
  return _statusChange;
}

export const startMessageLisiner = (): ThunkType => async (dispatch) => {
  try {
    dispatch(actionsUserReducer.toggleIsFerhing(true));
    chatAPI.start();
    chatAPI.subscrube('message-reseve', newMassageHandleCreator(dispatch));
    chatAPI.subscrube('status-change', statusChangeCreator(dispatch));
    dispatch(actionsUserReducer.toggleIsFerhing(false));
  } catch (error: any) {
    dispatch(actionsUserReducer.toggleIsFerhing(false));
    alert('Reload The Page Please. ' + error.request.response + ' ' + error);
  }
};

export const stopMessageLisiner = (): ThunkType => async (dispatch) => {
  chatAPI.stop();
  dispatch(actions.restoreMessage())
  chatAPI.ussubscrube('message-reseve', newMassageHandleCreator(dispatch));
  chatAPI.ussubscrube('status-change', statusChangeCreator(dispatch));
};
export const sendMessege = (message: string): ThunkType => async (dispatch) => {
  try {
    dispatch(actionsUserReducer.toggleIsFerhing(true));
    chatAPI.sendMessege(message);
    dispatch(actionsUserReducer.toggleIsFerhing(false));
  } catch (error: any) {
    dispatch(actionsUserReducer.toggleIsFerhing(false));
    alert('Reload The Page Please. ' + error.request.response + ' ' + error);
  }
};

//export reducer
export default chatReducer;

export type initialStateType = typeof initialState
type ActionCreatsTypes = InfertActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionCreatsTypes | FormAction>
type StatusType = 'pending' | 'ready' | 'error';
type ChatMessegeType = ChatMessaeAPIType & { id: string }