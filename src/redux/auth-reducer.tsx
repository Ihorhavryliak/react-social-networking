import { stopSubmit } from "redux-form";
import { authAPI, securytyCapcha } from "../api/api";

const SET_USER_DATA = 'reax-social-network/auth/SET_USER_DATE';
const GET_CAPTHA_URLL_SUCCESS = 'reax-social-network/auth/GET_CAPTHA_URLL_SUCCESS';

/* export type initialStateType = {
  userId: null| number,
  email: null | string,
  login: null | string,
  isAuth: boolean,
  isFeching: boolean,
  capcahUrl: null | string, // if nunn captcha is not requiret
}
 */
let initialState = {
  userId: null as null| number,
  email: null as null | string ,
  login: null as null | string,
  isAuth: false  as boolean,
  isFeching: false as boolean,
  capcahUrl: null as null | string , // if nunn captcha is not requiret
}

export type initialStateType = typeof initialState 

const authReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTHA_URLL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state;
  }

}

type setAuthUserDataPayloadType = {
  userId: number | null, 
  email: string | null, 
  login: string | null, 
  isAuth: boolean
}

type  setAuthUserDataActionType = {
  type: typeof SET_USER_DATA,
  payload: setAuthUserDataPayloadType
}

export const setAuthUserData 
= (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth }
});


type getCapchaUrlSuccessActionType = {
  type: typeof GET_CAPTHA_URLL_SUCCESS,
  payload: {capcahUrl: string}
}

export const getCapchaUrlSuccess = (capcahUrl: string): getCapchaUrlSuccessActionType => ({
  type: GET_CAPTHA_URLL_SUCCESS, payload: {capcahUrl}
});


export const getAutUserDate = () => async (dispatch: any) => {
  let response = await authAPI.me();
  if (response.data.resultCode === 0) {
    let { id, login, email } = response.data.data;
    dispatch(setAuthUserData(id, login, email, true));
  }

}

export const getCapchaUrl = () => async (dispatch: any) => {
  const response = await securytyCapcha.getCapchaUrl();
  const capChaUrl  = response.data.url;
  dispatch(getCapchaUrlSuccess(capChaUrl))
  
}

export const login = 
(email: string, password: string, remeberMe: boolean, captcha: any) => async (dispatch: any) => {

  let response = await authAPI.login(email, password, remeberMe, captcha);

  if (response.data.resultCode === 0) {
    dispatch(getAutUserDate());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCapchaUrl());
    }
    let messege = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error';
    dispatch(stopSubmit('login', { _error: messege }));
  }

}

export const logOut = () => async (dispatch: any) => {
  let response = await authAPI.loginOut();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }

}

export default authReducer;