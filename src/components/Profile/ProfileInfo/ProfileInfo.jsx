import Preloader from '../../Common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/image-user.png'
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';


const ProfileInfo = ({ profile, status, upDateStatuses, isOwner, savePhoto, saveProfile, isFecbg }) => {
  const [editMode, setEditMode] = useState(false);

  if (isFecbg === true || !profile) {
    return <Preloader />
  }
  const mainPhotoSelect = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const getFormDta = async (values) => {
    saveProfile(values).then(
      () => { setEditMode(false) }
    )
  }


  return (
    <div >
      <div className={s.descri_pbloxk}>
        <img alt='photos' src={profile.photos.large || userPhoto} className={s.mainPhoto} />

        {isOwner && <input type={'file'} onChange={mainPhotoSelect} />}

        <ProfileStatusWithHooks status={status} upDateStatuses={upDateStatuses} />

        {editMode ? <ProfileDataForm initialValues={profile} onSubmit={getFormDta} profile={profile} />
          : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile} isOwner={isOwner} />}

      </div>
    </div>
  )
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      {isOwner && <div> <button onClick={goToEditMode}>Edit</button></div>}

      <div>
        <b>Full Name</b>: {profile.fullName}
      </div>
      <div>
        <b>Looking a job:</b>  {profile.lookingForAJob === true ? 'yes' : 'no'}
      </div>
      <div>
        {profile.lookingForAJobDescription &&
          <div>
            <b>My profesion skils</b>: {profile.lookingForAJobDescription}
          </div>
        }
        <div />
        <div>
          <b>About me</b> : {profile.aboutMe}
        </div>
        <div>
          <b>Contacts</b>:
          {Object.keys(profile.contacts).map((key, id) => {
            return <Contact key={id + key} contactTitle={key} contactValua={profile.contacts[key]} />
          })}
        </div>
      </div>
    </div>
  )
}



const Contact = ({ contactTitle, contactValua }) => {
  return (
    <div className={s.contact} >
      <b >{contactTitle}</b>: {contactValua}
    </div>
  )
}

export default ProfileInfo;