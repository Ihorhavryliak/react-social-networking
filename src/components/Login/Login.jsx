import React from 'react';


const LoginForm = (props) => {
  return (
      <form >
        <div><input placeholder={'login'} type="text" /></div>
        <div><input placeholder={'Password'} type="text" /></div>
        <div><input type="checkbox" />Remember me</div>
        <div><button>Login</button></div>
      </form>
  )
}

const Login = (props) => {
  return (
    <div>
      <h1>Login</h1>
      <Login />
    </div>
  )
}

export default Login;