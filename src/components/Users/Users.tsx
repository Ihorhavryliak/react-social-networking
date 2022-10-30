import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {   useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/redux-store';
import { getCurruntPage, getFollowingInProgres, getPageSize, getTotalUserCount, getUsersFilter, getUsersSelectorSuper } from '../../redux/user-selectors';
import { FilterType, follows, reqestUser, unfollows } from '../../redux/usere_reducer';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';
import { UserSearchForm } from './UserSearchForm';
type QueryParamsType = {
  term?: string;
  page?: string;
  friend?: string;
  count?: string;
};

type UsersType = {
}

export const Users: React.FC<UsersType> = (props) => {

  useEffect(() => {
    dispatch(reqestUser(curruntPage, pageSize, filter));
  }, [])

  const users = useSelector(getUsersSelectorSuper);
  const totalUserCount = useSelector(getTotalUserCount);
  const curruntPage = useSelector(getCurruntPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgres = useSelector(getFollowingInProgres);
  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();
  useEffect(()=>{

    const queryString = require('query-string');
    const parsed= queryString.parse(location.search) as QueryParamsType ;
    let actualFilter = filter;
    let actualPage = curruntPage;

    if (parsed.page){ actualPage = +parsed.page};
    if (!!parsed.term){ actualFilter = {...actualFilter, term: parsed.term}};
    
    switch(parsed.friend) {
      case 'null': 
      actualFilter = {...actualFilter, friend: null}
        break;
      case 'true': 
      actualFilter = {...actualFilter, friend: true}
        break;
      default: 
      actualFilter = {...actualFilter, friend: false}
    }

    dispatch(reqestUser(actualPage, pageSize, actualFilter));

  }, []);

  const history = useNavigate();
  useEffect(() => {

    const query:QueryParamsType = {};
  

    if (!!filter.term) {query.term = filter.term};
    if (filter.friend !== null) {query.friend = String(filter.friend)};
    if (curruntPage !== 1) {query.page = String(curruntPage)};

    const queryString = require('query-string');
    let queryStrings = queryString.stringify(query);
    history(`/users?` + queryStrings);

  }, [filter, curruntPage, pageSize]);
 
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