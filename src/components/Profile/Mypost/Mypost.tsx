import se from './Mypost.module.css';
import Post from './Post/Post';
import React from 'react';
import { maxLengthCreator } from '../../../utils/validator';
import { PostDateType } from '../../../types/types';
import { GetFormDateDedux } from './AddNewPostForm';

export const maxLenght10 = maxLengthCreator(10);


export type MapPropsType = {
  postDate: Array<PostDateType>
}
export type MapDispatchPropsType = {
  adPost: (newPostText: string) => void
}

const Mypost: React.FC <MapPropsType & MapDispatchPropsType> = React.memo(props => {
  let dialogElements = props.postDate.map(phra =>
    (<Post messege={phra.name} key={phra.id} count={phra.count} />));
  const onAddPost = (values: {newPostText: string}) => {
    props.adPost(values.newPostText);
  };

  return (
    <div className={se.postBlock}>
      <h3 className={se.myPost}>
        my pos
      </h3>
      <div>
        <GetFormDateDedux onSubmit={onAddPost} />
      </div>
      <div className={se.post}>
        {dialogElements}
      </div>
    </div>
  )

});

export default Mypost;