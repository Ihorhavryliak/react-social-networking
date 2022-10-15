import React from 'react';
import Header from './Header';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAutUserDate, setAuthUserData } from '../../redux/auth-reducer';


class HeaderContainer extends React.Component {

  componentDidMount (){
    this.props.getAutUserDate()
  }

  render() {
    return (
      <Header {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
});


export default connect(mapStateToProps, {setAuthUserData, getAutUserDate})(HeaderContainer) ;