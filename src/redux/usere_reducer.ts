import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { updateObjectArr } from "../utils/object_helper/object-helper";

const FOLLOW = 'FOLLOW';
const UNFFOLOW = 'UNFFOLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FECHING = 'TOGGLE_IS_FECHING';
const TOGGLE_IS_FOLLOWING_PROGRES = 'TOGGLE_IS_FOLLOWING_PROGRES';





let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUserCount: 0,
  curruntPage: 1,
  isFeching: false,
  followingInProgres: [] as Array<number>, // array of users id
}

export type InitialStateType = typeof initialState;

const userReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case FOLLOW:

      return {
        ...state,
        users: updateObjectArr(state.users, action.userId, 'id', { followed: true })
      }

    case UNFFOLOW:

      return {
        ...state,
        users: updateObjectArr(state.users, action.userId, 'id', { followed: false })
      };

    case SET_USERS:
      return { ...state, users: action.users };

    case SET_CURRENT_PAGE:
      return { ...state, curruntPage: action.currentsPage };

    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUserCount: action.count };

    case TOGGLE_IS_FECHING:
      return { ...state, isFeching: action.isFeching };

    case TOGGLE_IS_FOLLOWING_PROGRES:
      return {
        ...state,
        followingInProgres: action.isFeching
          ? [...state.followingInProgres, action.userId]
          : [...state.followingInProgres.filter(id => id !== action.userId)]
      }

    default:
      return state;
  }

}

type FollowedSuccessType = {
  type: typeof FOLLOW,
  userId: number
}
export const followedSuccess = (userId: number): FollowedSuccessType => ({ type: FOLLOW, userId });
type UnfollowSuccessType = {
  type: typeof UNFFOLOW,
  userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({ type: UNFFOLOW, userId });
type SetUserType = {
  type: typeof SET_USERS,
  users: Array<UserType>
}
export const setUser = (users: Array<UserType>): SetUserType => ({ type: SET_USERS, users });
type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE,
  currentsPage: number
}
export const setCurrentPage = (currentsPage: number): SetCurrentPageType => ({ type: SET_CURRENT_PAGE, currentsPage });
type SetUserTotalCountType = {
  type: typeof SET_TOTAL_USERS_COUNT,
  count: number
}
export const setUserTotalCount = (totalUserCount: number): SetUserTotalCountType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUserCount });
type ToggleIsFerhingType = {
  type: typeof TOGGLE_IS_FECHING,
  isFeching: boolean
}
export const toggleIsFerhing = (isFeching: boolean): ToggleIsFerhingType => ({ type: TOGGLE_IS_FECHING, isFeching: isFeching });
type YoggFollowingProgresType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRES
  isFeching: boolean
  userId: number
}
export const toggFollowingProgres = (isFeching: boolean, userId: number): YoggFollowingProgresType => ({ type: TOGGLE_IS_FOLLOWING_PROGRES, isFeching: isFeching, userId });

export const reqestUser = (page: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFerhing(true));
    dispatch(setCurrentPage(page));
    let data = await usersAPI.getUser(page, pageSize);
    dispatch(toggleIsFerhing(false));
    dispatch(setUser(data.items));
    dispatch(setUserTotalCount(data.totalCount));

  }
}

const followUnfolowFlow = async (dispatch: any, userId: number, apiMetod: any, actionCreater: any) => {
  dispatch(toggFollowingProgres(true, userId));
  let response = await apiMetod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreater(userId));
  }
  dispatch(toggFollowingProgres(false, userId));
}

export const follow = (userId: number) => {

  return async (dispatch: any) => {
    followUnfolowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followedSuccess)
  }
}

export const unfollow = (userId: number) => {
  return async (dispatch: any) => {
    followUnfolowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
  }
}


export default userReducer;