import './App.css';
import { Route, Routes } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Setting from './components/Setting/Setting';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import SidebarContainer from './components/Slidebar/SidebarContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import React from 'react';
import { connect } from 'react-redux';
import withRouter from './hoc/withProfileUrl';
import { compose } from 'redux';
import { initilizeAPP } from './redux/app-reducer';
import Preloader from './components/Common/Preloader/Preloader';


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
          <Routes>
            <Route  path='/profil/' element={<ProfileContainer />}>
              <Route path=':userId' element={<ProfileContainer />} />
            </Route>
            <Route exact path="/dialogs/*" element={<DialogsContainer />} />
            <Route exact path='/news' element={<News />} />
            <Route exact path='/music' element={<Music />} />
            <Route exact path='/setting' element={<Setting />} />
            <Route exact path='/users' element={<UsersContainer />} />
            <Route exact path='/login' element={<Login />} />
          </Routes>
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
  connect(mapStateToProps, { initilizeAPP  }))(App);
