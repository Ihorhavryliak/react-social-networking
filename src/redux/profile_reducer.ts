import { PhotosType, PostDateType, ProfileType } from './../types/types';
import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../api/profile-api";
import {  BaseThunkType, InfertActionsTypes } from './redux-store';
import { actionsUserReducer } from './usere_reducer';


let initialState = {
  postDate: [
    { id: 1, name: 'How are you?', count: 6 },
    { id: 2, name: 'It\'s my first post', count: 8 },
    { id: 3, name: 'No bed', count: 8 }
  ] as Array<PostDateType>,
  profile: null as ProfileType | null,
  status: '',
  isFecbg: false,
  isSetDate: false,
}

const profileReducer = (state = initialState, action: ActionCreatersTypes): InitialStateType => {
  switch (action.type) {
    case 'RS/PROFILE/ADD_POST': {
      return {
        ...state,
        postDate: [...state.postDate, { id: 5, name: action.newPostText, count: 0 }],
      };
    }

    case 'RS/PROFILE/SET_USER_PROFILE': {
      return (
        { ...state, profile: action.profile }
      )
    }

    case 'RS/PROFILE/SET_STATUS': {
      return (
        { ...state, status: action.status }
      )
    }
    case 'RS/PROFILE/DELETE_POST': {
      return (
        { ...state, postDate: state.postDate.filter(p => p.id !== action.postId) }
      )
    }

    case 'RS/PROFILE/SAVE_PHOTO_ACCESS': {
      return (
        { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
      )
    }

    case 'RS/PROFILE/CLOSE_FORM_EDIT': {
      return (
        { ...state, isSetDate: action.payload }
      )
    }

    default:
      return state;
  }

}
// Sum of Action Create
export const actions = {
  adPostActionCreat: (newPostText: string) => ({ type: 'RS/PROFILE/ADD_POST', newPostText } as const),
  setUserProfile: (profile: ProfileType) => ({ type: 'RS/PROFILE/SET_USER_PROFILE', profile } as const),
  setStatus: (status: string) => ({ type: 'RS/PROFILE/SET_STATUS', status } as const),
  deletePost: (postId: number) => ({ type: 'RS/PROFILE/DELETE_POST', postId } as const),
  savePhotoSuccess: (photos: PhotosType) => ({ type: 'RS/PROFILE/SAVE_PHOTO_ACCESS', photos } as const),
  closeEditForm: (isSetDate: boolean) => ({ type: 'RS/PROFILE/CLOSE_FORM_EDIT', payload: isSetDate } as const),
}

//thunks
export const saveProfile = (proFile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId;

  /* dispatch(actionsUserReducer.toggleIsFerhing(true)); */
  let data = await profileAPI.savesFrofile(proFile);
/*   dispatch(actionsUserReducer.toggleIsFerhing(false)); */

  if (data.resultCode === 0) {
    if (userId !== null) {
      dispatch(getUserProfile(userId));
    } else {
      throw new Error('User id can not be null')
    }
    dispatch(actions.closeEditForm(false))
  } else {
    // on field eroor: dispatch(stopSubmit('edit-profile', { 'contacts': {'facebook': response.data.messages[0] }}));
/*     dispatch(stopSubmit('edit-profile', { 'contacts': {'facebook': data.messages[0] }})); */
       /*  dispatch(stopSubmit('edit-profile', {'aboutMe': data.messages[0], 'fullName': data.messages[0] })); */

    dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }));
   /*  return Promise.reject(data.messages[0]) */
  }


}


export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  try {
/*     dispatch(actionsUserReducer.toggleIsFerhing(true)); */
    let data = await profileAPI.getProfile(userId);
/*     dispatch(actionsUserReducer.toggleIsFerhing(false)); */
    dispatch(actions.setUserProfile(data));
  } catch (error) {

    /* alert('404 page is not defind') */
  }

}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getStaus(userId);
  dispatch(actions.setStatus(data));
}

export const upDateStatuses = (status: string): ThunkType => async (dispatch) => {
  try {
    let data = await profileAPI.upDateStatus(status)
    if (data.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  } catch (error) {
    // alert()
    /* alert('404 page is not defind') */
  }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  dispatch(actionsUserReducer.toggleIsFerhing(true));
  let data = await profileAPI.savePhoto(file);
  dispatch(actionsUserReducer.toggleIsFerhing(false));
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos));
  }
}

export default profileReducer;

export type InitialStateType = typeof initialState
type ActionCreatersTypes = InfertActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionCreatersTypes | FormAction>