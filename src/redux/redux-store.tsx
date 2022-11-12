import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import authReducer from './auth-reducer';

import profileReducer from './profile_reducer'
import slideBarReducer from './sidebar_block_reducer'
import userReducer from './usere_reducer';
import {reducer as formReducer} from 'redux-form'
import appReudcer from './app-reducer';
import chatReducer from './chat-reducer';
import dialogReducer from './dialogs-reducer';





let store = configureStore({
    reducer: {
       // @ts-ignore
      profilePage: profileReducer,
       // @ts-ignore
      sidebarBlockFrends: slideBarReducer,
     // @ts-ignore
      userPage: userReducer,
      // @ts-ignore
      auth: authReducer,
      form: formReducer,
      app: appReudcer,
      // @ts-ignore
      chat: chatReducer,
          // @ts-ignore
      dialogs: dialogReducer,
    }
}
);


export type AppStateType = ReturnType<typeof store.getState>;

export type InfertActionsTypes<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U : never;
export type BaseThunkType<A extends Action = Action, R = Promise<void>> =  ThunkAction<R, AppStateType, unknown, A>
export type AppDispatch = typeof store.dispatch
/* type AppDispatch = typeof store.dispatch; */
// 1 type PropertyesTypes<T> = T extends {[keys: string]: infer U} ? U : never;
// 2 old version export type InfertActionsTypes<T extends {[keys: string]: (...args: any[]) => any}> = ReturnType<PropertyesTypes<T>>

// @ts-ignore
window.you = store;

export default store;