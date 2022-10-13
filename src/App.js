import './App.css';
import {Route, Routes} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Setting from './components/Setting/Setting';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import SidebarContainer from './components/Slidebar/SidebarContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';


const App = (props) => {

  return (
      <div className="app-wraper">
        <HeaderContainer />
        <SidebarContainer  />
        <div className='app-wraper-content'>
          <Routes>
            <Route exact path='/profil/*' element={<ProfileContainer />}>
              <Route path=':userId' element={<ProfileContainer/>} />
            </Route>
            <Route exact path="/dialogs/*" element={<DialogsContainer/>}/>
            <Route exact path='/news' element={<News />} />
            <Route exact path='/music' element={<Music />} />
            <Route exact path='/setting' element={<Setting />} />
            <Route exact path='/users' element={<UsersContainer />} />
          </Routes>
        </div>
      </div>

  );
}



export default App;
