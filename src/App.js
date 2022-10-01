import './App.css';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Sidebar from './components/Slidebar/Sidebar';
import Dialog from './components/Dialogs/Dialogs';



const App = () => {
  return (
    <div className="app-wraper">
      <Header />
      <Sidebar />
      
    <div className='app-wraper-content'>
       <Profile />
        <Dialog />
    </div>
    </div>
  );
}



export default App;
