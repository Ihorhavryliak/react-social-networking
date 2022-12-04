import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { getAutUserDate } from "./auth-reducer";
import { AppStateType, InfertActionsTypes } from "./redux-store";


let initialState = {
  initial: false,
}

type InitialStateType = typeof initialState;

const appReudcer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case "SN/APP/INITICIAL_USER":
      return {
        ...state,
        initial: true,
      }
    default:
      return state;
  }
}

export const action = {
  initiationSucced: () => ({ type: 'SN/APP/INITICIAL_USER'}) as const,
}

type ActionTypes = InfertActionsTypes<typeof action>

type DispatchType = Dispatch<ActionTypes> 
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes >

export const initilizeAPP = ()  => (dispatch: DispatchType) => {
  
  // @ts-ignore
  let promis = dispatch(getAutUserDate());
  Promise.all([promis]).then(() => {
    dispatch(action.initiationSucced())
  })
}





export default appReudcer;