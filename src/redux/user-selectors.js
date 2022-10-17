import {createSelector} from 'reselect'

const getUsers = (state) => {
  return state.userPage.users;
};


export const getUsersSelectorSuper = createSelector(getUsers, (users) => {
  return users.filter(user => true);
})




export const getPageSize = (state) => {
  return state.userPage.pageSize;
};

export const getTotalUserCount = (state) => {
  return state.userPage.totalUserCount;
};



export const getCurruntPage = (state) => {
  return state.userPage.curruntPage
};


export const getSsFeching = (state) => {
  return state.userPage.isFeching
};


export const getFollowingInProgres = (state) => {
  return state.userPage.followingInProgres
};