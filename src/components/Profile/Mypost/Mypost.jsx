import se from './Mypost.module.css';
import Post from './Post/Post';
import React from 'react';
import {adPostActionCreat, updeteNewPostActionCreater} from './../../../redux/profile_reducer'


const Mypost = (props) => {
  let dialogElements = props.postDate.map(phra => (<Post messege={phra.name} count={phra.count}/>))
  
  let newPostElement = React.createRef();

  let addPoster = () => {
    props.dispatch(adPostActionCreat());
  }
  
  let postOnChange = () => {
    let text = newPostElement.current.value;
    let action = updeteNewPostActionCreater(text);
    props.dispatch(action);
  }
  
  return (
          <div className={se.postBlock}>
            <h3 className={se.myPost}>
               my pos
            </h3> 
          <div>
            <div>
              <textarea ref={newPostElement} onChange={postOnChange} value={props.newPostText}></textarea>
            </div>
            <div>
            <button onClick={addPoster}>Add post</button>
            </div>
          </div>
          <div className={se.post}>
          {dialogElements}
          </div>
        </div>
  )
}

export default Mypost;