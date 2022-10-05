const ADD_MESEGE = 'ADD-MESEGE';
const UPDATE_MESSEGE = 'UPDATE-MESSEGE';

const dialogsReducer = (state, action) => {
  switch (action.type) {
    case ADD_MESEGE:
      let newMesege = {id: 1, name: state.textMessege};
      state.mesegeDate.push(newMesege);
      state.textMessege = '';
      return state;
    case UPDATE_MESSEGE:
      state.textMessege = action.value;
      return state;
    default:
      return state;
  }
}

export const adMessegeActionCreater = () => ({type: ADD_MESEGE});
export const updateMesegeActionCreater = (newText) => 
  ({type: UPDATE_MESSEGE, value: newText})

export default dialogsReducer;