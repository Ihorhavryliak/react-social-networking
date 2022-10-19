import { profileAPI, usersAPI } from "../api/api";
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_ACCESS = 'SAVE_PHOTO_ACCESS';

let initialState = {
  postDate: [
    { id: 1, name: 'How are you?', count: "6" },
    { id: 2, name: 'It\'s my first post', count: "8" },
    { id: 3, name: 'No bed', count: "8" }
  ],
  profile: null,
  status: '',
}
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        postDate: [...state.postDate, { id: 5, name: action.newPostText, count: "0" }],
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
      debugger
      return (
        { ...state, profile: {...state.profile, photos: action.photos}}
      )
    }

    default:
      return state;
  }

}

export const adPostActionCreat = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_ACCESS, photos });

export const getUserProfile = (userId) => async (dispatch) => {
  let data = await usersAPI.getProfile(userId)
  dispatch(setUserProfile(data));
}

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStaus(userId);

  dispatch(setStatus(response.data));
}

export const upDateStatuses = (status) => async (dispatch) => {
  let response = await profileAPI.upDateStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
}

export const savePhoto = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
}

export default profileReducer;