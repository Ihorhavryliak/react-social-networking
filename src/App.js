import './App.css';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import {Route, Routes} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Setting from './components/Setting/Setting';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import SidebarContainer from './components/Slidebar/SidebarContainer';


const App = (props) => {

  return (
      <div className="app-wraper">
        <Header />
        <SidebarContainer  />
        <div className='app-wraper-content'>
          <Routes>
            <Route exact path='/profil' element={<Profile/>}/>
            <Route exact path="/dialogs/*" element={<DialogsContainer/>}/>
            <Route exact path='/news' element={<News />} />
            <Route exact path='/music' element={<Music />} />
            <Route exact path='/setting' element={<Setting />} />
          </Routes>
        </div>
      </div>

  );
}



export default App;
