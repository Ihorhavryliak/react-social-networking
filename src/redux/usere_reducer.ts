import { Dispatch } from "redux";
import { UserType } from "../types/types";
import { updateObjectArr } from "../utils/object_helper/object-helper";
import { BaseThunkType, InfertActionsTypes } from "./redux-store";
import { usersAPI } from '../api/users-api';
import { FormAction } from 'redux-form';


let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUserCount: 0,
  curruntPage: 1,
  isFeching: false,
  followingInProgres: [] as Array<number>, // array of users id
  filter: {
    term: '',
    friend: null as null | boolean,
  },
}



const userReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'RS/USER/FOLLOW':

      return {
        ...state,
        users: updateObjectArr(state.users, action.userId, 'id', { followed: true })
      }

    case 'RS/USER/UNFFOLOW':

      return {
        ...state,
        users: updateObjectArr(state.users, action.userId, 'id', { followed: false })
      };

    case 'RS/USER/SET_USERS':
      return { ...state, users: action.users };

    case 'RS/USER/SET_CURRENT_PAGE':
      return { ...state, curruntPage: action.currentsPage };

    case 'RS/USER/SET_TOTAL_USERS_COUNT':
      return { ...state, totalUserCount: action.count };

    case 'RS/USER/TOGGLE_IS_FECHING':
      return { ...state, isFeching: action.isFeching };

    case 'RS/USER/TOGGLE_IS_FOLLOWING_PROGRES':
      return {
        ...state,
        followingInProgres: action.isFeching
          ? [...state.followingInProgres, action.userId]
          : [...state.followingInProgres.filter(id => id !== action.userId)]
      }

      case 'RS/USER/SET_FILTER':
        return { ...state, filter: action.payload };

    default:
      return state;
  }

}



export const actionsUserReducer = {
  followedSuccess: (userId: number) => ({ type: 'RS/USER/FOLLOW', userId } as const),
  unfollowSuccess: (userId: number) => ({ type: 'RS/USER/UNFFOLOW', userId } as const),
  setUser: (users: Array<UserType>) => ({ type: 'RS/USER/SET_USERS', users } as const),
  setCurrentPage: (currentsPage: number) => ({ type: 'RS/USER/SET_CURRENT_PAGE', currentsPage } as const),
  setUserTotalCount: (totalUserCount: number) => ({ type: 'RS/USER/SET_TOTAL_USERS_COUNT', count: totalUserCount } as const),
  toggleIsFerhing: (isFeching: boolean) => ({ type: 'RS/USER/TOGGLE_IS_FECHING', isFeching } as const),
  toggFollowingProgres: (isFeching: boolean, userId: number) => ({ type: 'RS/USER/TOGGLE_IS_FOLLOWING_PROGRES', isFeching, userId } as const),
  setFilter: (fitler: FilterType) => ({ type: 'RS/USER/SET_FILTER', payload: fitler } as const),
}



export const reqestUser = (page: number, pageSize: number, filter: FilterType): ThunkType => {
  return async (dispatch) => {
    dispatch(actionsUserReducer.toggleIsFerhing(true));
    dispatch(actionsUserReducer.setCurrentPage(page));
    dispatch(actionsUserReducer.setFilter(filter));
    let data = await usersAPI.getUser(page, pageSize, filter.term, filter.friend);
    dispatch(actionsUserReducer.toggleIsFerhing(false));
    dispatch(actionsUserReducer.setUser(data.items));
    dispatch(actionsUserReducer.setUserTotalCount(data.totalCount));
  }
}

const _followUnfolowFlow = async (dispatch: Dispatch<ActionTypes>, userId: number, apiMetod: any, actionCreater: (userId: number) => ActionTypes) => {
  dispatch(actionsUserReducer.toggFollowingProgres(true, userId));
  let response = await apiMetod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreater(userId));
  }
  dispatch(actionsUserReducer.toggFollowingProgres(false, userId));
}

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfolowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actionsUserReducer.followedSuccess)
  }
}

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfolowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actionsUserReducer.unfollowSuccess);
  }
}


export default userReducer;

export type InitialStateType = typeof initialState;
export type ActionTypes = InfertActionsTypes<typeof actionsUserReducer>
type ThunkType = BaseThunkType<ActionTypes | FormAction>
export type FilterType = typeof initialState.filter