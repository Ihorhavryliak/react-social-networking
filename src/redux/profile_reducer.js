import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
  postDate: [
    { id: 1, name: 'How are you?', count: "6" },
    { id: 2, name: 'It\'s my first post', count: "8" },
    { id: 3, name: 'No bed', count: "8" }
  ],
  newPostText: 'text Ihoer',
  profile: null,
  status: '',
}
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {

      return {
        ...state,
        postDate: [...state.postDate, { id: 5, name: state.newPostText, count: "0" }],
        newPostText: ''
      };
    }
    case UPDATE_NEW_POST_TEXT:{
      return {
        ...state,
        newPostText: action.textNew
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

export const adPostActionCreat = () => ({ type: ADD_POST });
export const updeteNewPostActionCreater = (text) =>({ type: UPDATE_NEW_POST_TEXT, textNew: text });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({ type: SET_STATUS, status});

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