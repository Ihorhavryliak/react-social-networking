
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { getisAiuth } from '../redux/chat-selector';


export default function RedirectToLogin() {
  const isAuth = useSelector(getisAiuth);

  if (!isAuth) {
    return <Navigate to="/login" />
  } 
}
