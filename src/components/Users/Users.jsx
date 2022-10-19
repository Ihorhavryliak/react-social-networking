import React from 'react';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';

const Users = ({ curruntPage, onPageChange, totalUserCount, pageSize, users, ...props }) => {
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