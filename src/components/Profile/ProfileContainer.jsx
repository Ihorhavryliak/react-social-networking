import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profile_reducer';
import Profile from './Profile';
import { useParams } from "react-router-dom";
import { usersAPI } from '../../api/api';

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.params.userId;
  
    if (!userId ) {
      userId = 2;
    }

    usersAPI.getProfile(userId)
      .then(data => {
        this.props.setUserProfile(data);
      });

  };

  render() {
    console.log({ ...this.props })
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


let WithUrlDataContainerComponent = (props) => {
  return (<ProfileContainer {...props} params={useParams()} />
  )
}

export default connect(mapStateToProps, { setUserProfile })(WithUrlDataContainerComponent);