import store from './redux/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

let renderTree = (state) => {
  root.render(

    <BrowserRouter>
      <App state={state} 
      dispatch={store.dispatch.bind(store)} 
      />
    </BrowserRouter>
 
  
);

}
renderTree(store.getState())
store.subscrube(renderTree)