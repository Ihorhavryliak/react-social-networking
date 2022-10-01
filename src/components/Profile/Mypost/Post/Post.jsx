import se from './Post.module.css';

const Post = (props) => {

  return (
            <div className={se.item}>
              <img alt="users" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQG84i10xhs06HlEh2T3aDrrOsG8E1esNT7w&usqp=CAU"></img>
              {props.messege}
              <div>
                <span>Like</span>
                <span>Like Count: {props.count}</span>
              </div>
              
            </div>
  )
}

export default Post;