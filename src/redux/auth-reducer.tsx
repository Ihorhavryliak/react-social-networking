import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeEnum, ResultCodeForCaptchaEnum } from "../api/api";
import { authAPI } from "../api/auth-api";
import { securytyCapchaApi } from "../api/securyty-capcha-api";
import { messegeDisCount } from "./dialogs-reducer";
import { BaseThunkType, InfertActionsTypes } from "./redux-store";
import { actionsUserReducer } from "./usere_reducer";

let initialState = {
  userId: null as null | number,
  email: null as null | string,
  login: null as null | string,
  isAuth: false as boolean,
  isFeching: false as boolean,
  capcahUrl: null as null | string, // if nunn captcha is not requiret
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
    ({ type: 'RSN/auth/SET_USER_DATE', payload: { userId, email, login, isAuth } } as const),
  getCapchaUrlSuccess: (capcahUrl: string) => ({ type: 'RSN/auth/GET_CAPTHA_URLL_SUCCESS', payload: { capcahUrl } } as const)
}
//thunk
export const getAutUserDate = (): ThunkType => async (dispatch) => {
  try {
    dispatch(actionsUserReducer.toggleIsFerhing(true));
    let meData = await authAPI.me();
    if (meData.resultCode === ResultCodeEnum.Sucsses) {
      let { id, login, email } = meData.data;
      dispatch(actions.setAuthUserData(id, login, email, true));
    }
    dispatch(messegeDisCount());
    dispatch(actionsUserReducer.toggleIsFerhing(false));
  } catch (error: any) {
    dispatch(actionsUserReducer.toggleIsFerhing(false));
    dispatch(actions.setAuthUserData(null, null, null, true));
    alert('Reload The Page Please. ' + error.request.response + ' ' + error);
  }
}

export const getCapchaUrl = (): ThunkType => async (dispatch) => {
  try {
    dispatch(actionsUserReducer.toggleIsFerhing(true));
    const data = await securytyCapchaApi.getCapchaUrl();
    const capChaUrl = data.url;
    dispatch(actions.getCapchaUrlSuccess(capChaUrl))
    dispatch(actionsUserReducer.toggleIsFerhing(false));
  } catch (error: any) {
    dispatch(actionsUserReducer.toggleIsFerhing(false));
    alert('Reload The Page Please. ' + error.request.response + ' ' + error);
  }
}

export const login = (email: string, password: string, remeberMe: boolean, captcha: any): ThunkType => async (dispatch) => {
  try {
    dispatch(actionsUserReducer.toggleIsFerhing(true));
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
    dispatch(actionsUserReducer.toggleIsFerhing(false));
  } catch (error: any) {
    dispatch(actionsUserReducer.toggleIsFerhing(false));
    alert('Reload The Page Please. ' + error.request.response + ' ' + error);
  }
}

export const logOut = (): ThunkType => async (dispatch) => {
  try {
    dispatch(actionsUserReducer.toggleIsFerhing(true));
    let response = await authAPI.loginOut();
    if (response.data.resultCode === 0) {
      dispatch(actions.setAuthUserData(null, null, null, false));
    }
    dispatch(actionsUserReducer.toggleIsFerhing(false));
  } catch (error: any) {
    dispatch(actionsUserReducer.toggleIsFerhing(false));
    alert('Reload The Page Please. ' + error.request.response + ' ' + error);
  }
}

export default authReducer;

export type initialStateType = typeof initialState
type ActionCreatsTypes = InfertActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionCreatsTypes | FormAction>