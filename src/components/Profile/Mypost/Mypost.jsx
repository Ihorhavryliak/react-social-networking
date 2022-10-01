import se from './Mypost.module.css';
import Post from './Post/Post';

const Mypost = () => {
  return (
          <div>
            my pos
          <div>
            <textarea></textarea>
            <button>Add post</button>
          </div>
          <div >
            <Post messege="How are you?" count="6"/>
            <Post messege="It's my first post" count="8" />
          </div>
        </div>
  )
}

export default Mypost;