import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-reducer';
import dialogsReducer from './dialogs-reducer'
import profileReducer from './profile_reducer'
import slideBarReducer from './sidebar_block_reducer'
import userReducer from './usere_reducer';
import thunkMiddleware from 'redux-thunk'



let store = configureStore({
    reducer: {
      profilePage: profileReducer,
      dialogsPage: dialogsReducer,
      sidebarBlockFrends: slideBarReducer,
      userPage: userReducer,
      auth: authReducer
    }
}, applyMiddleware(thunkMiddleware));


window.you = store;

export default store;