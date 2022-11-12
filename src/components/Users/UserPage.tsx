import React from 'react';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import { getSsFeching } from '../../redux/user-selectors';
import { useSelector } from 'react-redux';




type UserPagePropsType = {
  pageTitle: string
}

export const UserPage: React.FC<UserPagePropsType> = (props) => {
  document.title = props.pageTitle;
  const isFeching = useSelector(getSsFeching);
  return (
    <>
          {isFeching
        ? <Preloader /> : null}
    <h2>{props.pageTitle}</h2>
      <Users />
    </>
  )
}



