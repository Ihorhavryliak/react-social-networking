
import { useSelector } from 'react-redux';
import { getMyPhoto } from '../../../../redux/dialog-selector';
import se from './Post.module.css';

type PostType = {
  count: number
  messege: string
 
}

const Post: React.FC<PostType> = (props) => {

  const photoMe = useSelector(getMyPhoto);
  return (
            <div className={se.item}>
              <img alt="users" src={photoMe ? photoMe : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQG84i10xhs06HlEh2T3aDrrOsG8E1esNT7w&usqp=CAU"}></img>
         
          <span className={se.textMessage}>{props.messege}</span>  <span className={se.likeCount}>Likes: {props.count}</span>

              <div>
           
               
              </div>
              
            </div>
  )
}

export default Post;