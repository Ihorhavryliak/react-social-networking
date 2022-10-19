import Preloader from '../../Common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({profile, status,  upDateStatuses}) => {

  if (!profile) {
    return <Preloader />
  }

  return (
    <div >
      <div className={s.descri_pbloxk}>
        <img alt='photos' src={profile.photos.large} />
        <ProfileStatusWithHooks status={status} upDateStatuses={upDateStatuses} />
        <div>
          <span>{profile.contacts.facebook} </span>
          <span>{profile.contacts.website} </span>
          <span>{profile.contacts.vk} </span>
          <span>{profile.contacts.twitter} </span>
          <span>{profile.contacts.instagram} </span>
          <span>{profile.contacts.youtube} </span>
          <span>{profile.contacts.github} </span>
          <span>{profile.contacts.youtube} </span>
          <span>{profile.contacts.mainLink} </span>
        </div>
        <div>
          {profile.lookingForAJob === true ? 'Looking a job' : 'No looking a job'}
          <p>
            {(profile.lookingForAJob === true && profile.lookingForAJobDescription.length > 0) 
            ? profile.lookingForAJobDescription
            : null }
          </p>
          <p>
          {profile.fullName}
          </p>
          <p>
          {profile.aboutMe}
          </p>
        </div>
      </div>
    </div>
  )
}
export default ProfileInfo;