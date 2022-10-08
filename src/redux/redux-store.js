import { configureStore } from '@reduxjs/toolkit'
import dialogsReducer from './dialogs-reducer'
import profileReducer from './profile_reducer'
import slideBarReducer from './sidebar_block_reducer'
import userReducer from './usere_reducer';




let store = configureStore({
    reducer: {
      profilePage: profileReducer,
      dialogsPage: dialogsReducer,
      sidebarBlockFrends: slideBarReducer,
      userPage: userReducer
    }
});


window.you = store;

export default store;