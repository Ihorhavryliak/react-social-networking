import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './Mypost/MyPostContainer'

const Profile = (props) => {
  return (
    <div >
      <ProfileInfo profile={props.profile} 
      savePhoto={props.savePhoto}
       isOwner={props.isOwner} 
       saveProfile={props.saveProfile}
       isFecbg={props.isFecbg}
      status={props.status} upDateStatuses={props.upDateStatuses}/>
      <MyPostContainer />
  </div>
  )
}
export default Profile