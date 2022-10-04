import store from './redux/state';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

let renderTree = (state) => {
  root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App state={store.getState()} 
      addPost={store.addPost.bind(store)} 
      updateNewPost={store.updateNewPost.bind(store)}
      addMessege={store.addMessege.bind(store)}
      updateMessege={store.updateMessege.bind(store)}
      />
    </BrowserRouter>
  </React.StrictMode>
  
);

}
renderTree(store.getState())
store.subscrube(renderTree)