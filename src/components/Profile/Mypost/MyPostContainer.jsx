import {adPostActionCreat} from '../../../redux/profile_reducer'
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

    adPost: (newPostText) => {dispatch(adPostActionCreat(newPostText));}
  }
}



const MyPostContainer = connect(mapStateToProps, mapDispachToProps)(Mypost);

export default MyPostContainer;