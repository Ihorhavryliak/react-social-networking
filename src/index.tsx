import store from './redux/redux-store';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {/* BrowserRouter, */ HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement) ;

  root.render(
    <Provider  store={store} >
      <HashRouter /* basename={process.env.PUBLIC_URL} dsfsdf */ >

              <App />
      
      </HashRouter>
    </Provider>
  );

