import {createSelector} from 'reselect'
import { AppStateType } from './redux-store';

const getUsers = (state: AppStateType) => {
  return state.userPage.users;
};

export const getUsersSelectorSuper = createSelector(getUsers, (users) => {
  return users.filter(user => true);
})

export const getPageSize = (state: AppStateType ) => {
  return state.userPage.pageSize;
};

export const getTotalUserCount = (state: AppStateType) => {
  return state.userPage.totalUserCount;
};

export const getCurruntPage = (state: AppStateType) => {
  return state.userPage.curruntPage
};

export const getSsFeching = (state: AppStateType) => {
  return state.userPage.isFeching
};


export const getFollowingInProgres = (state: AppStateType) => {
  return state.userPage.followingInProgres
};


export const getUsersFilter = (state: AppStateType) => {
  return state.userPage.filter
};

export const getDialogsPage = (state: AppStateType) => {
  return state.dialogsPage
};
