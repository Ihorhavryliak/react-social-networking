import { AppStateType } from "./redux-store";

export const getPostDate = (state: AppStateType) => {
  return state.profilePage.postDate;
}
export const getMyPhoto = (state: AppStateType) => {
  return state.profilePage.profile?.photos.small;
}
