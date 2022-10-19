import { usersAPI } from "../api/api";
import { updateObjectArr } from "../utils/object_helper/object-helper";

const FOLLOW = 'FOLLOW';
const UNFFOLOW = 'UNFFOLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FECHING = 'TOGGLE_IS_FECHING';
const TOGGLE_IS_FOLLOWING_PROGRES = 'TOGGLE_IS_FOLLOWING_PROGRES';

let initialState = {
  users: [],
  pageSize: 10,
  totalUserCount: 0,
  curruntPage: 1,
  isFeching: false,
  followingInProgres: [],
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:

      return {
        ...state,
        users: updateObjectArr(state.users, action.userId, 'id', {followed: true} ) 
      }

    case UNFFOLOW:

      return {
        ...state,
        users: updateObjectArr(state.users, action.userId, 'id', {followed: false} ) 
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

export const followedSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFFOLOW, userId });
export const setUser = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentsPage) => ({ type: SET_CURRENT_PAGE, currentsPage });
export const setUserTotalCount = (totalUserCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUserCount });
export const toggleIsFerhing = (isFeching) => ({ type: TOGGLE_IS_FECHING, isFeching: isFeching.isFeching });
export const toggFollowingProgres = (isFeching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRES, isFeching: isFeching, userId });

export const reqestUser = (page, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFerhing({ isFeching: true }));
    dispatch(setCurrentPage(page));
    let data = await usersAPI.getUser(page, pageSize);
    dispatch(toggleIsFerhing({ isFeching: false }));
    dispatch(setUser(data.items));
    dispatch(setUserTotalCount(data.totalCount));

  }
}

const followUnfolowFlow = async (dispatch, userId, apiMetod, actionCreater) => {
  dispatch(toggFollowingProgres(true, userId));
  let response = await apiMetod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreater(userId));
  }
  dispatch(toggFollowingProgres(false, userId));
}

export const follow = (userId) => {

  return async (dispatch) => {
    followUnfolowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followedSuccess)
  }
}

export const unfollow = (userId) => {
  return async (dispatch) => {
    followUnfolowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
  }
}


export default userReducer;