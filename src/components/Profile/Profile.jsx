import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './Mypost/MyPostContainer'

const Profile = (props) => {
  return (
    <div >
      <ProfileInfo profile={props.profile} 
      status={props.status} upDateStatuses={props.upDateStatuses}/>
      <MyPostContainer />
  </div>
  )
}
export default Profile