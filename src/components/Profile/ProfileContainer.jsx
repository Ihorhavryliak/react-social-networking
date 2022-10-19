import React from 'react';
import { connect } from 'react-redux';
import { getStatus, getUserProfile, savePhoto, upDateStatuses } from '../../redux/profile_reducer';
import Profile from './Profile';
import withRouter from '../../hoc/withProfileUrl';
import { compose } from 'redux';
import { Navigate, useHistory } from "react-router-dom";
import Preloader from '../Common/Preloader/Preloader';

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authoraizerUserId;
      /*   if (!userId) {
          return <Navigate to='/login' />
        } */
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile()
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      this.refreshProfile()
    }

  }


  render() {

    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authoraizerUserId;
      if (!userId) {
        return <Navigate to='/login' />
      }
    }

    return (
      <div >
        <Profile {...this.props} profile={this.props.profile} status={this.props.status}
          isOwner={!this.props.router.params.userId}
          upDateStatuses={this.props.upDateStatuses}
          savePhoto={this.props.savePhoto}
        />

      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authoraizerUserId: state.auth.userId,
    isAuth: state.auth.isAuth
  })
}


export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, upDateStatuses, savePhoto }),
  withRouter
 /*  withAuthRedirect */)(ProfileContainer);