import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Setting from './components/Setting/Setting';
import SidebarContainer from './components/Slidebar/SidebarContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import  { LoginPage } from './components/Login/LoginPage';
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import withRouter from './hoc/withProfileUrl';
import { compose } from 'redux';
import { initilizeAPP } from './redux/app-reducer';
import Preloader from './components/Common/Preloader/Preloader';
import { ErrorPage } from './components/ErrorPage/404';
import { AppStateType } from './redux/redux-store';
import { UserPage } from './components/Users/UserPage';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

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

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initilizeAPP: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {

  cathUnhandleError = (promiseReject: PromiseRejectionEvent) => {
    alert('Some error')
  }
  componentDidMount() {
    this.props.initilizeAPP();
    window.addEventListener("unhandledrejection", this.cathUnhandleError);
  }
  componentWillUnmount () {
    window.removeEventListener("unhandledrejection", this.cathUnhandleError);
  }

 /*  componentDidMount() {
    this.props.initilizeAPP()
  }
 */
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
              <Route  path='/profile/' element={<ProfileContainer />}>
                <Route  path=':userId' element={<ProfileContainer />} />
              </Route>
              <Route  path="/dialogs/*" element={<DialogsContainer />} />
              <Route  path='/news' element={<News />} />
              <Route  path='/music' element={<Music />} />
              <Route  path='/setting' element={<Setting />} />
              <Route  path='/users' element={<UserPage pageTitle={'Users'} />} />
              <Route  path='/login' element={<LoginPage />} />
              <Route  path='/404' element={<ErrorPage />} />
              <Route path='/profile/*' element={'404 Page not Found'} />
              <Route  path='*' element={'404 Page not Found'} />
            </Routes>
          </Suspense>
        </div>
      </div>
    )
  }


}

const mapStateToProps = (state: AppStateType) => ({
  initial: state.app.initial,
})

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initilizeAPP }))(App);
