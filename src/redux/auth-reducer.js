import { stopSubmit } from "redux-form";
import { authAPI, securytyCapcha } from "../api/api";

const SET_USER_DATA = 'reax-social-network/auth/SET_USER_DATE';
const GET_CAPTHA_URLL_SUCCESS = 'reax-social-network/auth/GET_CAPTHA_URLL_SUCCESS';
let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  isFeching: false,
  capcahUrl: null, // if nunn captcha is not requiret
}

const authReducer = (state = initialState, action) => {
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

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth }
});

export const getCapchaUrlSuccess = (capcahUrl) => ({
  type: GET_CAPTHA_URLL_SUCCESS, payload: {capcahUrl}
});


export const getAutUserDate = () => async (dispatch) => {
  let response = await authAPI.me();

  if (response.data.resultCode === 0) {
    let { id, login, email } = response.data.data;
    dispatch(setAuthUserData(id, login, email, true));
  }

}

export const getCapchaUrl = () => async (dispatch) => {
  const response = await securytyCapcha.getCapchaUrl();
  const capChaUrl  = response.data.url;
  dispatch(getCapchaUrlSuccess(capChaUrl))
  
}

export const login = (email, password, remeberMe, captcha) => async (dispatch) => {

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

export const logOut = () => async (dispatch) => {
  let response = await authAPI.loginOut();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }

}

export default authReducer;