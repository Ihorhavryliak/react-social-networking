import Preloader from '../../Common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus'

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
 
  return (
    <div >
    {/*   <div>
        <img className={s.image} alt="hooo" src="https://img.freepik.com/free-photo/wide-angle-shot-of-a-single-tree-growing-under-a-clouded-sky-during-a-sunset-surrounded-by-grass_181624-22807.jpg?w=2000"></img>
      </div> */}
      <div className={s.descri_pbloxk}>
        <img alt='photos' src={props.profile.photos.large} />
        <ProfileStatus status={'Hello 435'} />
        <div>
          <span>{props.profile.contacts.facebook} </span>
          <span>{props.profile.contacts.website} </span>
          <span>{props.profile.contacts.vk} </span>
          <span>{props.profile.contacts.twitter} </span>
          <span>{props.profile.contacts.instagram} </span>
          <span>{props.profile.contacts.youtube} </span>
          <span>{props.profile.contacts.github} </span>
          <span>{props.profile.contacts.youtube} </span>
          <span>{props.profile.contacts.mainLink} </span>
        </div>
        <div>
          {props.profile.lookingForAJob === true ? 'Looking a job' : 'No looking a job'}
          <p>
            {(props.profile.lookingForAJob === true && props.profile.lookingForAJobDescription.length > 0) 
            ? props.profile.lookingForAJobDescription
            : null }
          </p>
          <p>
          {props.profile.fullName}
          </p>
          <p>
          {props.profile.aboutMe}
          </p>
        </div>
      </div>
    </div>
  )
}
export default ProfileInfo;