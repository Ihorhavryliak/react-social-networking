import {actions} from '../../redux/dialogs-reducer'
import Dialog from './Dialogs';
import {connect} from 'react-redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import React from 'react';



let mapStateToProps = (state: AppStateType) => {
  return ({
    dialogsPage: state.dialogsPage,
  })
}

/* const AuthRedirectComponent = (props) => {
  if (!this.props.isAuth) {return <Navigate to={'/login'}/>}
  return (
    <Dialog {...props}  />
  )
} */



export default compose<React.ComponentType>(connect(mapStateToProps, {...actions}), 
withAuthRedirect)(Dialog);