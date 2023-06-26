import ProfileInfo from './ProfileInfo/ProfileInfo';
import { ProfileType } from '../../types/types';
import Mypost from './Mypost/Mypost';
import Preloader from '../Common/Preloader/Preloader';
import { useSelector } from 'react-redux';
import { getSsFeching } from '../../redux/user-selectors';


const Profile: React.FC<ProfilesType> = (props) => {

  const isDialogsLoads = useSelector(getSsFeching);

  return (<>
    {isDialogsLoads && <Preloader />}
    <div >
      <ProfileInfo profile={props.profile}
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        saveProfile={props.saveProfile}
        isFecbg={props.isFecbg}
        status={props.status} upDateStatuses={props.upDateStatuses} />
      {props.isOwner ? <Mypost /> : <div style={{ marginTop: '20px' }}>No any posts</div>}
    </div>
    </>
  )
}
export default Profile

export type ProfilesType = {
  profile: ProfileType | null
  savePhoto: (file: File) => void
  isOwner: boolean
  saveProfile: (profile: ProfileType | null) => Promise<any>
  isFecbg: boolean
  status: string
  upDateStatuses: (userId: string) => void
}