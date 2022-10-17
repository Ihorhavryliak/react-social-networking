import React from 'react';
import { connect } from 'react-redux';
import { getStatus, getUserProfile, upDateStatuses } from '../../redux/profile_reducer';
import Profile from './Profile';
import withRouter from '../../hoc/withProfileUrl';
import { compose } from 'redux';


class ProfileContainer extends React.Component {

  componentDidMount() {
 
    let userId = this.props.router.params.userId;

    if (!userId ) {
      userId = this.props.authoraizerUserId;
      
      if (!userId) {
        this.props.router.navigate('./login');
      }
    }

    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  };

  render() {
    return (
      <div >
        <Profile {...this.props} profile={this.props.profile} status={this.props.status}  
        upDateStatuses={this.props.upDateStatuses}/>
      </div>
    )
  }
}


const mapStateToProps = (state) => {

  return ( {
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authoraizerUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})

}


export default compose(
  connect(mapStateToProps, {  getUserProfile, getStatus, upDateStatuses}),
  withRouter)(ProfileContainer);