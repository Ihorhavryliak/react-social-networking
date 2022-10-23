import { toggleIsFerhing } from './usere_reducer';
import { PhotosType, PostDateType, ProfileType } from './../types/types';
import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_ACCESS = 'SAVE_PHOTO_ACCESS';

let initialState = {
  postDate: [
    { id: 1, name: 'How are you?', count: 6 },
    { id: 2, name: 'It\'s my first post', count: 8 },
    { id: 3, name: 'No bed', count: 8}
  ] as Array<PostDateType>,
  profile: null as ProfileType | null,
  status: '',
  isFecbg: false,
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        postDate: [...state.postDate, { id: 5, name: action.newPostText, count: 0 }],
      };
    }

    case SET_USER_PROFILE: {
      return (
        { ...state, profile: action.profile }
      )
    }
  
    case SET_STATUS: {
      return (
        { ...state, status: action.status }
      )
    }
    case DELETE_POST: {
      return (
        { ...state, postDate: state.postDate.filter(p => p.id !== action.postId) }
      )
    }

    case SAVE_PHOTO_ACCESS: {
      return (
        { ...state, profile: {...state.profile, photos: action.photos} as ProfileType} 
      )
    }

    default:
      return state;
  }

}

type AdPostActionCreatType = {
  type: typeof ADD_POST, 
  newPostText: string
}
export const adPostActionCreat = (newPostText: string): AdPostActionCreatType => ({ type: ADD_POST, newPostText });
type SetUserProfileType = {
  type: typeof SET_USER_PROFILE, 
  profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({ type: SET_USER_PROFILE, profile });
type SetStatusType = {
  type: typeof SET_STATUS, 
  status: string
}
export const setStatus = (status: string): SetStatusType => ({ type: SET_STATUS, status });
type DeletePostType = {
  type: typeof DELETE_POST, 
  postId: number
}
export const deletePost = (postId: number): DeletePostType => ({ type: DELETE_POST, postId });
type SavePhotoSuccessType = {
  type: typeof SAVE_PHOTO_ACCESS, 
  photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({ type: SAVE_PHOTO_ACCESS, photos });





export const saveProfile = (proFile: ProfileType) => async (dispatch: any, getState: any) => {
 const userId = getState().auth.userId
  let response = await profileAPI.savesFrofile(proFile);
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
  // on field eroor: dispatch(stopSubmit('edit-profile', { 'contacts': {'facebook': response.data.messages[0] }}));
    dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
    return Promise.reject(response.data.messages[0])
  }


}

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  try {
    dispatch(toggleIsFerhing(true));
    let data = await usersAPI.getProfile(userId);
    dispatch(toggleIsFerhing(false));
    dispatch(setUserProfile(data));
  } catch (error) {

    /* alert('404 page is not defind') */
  }
 
}

export const getStatus = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getStaus(userId);

  dispatch(setStatus(response.data));
}

export const upDateStatuses = (status: string) => async (dispatch: any) => {
  try{
  
  let response = await profileAPI.upDateStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
} catch (error) {
 // alert()
 /* alert('404 page is not defind') */
}
}

export const savePhoto = (file: any) => async (dispatch: any) => {
  let response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
}


export default profileReducer;