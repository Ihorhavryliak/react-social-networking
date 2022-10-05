const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const profileReducer = (state, action) => {
  switch (action.type) {
    case ADD_POST:
        let newPost = {id: 5, name: state.newPostText, count: "0"};
        state.postDate.push(newPost);
        state.newPostText = '';
        return state;
    case UPDATE_NEW_POST_TEXT:
        state.newPostText = action.textNew;
        return state;
    default:
          return state;
  }

}

export const adPostActionCreat = () => ({type: ADD_POST});
export const updeteNewPostActionCreater = (text) =>
  ({type: UPDATE_NEW_POST_TEXT, textNew: text});

export default profileReducer;