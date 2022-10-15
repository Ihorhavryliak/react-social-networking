import React from 'react';
import { connect } from "react-redux";
import { follow, getUser, setCurrentPage, toggFollowingProgres, unfollow } from "../../redux/usere_reducer";
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';



class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.curruntPage, this.props.pageSize);
  }
  onPageChange = (pageNumber) => {
    this.props.getUser(pageNumber, this.props.pageSize);
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

const mapStateToProps = (state) => {
  return {
    users: state.userPage.users,
    pageSize: state.userPage.pageSize,
    totalUserCount: state.userPage.totalUserCount,
    curruntPage: state.userPage.curruntPage,
    isFeching: state.userPage.isFeching,
    followingInProgres: state.userPage.followingInProgres
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
  connect(mapStateToProps,{ follow, unfollow, setCurrentPage, toggFollowingProgres, getUser }),
  withAuthRedirect,
)(UsersContainer);