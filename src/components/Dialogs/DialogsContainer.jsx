import {adMessegeActionCreater} from '../../redux/dialogs-reducer'
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
    adMessege: (newMessegeBoddy) => {dispatch(adMessegeActionCreater(newMessegeBoddy))}
  }
}




/* const AuthRedirectComponent = (props) => {
  if (!this.props.isAuth) {return <Navigate to={'/login'}/>}
  return (
    <Dialog {...props}  />
  )
} */




export default compose(connect(mapStateToProps, mapDispachToProps), withAuthRedirect)(Dialog);