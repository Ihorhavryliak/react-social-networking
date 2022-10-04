import Mypost from './Mypost/Mypost';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Content = (props) => {
  return (
    <div >
      <ProfileInfo/>
      <Mypost postDate={props.profilePage.postDate} 
      newPostText={props.profilePage.newPostText}
      addPost={props.addPost}
      updateNewPost={props.updateNewPost}
       />
  </div>
  )
}
export default Content