import { PhotosType, PostDateType, ProfileType } from './../types/types';
import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../api/profile-api";
import { BaseThunkType, InfertActionsTypes } from './redux-store';
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
  userPhotos: [] as Array<UserPhotosType>,
}

const profileReducer = (state = initialState, action: ActionCreatersTypes): InitialStateType => {
  switch (action.type) {
    case 'RS/PROFILE/ADD_POST': {
      return {
        ...state,
        postDate: [...state.postDate, { id: 6, name: action.newPostText, count: 8 }],
      };
    }
    case 'RS/PROFILE/SET_USER_PROFILE': {
      const include = state.userPhotos.some(m => m.id === action.profile.userId);
      const dataNew = [{ id: action.profile.userId, photo: action.profile.photos.small, name: action.profile.fullName }]
      if (include) {
        return (
          {
            ...state,
            profile: action.profile
          }
        )
      } else {
        return (
          {
            ...state,
            profile: action.profile,
            userPhotos: [...state.userPhotos, ...dataNew]
          }
        )
      }
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
  try {
    const userId = getState().auth.userId;
    dispatch(actionsUserReducer.toggleIsFerhing(true));
    let data = await profileAPI.savesFrofile(proFile);
    if (data.resultCode === 0) {
      if (userId !== null) {
        dispatch(getUserProfile(userId));
      } else {
        throw new Error('User id can not be null')
      }
      dispatch(actions.closeEditForm(false))
    } else {
      dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }));
    }
    dispatch(actionsUserReducer.toggleIsFerhing(false));
  } catch (error: any) {
    dispatch(actionsUserReducer.toggleIsFerhing(false));
    alert('Reload The Page Please. ' + error.request.response + ' ' + error);
  }
}


export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  try {
    dispatch(actionsUserReducer.toggleIsFerhing(true));
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
    dispatch(actionsUserReducer.toggleIsFerhing(false));
  } catch (error: any) {
    dispatch(actionsUserReducer.toggleIsFerhing(false));
    alert('Reload The Page Please. ' + error.request.response + ' ' + error);
  }
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  try {
    dispatch(actionsUserReducer.toggleIsFerhing(true));
    let data = await profileAPI.getStaus(userId);
    dispatch(actions.setStatus(data));
    dispatch(actionsUserReducer.toggleIsFerhing(false));
  } catch (error: any) {
    dispatch(actionsUserReducer.toggleIsFerhing(false));
    alert('Reload The Page Please. ' + error.request.response + ' ' + error);
  }
}

export const upDateStatuses = (status: string): ThunkType => async (dispatch) => {
  try {
    dispatch(actionsUserReducer.toggleIsFerhing(true));
    let data = await profileAPI.upDateStatus(status)
    if (data.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
    if (data.resultCode === 1) {
      alert(data.messages[0])
    }
    dispatch(actionsUserReducer.toggleIsFerhing(false));
  } catch (error: any) {
    dispatch(actionsUserReducer.toggleIsFerhing(false));
    alert('Reload The Page Please. ' + error.request.response + ' ' + error);
  }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  try {
    dispatch(actionsUserReducer.toggleIsFerhing(true));
    let data = await profileAPI.savePhoto(file);
    dispatch(actionsUserReducer.toggleIsFerhing(false));
    if (data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(data.data.photos));
    }
  } catch (error: any) {
    dispatch(actionsUserReducer.toggleIsFerhing(false));
    alert('Reload The Page Please. ' + error.request.response + ' ' + error);
  }
}

export default profileReducer;

export type InitialStateType = typeof initialState
type ActionCreatersTypes = InfertActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionCreatersTypes | FormAction>
type UserPhotosType = {
  id: number
  photo: string | null
  name: string | null
}
