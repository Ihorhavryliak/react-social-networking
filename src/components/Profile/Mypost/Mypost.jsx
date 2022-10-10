import se from './Mypost.module.css';
import Post from './Post/Post';
import React from 'react';


const  Mypost = (props) => {

  let dialogElements = props.postDate.map(phra => (<Post messege={phra.name} key={phra.id} count={phra.count}/>))
  
  let newPostElement = React.createRef();

  let onAddPoster = () => {
    props.adPost()
  }
  
  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updeteNewPost(text);
  }
  
  return (
          <div className={se.postBlock}>
            <h3 className={se.myPost}>
               my pos
            </h3> 
          <div>
            <div>
              <textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText}></textarea>
            </div>
            <div>
            <button onClick={onAddPoster}>Add post</button>
            </div>
          </div>
          <div className={se.post}>
          {dialogElements}
          </div>
        </div>
  )
}

export default Mypost;