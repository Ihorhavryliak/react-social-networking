import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './Mypost/MyPostContainer'

const Profile = (props) => {

  return (
    <div >
      <ProfileInfo profile={props.profile}/>
      <MyPostContainer />
  </div>
  )
}
export default Profile