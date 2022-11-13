import './App.css';
import { NavLink, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import withRouter from './hoc/withProfileUrl';
import { compose } from 'redux';
import { initilizeAPP } from './redux/app-reducer';
import Preloader from './components/Common/Preloader/Preloader';
import { AppDispatch, AppStateType } from './redux/redux-store';
import 'antd/dist/antd.min.css';
import { UserOutlined, SoundOutlined, TeamOutlined, MailOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Headers from './components/Header/Header';
import { AppRouter } from './AppRouter';
import { FooterBlock } from './components/FooterBlock';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import './App.css';

export const ChatPage = React.lazy(() => import('./pages/chat/ChatPage'));
export const DialogsPage = React.lazy(() => import('./components/Dialogs/DialogsPage'));
export const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


const { Content, Sider } = Layout;

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


type DispatchPropsType = {

}

const App: React.FC<DispatchPropsType> = (props) => {

  const initial = useSelector((state: AppStateType) => state.app.initial);
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  console.log(location.pathname);

  let urlPage = '';
  for (let i = 1; i < location.pathname.length; i++) {
    if (location.pathname[i] === '/' ||  location.pathname[i] ===  '?') {
      break
    } else {
      urlPage += location.pathname[i]
    }
  }
  console.log(urlPage)
  useEffect(() => {
    dispatch(initilizeAPP())
  }, [])

  return (<>
    {!initial && <Preloader />}
    <Layout>
      <Headers />
      <Layout>
        <Sider width={200} className="site-layout-background">
          <div className='blockNavlink'>
            <NavLink className="linkNav" to="/profile">
              <div className={urlPage === 'profile' ? 'navActive nalinkList' : 'nalinkList'} >
               <span className='linkIcon'><UserOutlined /></span>  Profile </div></NavLink>
            <NavLink className="linkNav" to="/dialogs">
              <div className={urlPage === 'dialogs' ? 'navActive nalinkList' : 'nalinkList'}>
              <span className='linkIcon'><MailOutlined /></span>Message   </div></NavLink>
            <NavLink className="linkNav" to="/users">
              <div className={urlPage === 'users' ? 'navActive nalinkList' : 'nalinkList'}>
              <span className='linkIcon'><TeamOutlined /></span>Users   </div></NavLink>
            <NavLink className="linkNav" to="/chat">
              <div className={urlPage === 'chat' ? 'navActive nalinkList' : 'nalinkList'}>
              <span className='linkIcon'><SoundOutlined /></span>Shared chat   </div></NavLink>
          </div>
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          {/* <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
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
  </>
  )
}



export default App



