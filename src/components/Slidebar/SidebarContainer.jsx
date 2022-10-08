
import Sidebar from './Sidebar'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    sidebarBlockFrends: state.sidebarBlockFrends,
  }
}

const mapDispachToProps = (dispatch) => {
  return {

  }
}

const SidebarContainer = connect(mapStateToProps, mapDispachToProps)(Sidebar);

export default SidebarContainer;