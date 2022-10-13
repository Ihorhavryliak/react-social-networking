import React from 'react';
import { connect } from "react-redux";
import { followed, getUserThunkCreator, setCurrentPage, setUser, setUserTotalCount, toggFollowingProgres, toggleIsFerhing, unfollow } from "../../redux/usere_reducer";
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import { usersAPI } from '../../api/api';


class UsersContainer extends React.Component {


  componentDidMount() {
    this.props.getUserThunkCreator();
 /*    this.props.toggleIsFerhing({ isFeching: true })
   usersAPI.getUser(this.props.curruntPage, this.props.pageSize).then(data => {
      this.props.toggleIsFerhing({ isFeching: false })
      this.props.setUser(data.items);
      this.props.setUserTotalCount(data.totalCount);
    });; */
  }

  onPageChange = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFerhing({ isFeching: true })
    usersAPI.getUser(pageNumber, this.props.pageSize)
    .then(data => {
      this.props.toggleIsFerhing({ isFeching: false })
      this.props.setUser(data.items);
    });
  }

  render() {

    return (
      <>
        {this.props.isFeching 
        ? <Preloader />: null}
        <Users totalUserCount={this.props.totalUserCount}
          pageSize={this.props.pageSize}
          curruntPage={this.props.curruntPage}
          onPageChange={this.onPageChange}
          users={this.props.users}
          unfollow={this.props.unfollow}
          followed={this.props.followed}
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



export default connect(mapStateToProps, {followed, unfollow,setUser,
  setCurrentPage,setUserTotalCount,
  toggleIsFerhing, toggFollowingProgres, getUserThunkCreator})(UsersContainer);