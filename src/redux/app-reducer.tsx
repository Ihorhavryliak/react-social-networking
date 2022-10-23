import { getAutUserDate } from "./auth-reducer";

const INITICIAL_USER = 'INITICIAL_USER';

export type InitialStateType = {
  initial: boolean,
}

let initialState: InitialStateType = {
  initial: false,
}

const appReudcer = (state = initialState, action: any): InitialStateType => {
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

export type InitiationSuccedActionType = {
  type: typeof INITICIAL_USER
}

export const initiationSucced = () :InitiationSuccedActionType => ({ type: INITICIAL_USER });


export const initilizeAPP = () => (dispatch: any) => {
  let promis = dispatch(getAutUserDate());
  Promise.all([promis]).then(() => {
    dispatch(initiationSucced())
  })

}





export default appReudcer;