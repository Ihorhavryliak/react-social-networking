import { AppStateType } from "./redux-store"

export const getisSetDate = (state: AppStateType) => {
  return state.profilePage.isSetDate;
}