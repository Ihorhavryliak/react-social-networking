import { Navigate, Route, Routes } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Setting from './components/Setting/Setting';
import { LoginPage } from './components/Login/LoginPage';
import React, { Suspense } from 'react';
import Preloader from './components/Common/Preloader/Preloader';
import { ErrorPage } from './components/ErrorPage/404';
import { UserPage } from './components/Users/UserPage';
import FriendListOfMessege from './components/Dialogs/DialogItem/FriendListOfMessege';
import SearchMessage from './components/Dialogs/DialogItem/SearchMessage';
import { ProfileContainer, ChatPage } from './App';
import  DialogsPageMain  from './components/Dialogs/DialogsPageMain';


export const AppRouter = () => {
  return (
    <Suspense fallback={<div><Preloader /></div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/profile" />} />
        <Route path='/profile/' element={<ProfileContainer />}>
          <Route path=':userId' element={<ProfileContainer />} />
        </Route>
        <Route path="/dialogs/" element={<DialogsPageMain />} />
        <Route path="/dialogs/*" element={<FriendListOfMessege />} />
        <Route path="dialogs/:id/messages/new*" element={<SearchMessage />} />
        <Route path='/news' element={<News />} />
        <Route path='/music' element={<Music />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/users' element={<UserPage pageTitle={'Users'} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/404' element={<ErrorPage />} />
        <Route path='/profile/*' element={'404 Page not Found'} />
        <Route path='*' element={'404 Page not Found'} />
      </Routes>
    </Suspense>
  );
};
