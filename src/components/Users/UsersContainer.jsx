import React from 'react';
import { connect } from "react-redux";
import { follow, reqestUser, setCurrentPage, toggFollowingProgres, unfollow } from "../../redux/usere_reducer";
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import { compose } from 'redux';
import { getCurruntPage, getFollowingInProgres, getPageSize, getUsers, getSsFeching, getTotalUserCount, getUsersSelectorSuper } from '../../redux/user-selectors';



class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.reqestUser(this.props.curruntPage, this.props.pageSize);
  }
  onPageChange = (pageNumber) => {
    this.props.reqestUser(pageNumber, this.props.pageSize);
  }

  render() {

    return (
      <>
        {this.props.isFeching
          ? <Preloader /> : null}
        <Users totalUserCount={this.props.totalUserCount}
          pageSize={this.props.pageSize}
          curruntPage={this.props.curruntPage}
          onPageChange={this.onPageChange}
          users={this.props.users}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          toggFollowingProgres={this.props.toggFollowingProgres}
          followingInProgres={this.props.followingInProgres}
        />
      </>
    )
  }
}

/* const mapStateToProps = (state) => {
  return {
    users: state.userPage.users,
    pageSize: state.userPage.pageSize,
    totalUserCount: state.userPage.totalUserCount,
    curruntPage: state.userPage.curruntPage,
    isFeching: state.userPage.isFeching,
    followingInProgres: state.userPage.followingInProgres
  }
} */

const mapStateToProps = (state) => {
  return {
    users: getUsersSelectorSuper(state),
    pageSize: getPageSize(state),
    totalUserCount: getTotalUserCount(state),
    curruntPage: getCurruntPage(state),
    isFeching: getSsFeching(state),
    followingInProgres: getFollowingInProgres(state)
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
  connect(mapStateToProps,{ follow, unfollow, setCurrentPage, toggFollowingProgres, reqestUser }),
 //withAuthRedirect,
)(UsersContainer);