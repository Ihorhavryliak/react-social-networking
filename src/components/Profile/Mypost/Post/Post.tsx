
import { useSelector } from 'react-redux';
import { getMyPhoto } from '../../../../redux/dialog-selector';
import se from './Post.module.css';
import defaul from '../../../../assets/images/image-user.png'
type PostType = {
  count: number
  messege: string
 
}

const Post: React.FC<PostType> = (props) => {

  const photoMe = useSelector(getMyPhoto);
  
  return (
            <div className={se.item}>
              <img alt="users" src={photoMe ? photoMe : defaul}></img>
          <span className={se.textMessage}>{props.messege}</span>  <span className={se.likeCount}>Likes: {props.count}</span>
              <div>
              </div>
            </div>
  )
}

export default Post;