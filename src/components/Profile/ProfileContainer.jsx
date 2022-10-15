import React from 'react';
import { connect } from 'react-redux';
import { getStatus, getUserProfile, setUserProfile, upDateStatuses } from '../../redux/profile_reducer';
import Profile from './Profile';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import withRouter from '../../hoc/withProfileUrl';
import { compose } from 'redux';


class ProfileContainer extends React.Component {

  componentDidMount() {
 
    let userId = this.props.router.params.userId;
  
    if (!userId ) {
      userId = 26207;
    }

    this.props.getUserProfile(userId);
   /*  setTimeout ( () => { */
      this.props.getStatus(userId);
  /*   }, 1000 ) */
 

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


const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status
})


export default compose(
  connect(mapStateToProps, {  getUserProfile, getStatus, upDateStatuses}),
  withRouter,
  withAuthRedirect)(ProfileContainer);