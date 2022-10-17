import { profileAPI, usersAPI } from "../api/api";
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

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

    case SET_USER_PROFILE:{
      return (
          {...state, profile: action.profile}
        )
      }
      case SET_STATUS:{
        return (
            {...state, status: action.status}
          )
        }

    default:
      return state;
  }

}

export const adPostActionCreat = (newPostText) => ({ type: ADD_POST , newPostText});
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({ type: SET_STATUS, status});
export const deletePost = (postId) => ({ type: DELETE_POST, postId});


export const getUserProfile = (userId) => (dispatch) => {
  return (
      usersAPI.getProfile(userId)
      .then(data => {
         dispatch(setUserProfile(data));
      })
  )
}

export const getStatus = (userId) => (dispatch) => {
  return (
      profileAPI.getStaus(userId)
      .then(response => {
         dispatch(setStatus(response.data));
      })
  )
}

export const upDateStatuses = (status) => (dispatch) => {
  return (
      profileAPI.upDateStatus(status)
      .then(response => {
        if (response.data.resulCode === 0 ) {
          dispatch(setStatus(response.data));
        }
      })
  )
}

export default profileReducer;