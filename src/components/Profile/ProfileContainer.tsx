import React from 'react';
import { connect } from 'react-redux';
import { getStatus, getUserProfile, savePhoto, saveProfile, upDateStatuses } from '../../redux/profile_reducer';
import Profile from './Profile';
import withRouter from '../../hoc/withProfileUrl';
import { compose } from 'redux';
import { Navigate } from "react-router-dom";
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';



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
      /*   if (!userId) {
          return <Navigate to='/login' />
        } */
    }
    
    if (!userId) {
     /*  throw new Error('Id shoud be exist in URL params or state') */
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
    let userId: number | null = +this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authoraizerUserId;
      if (!userId) {
        return <Navigate to='/login' />
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
    //  <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = DefaultState>
  connect/* <MapStatePropsType, MapDispatchPropsType, IsOwnType, AppStateType> */(mapStateToProps, { getUserProfile, getStatus, upDateStatuses, savePhoto, saveProfile }),
  withRouter
 /*  withAuthRedirect */)(ProfileContainer);


/* import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStatus, getUserProfile, savePhoto, saveProfile, upDateStatuses } from '../../redux/profile_reducer';
import Profile from './Profile';
import withRouter from '../../hoc/withProfileUrl';
import { compose } from 'redux';
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { AppStateType } from '../../redux/redux-store';
import { useSelector } from 'react-redux';




type IsOwnType = {
 
}



export const ProfileContainer: React.FC<IsOwnType> = (props) => {

  const authoraizerUserId = useSelector((state: AppStateType) => state.auth.userId);
  let getIdUser = useParams();
  
  if (getIdUser.userId === undefined) {
    getIdUser.userId = null;
  }
  debugger



  
  const refreshProfile = () => {

    let userId: number | null = +getIdUser.userId;
  debugger
    if (!userId) {
      userId = authoraizerUserId;
    }

    if (!userId) {
      console.error('Id shoud be exist in URL params or state')
    } else {
      debugger
      getUserProfile(userId);
      getStatus(userId);
    }

  }
  useEffect(() => {
    refreshProfile();
  }, [getIdUser.userId])

  const profile = useSelector((state: AppStateType) => state.profilePage.profile);



  let userId: number | null = +getIdUser.userId;

  if (!userId) {
    userId = authoraizerUserId;
    if (!userId) {
      return <Navigate to='/login' />
    }
  }

  return (
    <div >
      <h1>Profile</h1>
      <Profile isOwner={!getIdUser.userId}//

      />

    </div>
  )

}
 */



