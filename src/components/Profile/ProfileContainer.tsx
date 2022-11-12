import React from 'react';
import { connect } from 'react-redux';
import { getStatus, getUserProfile, savePhoto, saveProfile, upDateStatuses } from '../../redux/profile_reducer';
import Profile from './Profile';
import withRouter from '../../hoc/withProfileUrl';
import { compose } from 'redux';
import { Navigate } from "react-router-dom";
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';
import { LoginPage } from '../Login/LoginPage';



type ParamsType = {
  params: { userId: string}
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
  getUserProfile: (userId: number ) => void
  getStatus: (userId: number ) => void
  upDateStatuses: (userId: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType | null) => Promise<any>
}

type IsOwnType = {
  router: ParamsType
}

type PropsType = IsOwnType & MapPropsType & MapDispatchPropsType;

class ProfileContainer extends React.Component<PropsType> {

  refreshProfile() {
    let userId: number | null = +this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authoraizerUserId;
    }
    
    if (!userId) {
      console.error('Id shoud be exist in URL params or state')
    } else {
      this.props.getUserProfile(userId);
      this.props.getStatus(userId );
    }

  }

  componentDidMount() {
    this.refreshProfile()
  };

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      this.refreshProfile()
    }
  }


  render() {
    this.props.profile?.fullName ?  document.title = this.props.profile?.fullName : document.title = '';
    let userId: number | null = +this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authoraizerUserId;
      if (!userId) {
        return <LoginPage />
      }
    }

    return (
      
      <div >
        <h1>Profile</h1>
        <Profile {...this.props} profile={this.props.profile} status={this.props.status}
          isOwner={!this.props.router.params.userId}
          upDateStatuses={this.props.upDateStatuses}
          savePhoto={this.props.savePhoto}
          saveProfile={this.props.saveProfile}
          isFecbg={this.props.isFecbg}
        />

      </div>
    )
  }
}


const mapStateToProps = (state: AppStateType) => {
  return ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authoraizerUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    isFecbg: state.userPage.isFeching
  })
}


export default compose<React.ComponentType>(

  connect(mapStateToProps, { getUserProfile, getStatus, upDateStatuses, savePhoto, saveProfile }),
  withRouter
)(ProfileContainer);
