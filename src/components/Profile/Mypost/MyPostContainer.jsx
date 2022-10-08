import React from 'react';
import StoreContext from '../../../StoreContest';
import {adPostActionCreat, updeteNewPostActionCreater} from './../../../redux/profile_reducer'
import Mypost from './Mypost';
import {connect} from 'react-redux'


const mapStateToProps = (state) => {
  return {
    postDate: state.profilePage.postDate,
    newPostText: state.profilePage.newPostText
  }
}

const mapDispachToProps = (dispatch) => {
  return {
    updeteNewPost: (text) => {
      let action = updeteNewPostActionCreater(text);
      dispatch(action);},

    adPost: () => {dispatch(adPostActionCreat());}
  }
}

const MyPostContainer = connect(mapStateToProps, mapDispachToProps)(Mypost);

export default MyPostContainer;