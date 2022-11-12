import Preloader from '../../Common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/image-user.png'
import React, { ChangeEvent, useState } from 'react';
import ProfileDataForm from './ProfileDataForm';
import { ProfilesType } from '../Profile';
import { ContactsType, ProfileType } from '../../../types/types';
import { Button,  Input } from 'antd';
import { getisSetDate } from '../../../redux/profile-selectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../../redux/profile_reducer';
import { useNavigate } from 'react-router-dom';



const ProfileInfo: React.FC<ProfilesType> = ({ profile, status, upDateStatuses, isOwner, savePhoto, saveProfile, isFecbg }) => {

  const isSetDate= useSelector(getisSetDate) ;
  const history = useNavigate()
  const dispatch = useDispatch();

  if (!profile) {
    return <Preloader />
  }
  
  const mainPhotoSelect = (e: ChangeEvent<HTMLInputElement> ) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0])
    }
  }

  const getFormData = async (values: ProfileType) => {
    saveProfile(values);
  }

  const goToEditMode = () => {
    dispatch(actions.closeEditForm(true)) 
  }
  const closeEditMode = () => {
    dispatch(actions.closeEditForm(false)) 
  }
 
  const createChat = (userId: number) => {
     history(`/dialogs/${userId}/`)
  }

  return (
    <div className={s.sectionInformation} >
      <div>
      <img alt='photos' src={profile.photos.large || userPhoto} className={s.mainPhoto} />
      <div className={s.containerFileGrid}>
        <div>
        {isOwner ? <Input name='sdd' className={s.file}  type={'file'} onChange={mainPhotoSelect} />
        : <div><Button onClick={() => createChat(profile.userId)}>Send Message</Button></div>}
        </div>
        <div>
        { isOwner && <div> <Button onClick={goToEditMode}>Edit information</Button></div>}
        </div>
      </div>
      </div>
      <div className={s.descri_pbloxk}>
        <ProfileStatusWithHooks status={status} upDateStatuses={upDateStatuses}  isOwner={isOwner} />
        {  isSetDate ?  <ProfileDataForm initialValues={profile}  isFecbg={isFecbg} onSubmit={getFormData} closeEditMode={closeEditMode} profile={profile} />
          : <ProfileData  profile={profile}  />}
      </div>
    </div>
  )
}


type ProfileDataType = {
  profile: ProfileType, 

}

const ProfileData: React.FC<ProfileDataType> = ({ profile}) => {
  return (
    <div className={s.blockDescripsin}>
     
      {profile.fullName && <div>
        <b>Full Name</b> {profile.fullName}
      </div> }
      {profile.lookingForAJob &&
      <div>
        <b>Looking a job:</b>  {profile.lookingForAJob === true ? 'yes' : 'no'}
      </div>
       }
      <div>
        {profile.lookingForAJobDescription &&
          <div>
            <b>My profesion skils</b>: {profile.lookingForAJobDescription}
          </div>
        }
        <div />
        {profile.aboutMe &&
        <div>
          <b>About me</b> : {profile.aboutMe}
        </div>
        }
        {Object.keys(profile.contacts).map((key, id) => !profile.contacts[key as keyof ContactsType]) && 
        <div>
         {Object.keys(profile.contacts).some(k => console.log(profile.contacts[k as keyof ContactsType] !== null) ) && <b>Contacts</b> } 
         
          {Object.keys(profile.contacts).map((key, id) => {
            return <Contact key={id + key} contactTitle={key} contactValua={profile.contacts[key as keyof ContactsType ]} />
          })}
        </div>
        }
      </div>
    </div>
  )
}

type ContactType = {
  contactTitle: string 
  contactValua: string
}

const Contact: React.FC<ContactType> = ({ contactTitle, contactValua }) => {
  if(!contactValua) return null;
  return (
    <div className={s.contact} >
      <b >{contactTitle}</b>: {contactValua}
    </div>
  )
}

export default ProfileInfo;