import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { reqiaret } from '../../utils/validator';
import { creatField, GetStringKeysType, Input } from '../Common/Preloader/FormControl/FormsControl';
import {connect} from 'react-redux'
import { login } from '../../redux/auth-reducer';
import {Navigate} from 'react-router'
import style from './../Common/Preloader/FormControl/FormsControl.module.css'
import { AppStateType } from '../../redux/redux-store';

type LoginFormOwnPropsType = {
  capcahUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType > & LoginFormOwnPropsType > = ({handleSubmit, error , capcahUrl}) => {

  return (
      <form onSubmit={handleSubmit} >
         {creatField<LoginFormValuesKeysType>('Email', 'email', [reqiaret], Input)}
         {creatField<LoginFormValuesKeysType>('Password', 'password', [reqiaret], Input, {type: 'password'})}
         {creatField<LoginFormValuesKeysType>(undefined, 'remeberMe', [], Input, {type: 'checkbox'}, 'Remember me')}
         
    {capcahUrl && <img alt='captcha' src={capcahUrl} />}
    {capcahUrl && creatField('Symbols from inage', 'captcha', [reqiaret], Input, {})}

      {error && <div className={style.formSUmmeryError}>{error}</div>}  
        <div><button>Login</button></div>
      </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({form: 'login'})(LoginForm);

// login container
type MapStateType = {
  isAuth: boolean
  capcahUrl: string | null
}

type MapDispatchType = {
  login: (email: string,  password: string, remeberMe: boolean, captcha: string | null) => void
}
// generic --
export type LoginFormValuesType = {
  email: string,  
  password: string,
  remeberMe: boolean, 
  captcha: string | null
}

type LoginFormValuesKeysType = GetStringKeysType<LoginFormValuesType> // email | password ...
// generic --
const Login: React.FC<MapStateType & MapDispatchType> = (props) => {

  const onSubmin = (formData: LoginFormValuesType) => {
    props.login(formData.email, formData.password, formData.remeberMe , formData.captcha)
  }
  if(props.isAuth) {
    return <Navigate  to={'/profile'} />
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmin} capcahUrl={props.capcahUrl} />
    </div>
  )
}
const mapStateToProps = (state: AppStateType):MapStateType => ({
  isAuth: state.auth.isAuth,
  capcahUrl: state.auth.capcahUrl,
}) 

export default connect<MapStateType, MapDispatchType, unknown, AppStateType>(mapStateToProps, {login}) (Login);