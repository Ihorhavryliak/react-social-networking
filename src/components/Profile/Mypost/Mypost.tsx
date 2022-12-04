import se from './Mypost.module.css';
import Post from './Post/Post';
import React, { useState } from 'react';
import { maxLengthCreator } from '../../../utils/validator';
import { PostDateType } from '../../../types/types';
import { GetFormDateDedux } from './AddNewPostForm';
import { getPostDate } from '../../../redux/dialog-selector';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../../redux/profile_reducer';
import { reset } from 'redux-form';

export const maxLenght10 = maxLengthCreator(65);



const Mypost: React.FC = React.memo( (props) => {
  const postDate = useSelector(getPostDate);
  const dispatch = useDispatch();
  let copyPostDate = [...postDate];
  let dialogElements = copyPostDate.reverse().map(phra =>(<Post messege={phra.name} key={phra.id} count={phra.count} />));

  const onAddPost = (values: {newPostText: string}) => {
   dispatch(actions.adPostActionCreat(values.newPostText));
   dispatch(reset('profileAddNewPostForm'))
  };

  return (
    <div className={se.postBlock}>
      <h3 className={se.myPost}>
        My posts
      </h3>
      <div>
        <GetFormDateDedux onSubmit={onAddPost} />
      </div>
      <div className={se.post} >
        {dialogElements}
      </div>
    </div>
  )

});

export default Mypost;