import { connect } from "react-redux";
import { followedAC, setUserAC, unfollowAC } from "../../redux/usere_reducer";
import Users from "./Users";

const mapStateToProps = (state) => {
    return {
      users: state.userPage.users
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followedAC(userId));
    },
    unfollow: (userId) => {
      dispatch(unfollowAC(userId));
    },
    setUsers: (users) => {
      dispatch(setUserAC(users.users));
      debugger
    },
  }
}


export default connect (mapStateToProps, mapDispatchToProps)(Users);