import store from './redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render(
    <Provider  store={store} >
      <HashRouter /* basename={process.env.PUBLIC_URL} */>

              <App />
      
      </HashRouter>
    </Provider>
  );

