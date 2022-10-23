import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Setting from './components/Setting/Setting';
import SidebarContainer from './components/Slidebar/SidebarContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import withRouter from './hoc/withProfileUrl';
import { compose } from 'redux';
import { initilizeAPP } from './redux/app-reducer';
import Preloader from './components/Common/Preloader/Preloader';
import { ErrorPage } from './components/ErrorPage/404';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

/*  // caath error all full sites

cathUnhandleError = (promiseReject) => {
  alert('Some error')
}
componentDidMount() {
  this.props.initilizeAPP();
  window.addEventListener("unhandledrejection", this.cathUnhandleError);
}
componentWillUnmount () {
  window.removeaddEventListener("unhandledrejection", this.cathUnhandleError);
}
 */
class App extends React.Component {

  componentDidMount() {
    this.props.initilizeAPP()
  }

  render() {

    if (!this.props.initial) {
      return <Preloader />
    }

    return (
      <div className="app-wraper">
        <HeaderContainer />
        <SidebarContainer />
        <div className='app-wraper-content'>
          <Suspense fallback={<div><Preloader /></div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/profile" />} />
              <Route exact path='/profile/' element={<ProfileContainer />}>
                <Route exact path=':userId' element={<ProfileContainer />} />
              </Route>
              <Route exact path="/dialogs/*" element={<DialogsContainer />} />
              <Route exact path='/news' element={<News />} />
              <Route exact path='/music' element={<Music />} />
              <Route exact path='/setting' element={<Setting />} />
              <Route exact path='/users' element={<UsersContainer pageTitle={'Users'} />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/404' element={<ErrorPage />} />
              <Route path='/profile/*' element={'404 Page not Found'} />
              <Route exact path='*' element={'404 Page not Found'} />
            </Routes>
          </Suspense>
        </div>
      </div>
    )
  }


}

const mapStateToProps = (state) => ({
  initial: state.app.initial,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initilizeAPP }))(App);
