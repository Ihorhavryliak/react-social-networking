import ProfileInfo from './ProfileInfo/ProfileInfo';
import { ProfileType } from '../../types/types';
import Mypost from './Mypost/Mypost';

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
        status={props.status} upDateStatuses={props.upDateStatuses} />
      {props.isOwner ? <Mypost /> : <div style={{ marginTop: '20px' }}>No any posts</div>}
    </div>
  )
}
export default Profile