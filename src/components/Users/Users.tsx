import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/redux-store';
import { getCurruntPage, getFollowingInProgres, getPageSize, getTotalUserCount, getUsersFilter, getUsersSelectorSuper } from '../../redux/user-selectors';
import { FilterType, follows, reqestUser, unfollows } from '../../redux/usere_reducer';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';
import { UserSearchForm } from './UserSearchForm';

type UsersType = {
   

}

export const Users: React.FC <UsersType> = (props) => {

  useEffect(()=>{
    dispatch(reqestUser(curruntPage, pageSize, filter));
  }, [])

  const users = useSelector(getUsersSelectorSuper);
  const totalUserCount = useSelector(getTotalUserCount);
  const curruntPage = useSelector(getCurruntPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgres = useSelector(getFollowingInProgres);
  const dispatch: AppDispatch = useDispatch();
  
  const onPageChange = (pageNumber: number) => {
    dispatch(reqestUser(pageNumber, pageSize, filter));
  }

  const onFilterChange = (filter: FilterType) => {
    dispatch(reqestUser(1, pageSize, filter));
  }
  
  const unfollow = (userId: number) => {
    dispatch(unfollows(userId));
  } 
  const follow = (userId: number) => {
    dispatch(follows(userId));
  }

  return (
    <div>
       <UserSearchForm onFilterChange={onFilterChange} />
      <Paginator curruntPage={curruntPage} pageSize={pageSize}
        onPageChange={onPageChange} totalUserCount={totalUserCount} />
      <div>
        {
          users.map(u => <User users={u} key={u.id}
            followingInProgres={followingInProgres} unfollow={unfollow} follow={follow} />
          )
        }
      </div>
  
    </div>
  )
}

export default Users;