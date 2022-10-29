import React from 'react';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import { getSsFeching } from '../../redux/user-selectors';
import { useSelector } from 'react-redux';




type UserPagePropsType = {
  pageTitle: string
}

export const UserPage: React.FC<UserPagePropsType> = (props) => {
  const isFeching = useSelector(getSsFeching)
  return (
    <>
    <h2>{props.pageTitle}</h2>
      {isFeching
        ? <Preloader /> : null}
      <Users />
    </>
  )
}



