import React from 'react';
import Header, { DispatchPropaType, MapPropsType } from './Header';
import { connect } from 'react-redux';
import { logOut } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';


class HeaderContainer extends React.Component<MapPropsType & DispatchPropaType> {


  render() {
    return (
      <Header {...this.props} />
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
});

export default connect<MapPropsType, DispatchPropaType, {} , AppStateType>(mapStateToProps, {logOut})(HeaderContainer) ;