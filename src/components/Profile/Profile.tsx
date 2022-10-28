import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './Mypost/MyPostContainer'
import { ProfileType } from '../../types/types';

export type ProfilesType = {
  profile: ProfileType | null
  savePhoto: (file: File) => void
  isOwner: boolean
  saveProfile: (profile: ProfileType | null) => Promise<any>
  isFecbg: boolean
  status: string
  upDateStatuses: (userId: string) => void
}

const Profile: React.FC<ProfilesType> = (props) => {

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