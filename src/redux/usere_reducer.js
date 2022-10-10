const FOLLOW = 'FOLLOW';
const UNFFOLOW = 'UNFFOLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FECHING = 'TOGGLE_IS_FECHING';

let initialState = {
  users: [],
  pageSize: 5,
  totalUserCount: 0,
  curruntPage: 1,
  isFeching: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:

      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        })
      }

    case UNFFOLOW:

      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        })
      };

    case SET_USERS:
      return { ...state, users: action.users };

    case SET_CURRENT_PAGE:
      return { ...state, curruntPage: action.currentsPage };

    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUserCount: action.count };

      case TOGGLE_IS_FECHING:
        return { ...state, isFeching: action.isFeching };

    default:
      return state;
  }

}

export const followed = (userId) => ({ type: FOLLOW, userId });
export const unfollow = (userId) => ({ type: UNFFOLOW, userId });
export const setUser = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentsPage) => ({ type: SET_CURRENT_PAGE, currentsPage });
export const setUserTotalCount = (totalUserCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUserCount });

export const toggleIsFerhing = (isFeching) => ({ type: TOGGLE_IS_FECHING, isFeching: isFeching.isFeching});

export default userReducer;