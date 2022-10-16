import { getAutUserDate } from "./auth-reducer";

const INITICIAL_USER = 'INITICIAL_USER';

let initialState = {
  initial: false,
}

const appReudcer = (state = initialState, action) => {
  switch (action.type) {
    case INITICIAL_USER:
      return {
        ...state,
        initial: true,
      }
    default:
      return state;
  }
}

export const initiationSucced = () => ({ type: INITICIAL_USER });


export const initilizeAPP = () => (dispatch) => {
  let promis = dispatch(getAutUserDate());
  Promise.all([promis]).then(() => {
    dispatch(initiationSucced())
  })

}





export default appReudcer;