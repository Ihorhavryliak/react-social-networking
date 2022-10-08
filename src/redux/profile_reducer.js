const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
  postDate: [
    {id: 1, name: 'How are you?', count: "6"}, 
    {id: 2, name: 'It\'s my first post', count: "8"}, 
    {id: 3, name: 'No bed', count: "8"}
  ],
  newPostText: 'text Ihoer'
}
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {

        return {...state,
          postDate: [...state.postDate, {id: 5, name: state.newPostText, count: "0"}],
          newPostText: ''
        };

      }
    case UPDATE_NEW_POST_TEXT: {
        return {...state,
          newPostText: action.textNew
        };

      }
    default:
          return state;
  }

}

export const adPostActionCreat = () => ({type: ADD_POST});
export const updeteNewPostActionCreater = (text) =>
  ({type: UPDATE_NEW_POST_TEXT, textNew: text});

export default profileReducer;