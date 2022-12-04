import { AppStateType } from "./redux-store";

export const getPostDate = (state: AppStateType) => {
  return state.profilePage.postDate;
}
export const getMyPhoto = (state: AppStateType) => {
  return state.profilePage.profile?.photos.small;
}


export const getInformDialog = (state: AppStateType) => {
  return state.dialogs.dialogs
}


export const getFrendMesseges = (state: AppStateType) => {
  return state.dialogs.items
}

export const getAllDialogs = (state: AppStateType) => {
  return state.dialogs.dialogs
}
export const getMyId = (state: AppStateType) => {
  return state.auth.userId
}

export const isDeleteMessageBoole = (state: AppStateType) => {
  return state.dialogs.isDeleteMessage
}

export const isMessegeUserView = (state: AppStateType) => {
  return state.dialogs.isMeesageVewe
}

export const getMessegeCount = (state: AppStateType) => {
  return state.dialogs.messegaCount
}
export const getisSearchActivate = (state: AppStateType) => {
  return state.dialogs.isSearchActivate
}
export const getisSearchMessege = (state: AppStateType) => {
  return state.dialogs.searchMEssage
}

export const getIsRestoreDiologs = (state: AppStateType) => {
  return state.dialogs.isRestoreDiologs
}

export const getCountPage = (state: AppStateType) => {
  return state.dialogs.totalCountpageMessage
}
export const getSaveFilterPage = (state: AppStateType) => {
  return state.dialogs.saveFilterPage
}

export const getItems = (state: AppStateType) => {
  return state.dialogs.items
}
export const getSaveUserPhotosArr = (state: AppStateType) => {
  return state.profilePage.userPhotos
}

export const getIsFeching = (state: AppStateType) => {
  return state.userPage.isFeching
}