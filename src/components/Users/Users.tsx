import React from 'react';
import { FilterType } from '../../redux/usere_reducer';
import { UserType } from '../../types/types';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';
import { UserSearchForm } from './UserSearchForm';

type UsersType = {
    totalUserCount: number, 
    pageSize: number, 
    curruntPage: number, 
    onPageChange: (pageNumber: number) => void, 
    users: Array<UserType>
    followingInProgres: Array<number>
    unfollow: (userId: number) => void
    follow:  (userId: number) => void
    onFilterChange: (fitler: FilterType) => void
}

export const Users: React.FC <UsersType> = ({ curruntPage, onPageChange, totalUserCount, pageSize, onFilterChange, users, ...props }) => {
  return (
    <div>
       <UserSearchForm onFilterChange={onFilterChange} />
      <Paginator curruntPage={curruntPage} pageSize={pageSize}
        onPageChange={onPageChange} totalUserCount={totalUserCount} />
      <div>
        {
          users.map(u => <User users={u} key={u.id}
            followingInProgres={props.followingInProgres} unfollow={props.unfollow} follow={props.follow} />
          )
        }
      </div>
  
    </div>
  )
}

export default Users;