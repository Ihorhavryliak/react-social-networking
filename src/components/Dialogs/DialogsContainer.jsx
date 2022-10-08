import React from 'react';
import {adMessegeActionCreater, updateMesegeActionCreater} from '../../redux/dialogs-reducer'
import Dialog from './Dialogs';
import {connect} from 'react-redux'


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

const DialogsContainer = connect(mapStateToProps, mapDispachToProps)(Dialog);


export default DialogsContainer;