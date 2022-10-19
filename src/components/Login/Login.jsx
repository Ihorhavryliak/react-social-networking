import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { reqiaret } from '../../utils/validator';
import { creatField, Input } from '../Common/Preloader/FormControl/FormsControl';
import {connect} from 'react-redux'
import { login } from '../../redux/auth-reducer';
import {Navigate} from 'react-router'
import style from './../Common/Preloader/FormControl/FormsControl.module.css'

const LoginForm = ({handleSubmit, error}) => {

  return (
      <form onSubmit={handleSubmit} >
         {creatField('Email', 'email', [reqiaret], Input)}
         {creatField('Password', 'password', [reqiaret], Input, {type: 'password'})}
         {creatField(null, 'remeberMe', [], Input, {type: 'checkbox'}, 'Remember me')}
         

      {error && <div className={style.formSUmmeryError}>{error}</div>}  
        <div><button>Login</button></div>
      </form>
  )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
  const onSubmin = (formData) => {
    props.login(formData.email, formData.password, formData.remeberMe )
  }
  if(props.isAuth) {
    return <Navigate  to={'/profil'} />
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmin} />
    </div>
  )
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
}) 
export default connect(mapStateToProps, {login}) (Login);