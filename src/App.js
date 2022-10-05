import './App.css';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Sidebar from './components/Slidebar/Sidebar';
import Dialog from './components/Dialogs/Dialogs';
import {Route, Routes} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Setting from './components/Setting/Setting';
import state from './redux/store';


const App = (props) => {
  return (
      <div className="app-wraper">
        <Header />
        <Sidebar state={props.state.sidebarBlockFrends} />
        <div className='app-wraper-content'>
          <Routes>
            <Route path='/profil' element={<Profile
             profilePage={props.state.profilePage} 
             dispatch={props.dispatch} 
             />}/>
            <Route exact path="/dialogs/*" 
            element={<Dialog 
            state={props.state.dialogsPage}
            dispatch={props.dispatch}
            />}/>
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/setting' element={<Setting />} />
          </Routes>
        </div>
      </div>

  );
}



export default App;
