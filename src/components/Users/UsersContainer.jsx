import React from 'react';
import { connect } from "react-redux";
import { followed, setCurrentPage, setUser, setUserTotalCount, toggleIsFerhing, unfollow } from "../../redux/usere_reducer";
import Users from './Users';
import axios from 'axios';
import Preloader from '../Common/Preloader/Preloader';

class UsersContainer extends React.Component {


  componentDidMount() {
    this.props.toggleIsFerhing({ isFeching: true })
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.curruntPage}&count=${this.props.pageSize}`)
      .then(response => {
        this.props.toggleIsFerhing({ isFeching: false })
        this.props.setUser(response.data.items);
        this.props.setUserTotalCount(response.data.totalCount);
      });
  }

  onPageChange = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFerhing({ isFeching: true })
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
      this.props.toggleIsFerhing({ isFeching: false })
      this.props.setUser(response.data.items);
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
    isFeching: state.userPage.isFeching
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

export default connect(mapStateToProps, {followed, unfollow,setUser,setCurrentPage,setUserTotalCount,toggleIsFerhing,})(UsersContainer);