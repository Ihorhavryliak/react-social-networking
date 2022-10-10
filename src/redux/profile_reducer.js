const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
let initialState = {
  postDate: [
    { id: 1, name: 'How are you?', count: "6" },
    { id: 2, name: 'It\'s my first post', count: "8" },
    { id: 3, name: 'No bed', count: "8" }
  ],
  newPostText: 'text Ihoer',
  profile: null,
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
    default:
      return state;
  }

}

export const adPostActionCreat = () => ({ type: ADD_POST });
export const updeteNewPostActionCreater = (text) =>
  ({ type: UPDATE_NEW_POST_TEXT, textNew: text });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile})
export default profileReducer;