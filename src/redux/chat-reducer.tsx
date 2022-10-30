import { Dispatch } from "react";
import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeEnum,  ResultCodeForCaptchaEnum} from "../api/api";
import { authAPI } from "../api/auth-api";
import { chatAPI, ChatMessaeType } from "../api/chat-api";
import { securytyCapchaApi } from "../api/securyty-capcha-api";
import {BaseThunkType, InfertActionsTypes } from "./redux-store";


let initialState = {
  message: [] as ChatMessaeType[],
  
}

const chatReducer = (state = initialState, action: ActionCreatsTypes): initialStateType => {

  switch (action.type) {
    case "RSN/chat/MESSAGES_RECIVE":
      return {
        ...state,
        message: [...state.message, ...action.payload.message]
      }
    default:
      return state;
  }

}
// action


export const actions = {
  messageRecive: (message: ChatMessaeType[]) => 
  ({type: 'RSN/chat/MESSAGES_RECIVE', payload: {message}} as const),
}


//thunk
let _newMassageHand: ((message: ChatMessaeType[]) => void) | null = null;

const newMassageHandleCreator = (dispatch: Dispatch<({})>) => {
  if (_newMassageHand === null) {
       _newMassageHand = (message) => {
           dispatch(actions.messageRecive(message));
      }
  }
  
  return _newMassageHand;

}

export const startMessageLisiner = (): ThunkType => async (dispatch) => {

    chatAPI.start();
    chatAPI.subscrube(newMassageHandleCreator(dispatch));
};

export const stopMessageLisiner = (): ThunkType => async (dispatch) => {
  chatAPI.ussubscrube(newMassageHandleCreator(dispatch));
  chatAPI.stop();
};
export const sendMessege = (message: string): ThunkType => async (dispatch) => {
  chatAPI.sendMessege(message);
};

//export reducer
export default chatReducer;

export type initialStateType = typeof initialState 
type ActionCreatsTypes = InfertActionsTypes<typeof actions> 
type ThunkType = BaseThunkType<ActionCreatsTypes | FormAction>