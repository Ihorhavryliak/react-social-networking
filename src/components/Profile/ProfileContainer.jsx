import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile, setUserProfile } from '../../redux/profile_reducer';
import Profile from './Profile';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import withRouter from '../../hoc/withProfileUrl';
import { compose } from 'redux';


class ProfileContainer extends React.Component {

  componentDidMount() {
 
    let userId = this.props.router.params.userId;
  
    if (!userId ) {
      userId = 2;
    }

    this.props.getUserProfile(userId);

  };

  render() {


    return (
      <div >
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
})


export default compose(
  connect(mapStateToProps, { setUserProfile , getUserProfile}),
  withRouter,
  withAuthRedirect)(ProfileContainer);