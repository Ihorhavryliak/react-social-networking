import './App.css';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import withRouter from './hoc/withProfileUrl';
import { compose } from 'redux';
import { initilizeAPP } from './redux/app-reducer';
import Preloader from './components/Common/Preloader/Preloader';
import { AppStateType } from './redux/redux-store';
import 'antd/dist/antd.min.css';
import { UserOutlined, SoundOutlined, TeamOutlined, MailOutlined, UserSwitchOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import Headers from './components/Header/Header';
import { AppRouter } from './AppRouter';
import { FooterBlock } from './components/FooterBlock';


export const ChatPage = React.lazy(() => import('./pages/chat/ChatPage'));
export const DialogsPage = React.lazy(() => import('./components/Dialogs/DialogsPage'));
export const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


const { Header, Content, Sider, Footer } = Layout;

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

  componentDidMount() {
    this.props.initilizeAPP()
  }

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
                    { label: <NavLink to="/users">Users</NavLink>, key: '4', icon: <TeamOutlined /> },
                    { label: <NavLink to="/chat">Shared chat</NavLink>, key: '4.1', icon: <SoundOutlined /> },

                    ],

                  },

                  /*     {
                        label: 'Under development', key: '5', icon: <ScheduleOutlined />,
                        children: [{ label: <NavLink to="/news">News</NavLink>, key: '6', icon: null },
                        { label: <NavLink to="/music">Music</NavLink>, key: '7', icon: null },
                        { label: <NavLink to="/setting">Settings</NavLink>, key: '8', icon: null },
                        ],
    
                      }, */
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
              <AppRouter />
            </Content>
            <FooterBlock />
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


