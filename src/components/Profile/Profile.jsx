import Mypost from './Mypost/Mypost';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Content = (props) => {
  return (
    <div >
      <ProfileInfo/>
      <Mypost postDate={props.profilePage.postDate} 
      newPostText={props.profilePage.newPostText}
      dispatch={props.dispatch}
       />
  </div>
  )
}
export default Content