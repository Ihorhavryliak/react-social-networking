import {adMessegeActionCreater, updateMesegeActionCreater} from '../../redux/dialogs-reducer'
import Dialog from './Dialogs';
import {connect} from 'react-redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';




let mapStateToProps = (state) => {
  return ({
    dialogsPage: state.dialogsPage,

  })
}

let mapDispachToProps = (dispatch) => {
  return {
    updateMesege: (newText) => {dispatch(updateMesegeActionCreater(newText))},
    adMessege: () => {dispatch(adMessegeActionCreater())}
  }
}



let AuthRedirectComponent = withAuthRedirect(Dialog);

/* const AuthRedirectComponent = (props) => {
  if (!this.props.isAuth) {return <Navigate to={'/login'}/>}
  return (
    <Dialog {...props}  />
  )
} */

const DialogsContainer = connect(mapStateToProps, mapDispachToProps)(AuthRedirectComponent);


export default compose(connect(mapStateToProps, mapDispachToProps), withAuthRedirect)(Dialog);