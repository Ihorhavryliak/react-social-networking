import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { reqiaret } from '../../utils/validator';
import { creatField, GetStringKeysType, Input } from '../Common/Preloader/FormControl/FormsControl';
import { login } from '../../redux/auth-reducer';
import { Navigate } from 'react-router'
import style from './../Common/Preloader/FormControl/FormsControl.module.css'
import { AppDispatch, AppStateType } from '../../redux/redux-store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';

type LoginFormOwnPropsType = {
  capcahUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({ handleSubmit, error, capcahUrl }) => {

  return (
    <form onSubmit={handleSubmit} className={style.loginForm} >
      {creatField<LoginFormValuesKeysType>('Email', 'email', [reqiaret], Input)}
      {creatField<LoginFormValuesKeysType>('Password', 'password', [reqiaret], Input, { type: 'password' })}
      {creatField<LoginFormValuesKeysType>(undefined, 'remeberMe', [], Input, { type: 'checkbox' }, 'Remember me')}

      {capcahUrl && <img alt='captcha' src={capcahUrl} />}
      {capcahUrl && creatField('Symbols from inage', 'captcha', [reqiaret], Input, {})}

      {error && <div className={style.formSUmmeryError}>{error}</div>}
      <div><button className='ant-btn ant-btn-default'>Login</button></div>
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({ form: 'login' })(LoginForm);

// generic --
export type LoginFormValuesType = {
  email: string,
  password: string,
  remeberMe: boolean,
  captcha: string | null
}
type LoginFormValuesKeysType = GetStringKeysType<LoginFormValuesType> // email | password ...
// generic --

export const LoginPage: React.FC = (props) => {

  const capcahUrl = useSelector((state: AppStateType) => state.auth.capcahUrl);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch: AppDispatch = useDispatch()

  const onSubmin = (formData: LoginFormValuesType) => {
    dispatch(login(formData.email, formData.password, formData.remeberMe, formData.captcha))
  }
  
  if (isAuth) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmin} capcahUrl={capcahUrl} />
    </div>
  )
}

