import './App.css';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Setting from './components/Setting/Setting';
import { LoginPage } from './components/Login/LoginPage';
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import withRouter from './hoc/withProfileUrl';
import { compose } from 'redux';
import { initilizeAPP } from './redux/app-reducer';
import Preloader from './components/Common/Preloader/Preloader';
import { ErrorPage } from './components/ErrorPage/404';
import { AppStateType } from './redux/redux-store';
import { UserPage } from './components/Users/UserPage';
import 'antd/dist/antd.css';
import { UserOutlined, RestOutlined, MailOutlined, UserSwitchOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import Headers from './components/Header/Header';



const ChatPage = React.lazy(() => import('./pages/chat/ChatPage'));
const DialogsPage = React.lazy(() => import('./components/Dialogs/DialogsPage'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


//STYLE 
const { Header, Content, Sider, Footer } = Layout;
const items1 = ['1', '2', '3', '4'].map((key) => ({
  key,
  label: `nav ${key}`,
}));



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
  componentWillUnmount() {
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
      <Layout>
        <Headers />

        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              /* defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']} */
              style={{
                height: '100%',
                borderRight: 0,
              }}
              items={
                [
                  {
                    label: 'My profile', key: '1', type: 'group',
                    children: [{ label: <NavLink to="/profile">Profile</NavLink>, key: '2', icon: <UserOutlined /> },
                    { label: <NavLink to="/dialogs">Message</NavLink>, key: '3', icon: <MailOutlined /> },
                    { label: <NavLink to="/users">Users</NavLink>, key: '4', icon: <UserSwitchOutlined /> },
                    { label: <NavLink to="/chat">Chat</NavLink>, key: '4.1', icon: <UserSwitchOutlined /> },

                    ],

                  },

                  {
                    label: 'Under development', key: '5', icon: <ScheduleOutlined />,
                    children: [{ label: <NavLink to="/news">News</NavLink>, key: '6', icon: null },
                    { label: <NavLink to="/music">Music</NavLink>, key: '7', icon: null },
                    { label: <NavLink to="/setting">Settings</NavLink>, key: '8', icon: null },
                    ],

                  },



                ]
              }
            />

          </Sider>
          <Layout
            style={{
              padding: '0 24px 24px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Suspense fallback={<div><Preloader /></div>}>
                <Routes>
                  <Route path="/" element={<Navigate to="/profile" />} />
                  <Route path='/profile/' element={<ProfileContainer />}>
                    <Route path=':userId' element={<ProfileContainer />} />
                  </Route>
                  <Route path="/dialogs/*" element={<DialogsPage />} />
                  <Route path='/news' element={<News />} />
                  <Route path='/music' element={<Music />} />
                  <Route path='/setting' element={<Setting />} />
                  <Route path='/users' element={<UserPage pageTitle={'Users'} />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/chat' element={<ChatPage />} />
                  <Route path='/404' element={<ErrorPage />} />
                  <Route path='/profile/*' element={'404 Page not Found'} />
                  <Route path='*' element={'404 Page not Found'} />
                </Routes>
              </Suspense>
            </Content>
            <Footer
              style={{
                textAlign: 'center',
              }}
            >
              2022 - Created by Ihor Havryliak
            </Footer>
          </Layout>
        </Layout>
      </Layout>

    )
  }

}

const mapStateToProps = (state: AppStateType) => ({
  initial: state.app.initial,
})

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initilizeAPP }))(App);


/*  <div className="app-wraper">
 <HeaderContainer />
 <SidebarContainer />
 <div className='app-wraper-content'>
   <Suspense fallback={<div><Preloader /></div>}>
     <Routes>
       <Route path="/" element={<Navigate to="/profile" />} />
       <Route  path='/profile/' element={<ProfileContainer />}>
         <Route  path=':userId' element={<ProfileContainer />} />
       </Route>
       <Route  path="/dialogs/*" element={<DialogsPage />} />
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
</div> */