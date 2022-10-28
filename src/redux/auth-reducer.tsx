import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeEnum,  ResultCodeForCaptchaEnum} from "../api/api";
import { authAPI } from "../api/auth-api";
import { securytyCapchaApi } from "../api/securyty-capcha-api";
import {BaseThunkType, InfertActionsTypes } from "./redux-store";


let initialState = {
  userId: null as null| number,
  email: null as null | string ,
  login: null as null | string,
  isAuth: false  as boolean,
  isFeching: false as boolean,
  capcahUrl: null as null | string , // if nunn captcha is not requiret
}

const authReducer = (state = initialState, action: ActionCreatsTypes): initialStateType => {
  switch (action.type) {
    case "RSN/auth/SET_USER_DATE":
    case "RSN/auth/GET_CAPTHA_URLL_SUCCESS":
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }

}
// action


export const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => 
  ({type: 'RSN/auth/SET_USER_DATE', payload: { userId, email, login, isAuth }} as const),
  getCapchaUrlSuccess: (capcahUrl: string) => ({type: 'RSN/auth/GET_CAPTHA_URLL_SUCCESS', payload: {capcahUrl}} as const) 
}


//thunk

export const getAutUserDate = (): ThunkType => async (dispatch) => {
  let meData = await authAPI.me();
  if (meData.resultCode === ResultCodeEnum.Sucsses) {
    let { id, login, email } = meData.data;
    dispatch(actions.setAuthUserData(id, login, email, true));
  }

}

export const getCapchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securytyCapchaApi.getCapchaUrl();
  const capChaUrl  = data.url;
  dispatch(actions.getCapchaUrlSuccess(capChaUrl))
}

export const login = (email: string, password: string, remeberMe: boolean, captcha: any): ThunkType => async (dispatch) => {

  let data = await authAPI.login(email, password, remeberMe, captcha);

  if (data.resultCode === ResultCodeEnum.Sucsses) {
    dispatch(getAutUserDate());
  } else {
    if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequiret) {
      dispatch(getCapchaUrl());
    }
    let messege = data.messages.length > 0 ? data.messages[0] : 'Some Error';
 
    dispatch(stopSubmit('login', { _error: messege }));
  }

}

export const logOut = (): ThunkType => async (dispatch) => {
  let response = await authAPI.loginOut();
  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }

}
//export reducer
export default authReducer;

export type initialStateType = typeof initialState 
type ActionCreatsTypes = InfertActionsTypes<typeof actions> 
type ThunkType = BaseThunkType<ActionCreatsTypes | FormAction>