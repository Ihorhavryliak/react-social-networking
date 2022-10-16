import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { reqiaret } from '../../utils/validator';
import { Input } from '../Common/Preloader/FormControl/FormsControl';
import {connect} from 'react-redux'
import { login } from '../../redux/auth-reducer';
import {Navigate} from 'react-router'
import style from './../Common/Preloader/FormControl/FormsControl.module.css'
const LoginForm = (props) => {

  return (
      <form onSubmit={props.handleSubmit} >
        <div><Field placeholder={'Email'} validate={[reqiaret]} name={'email'} component={Input} /></div>
        <div><Field placeholder={'Password'} validate={[reqiaret]} 
        type={'password'} name={'password'} component={Input} /></div>
        <div><Field type={"checkbox"} name={'remeberMe'} component={Input} />Remember me</div>
      {props.error && <div className={style.formSUmmeryError}>{props.error}</div>}  
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