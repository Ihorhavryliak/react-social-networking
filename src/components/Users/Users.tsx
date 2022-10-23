import React from 'react';
import { UserType } from '../../types/types';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';

type UsersType = {
    totalUserCount: number, 
    pageSize: number, 
    curruntPage: number, 
    onPageChange: (pageNumber: number) => void, 
    users: Array<UserType>
    followingInProgres: Array<number>
    unfollow: (userId: number) => void
    follow:  (userId: number) => void
}

const Users: React.FC <UsersType> = ({ curruntPage, onPageChange, totalUserCount, pageSize, users, ...props }) => {
  return (
    <div>
      <Paginator curruntPage={curruntPage} pageSize={pageSize}
        onPageChange={onPageChange} totalUserCount={totalUserCount} />
      <div>
        {
          users.map(u => <User user={u} key={u.id}
            followingInProgres={props.followingInProgres} unfollow={props.unfollow} follow={props.follow} />
          )
        }
      </div>
    </div>
  )
}

export default Users