import { actions } from '../../../redux/profile_reducer'

import Mypost, { MapDispatchPropsType, MapPropsType } from './Mypost';
import { connect } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store';


const mapStateToProps = (state: AppStateType)=> {
  return {
    postDate: state.profilePage.postDate,
    } as MapPropsType
} 


const MyPostContainer = 
connect<MapPropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {adPost: actions.adPostActionCreat})(Mypost);

export default MyPostContainer;