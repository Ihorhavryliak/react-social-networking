
import Sidebar from './Sidebar'
import {connect} from 'react-redux'
import { AppStateType } from '../../redux/redux-store'




const mapStateToProps = (state: AppStateType) => {
  return {
    sidebarBlockFrends: state.sidebarBlockFrends,
  }
}

/* const mapDispachToProps = (dispatch: any) => {
  return {

  }
} */

const SidebarContainer = connect(mapStateToProps, /* mapDispachToProps */)(Sidebar);

export default SidebarContainer;