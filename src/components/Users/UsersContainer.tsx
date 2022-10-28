import React from 'react';
import { connect } from "react-redux";
import { FilterType, follow, reqestUser,  unfollow } from "../../redux/usere_reducer";
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import { compose } from 'redux';
import { getCurruntPage, getFollowingInProgres, getPageSize, getSsFeching, getTotalUserCount, getUsersFilter, getUsersSelectorSuper } from '../../redux/user-selectors';
import { UserType } from '../../types/types';
import {  AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
  curruntPage: number,
  pageSize: number
  isFeching: boolean
  totalUserCount: number
  users: Array<UserType>
  followingInProgres: Array<number>
  filter: FilterType
}
type MapDispatchPropsType = {
  unfollow: (userId: number) => void
  follow:  (userId: number) => void
  reqestUser: (curruntPage: number, pageSize: number, fitler: FilterType) => void

}

type OwnPropsType = {
  pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const {curruntPage, pageSize, filter} = this.props;
    this.props.reqestUser(curruntPage, pageSize, filter);
  }
  onPageChange = (pageNumber: number) => {
    const {pageSize, filter} = this.props;
    this.props.reqestUser(pageNumber, pageSize, filter);
  }

  onFilterChange = (filter: FilterType) => {
    const {pageSize} = this.props;
      this.props.reqestUser(1, pageSize, filter);
  }

  render() {
    return (
      <>
      <h2>{this.props.pageTitle}</h2>
        {this.props.isFeching
          ? <Preloader /> : null}
        <Users totalUserCount={this.props.totalUserCount}
          pageSize={this.props.pageSize}
          curruntPage={this.props.curruntPage}
          onPageChange={this.onPageChange}
          users={this.props.users}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          onFilterChange={this.onFilterChange}
          /* toggFollowingProgres={this.props.toggFollowingProgres} */
          followingInProgres={this.props.followingInProgres}
        />
      </>
    )
  }
}

const mapStateToProps = (state: AppStateType):MapStatePropsType => {
  return {
    users: getUsersSelectorSuper(state),
    pageSize: getPageSize(state),
    totalUserCount: getTotalUserCount(state),
    curruntPage: getCurruntPage(state),
    isFeching: getSsFeching(state),
    followingInProgres: getFollowingInProgres(state),
    filter: getUsersFilter(state)
  }
}

/* 
const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followedAC(userId));
    },
    unfollow: (userId) => {
      dispatch(unfollowAC(userId));
    },
    setUsers: (users) => {
      dispatch(setUserAC(users));
    },
    setCurrentPage: (pageNamber) => {
      dispatch(setCurrentPageAC(pageNamber));
    },
    setTotalUserCount: (totalCount) => {
      dispatch(setUserTotalCountAC(totalCount));
    },
    toggleIsFerhing: (isFeching) => {
      dispatch(toggleIsFerhingAC(isFeching.isFeching));
    },
  }
}
 */




export default compose(
  //  <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = DefaultState>
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType >(mapStateToProps,{ follow, unfollow, reqestUser}),
 //withAuthRedirect,
)(UsersContainer);