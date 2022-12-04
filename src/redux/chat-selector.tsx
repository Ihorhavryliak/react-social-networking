import { AppStateType } from "./redux-store";


export const getMyUserId= (state: AppStateType) => {
  return state.auth.userId
};

export const getisAiuth= (state: AppStateType) => {
  return state.auth.isAuth
};

