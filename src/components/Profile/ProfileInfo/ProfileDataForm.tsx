import { InjectedFormProps, reduxForm } from "redux-form"
import { ProfileType } from "../../../types/types";
import { creatField, GetStringKeysType, Input, Textarea } from "../../Common/Preloader/FormControl/FormsControl"
import s from './ProfileInfo.module.css';


type PropsType = {
  profile: ProfileType
};
type ProfileTypeKeys = GetStringKeysType<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType > & PropsType > = ({handleSubmit, profile, error}) => {  

  return (
   <form onSubmit={handleSubmit}>
 {error && <div className={s.formSUmmeryError}>{error}</div>}  
      <div>
        <div><button>Save</button> </div>
        <div>
          <b>Full Name</b>: {creatField<ProfileTypeKeys>('FullName', 'fullName', [], Input)}
        </div>
        <div>
          <b>Looking a job:</b>
          {creatField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
          </div>
    
            <div>
              <b>My profesion skils</b>:
              {creatField<ProfileTypeKeys>('My profesion skils', 'lookingForAJobDescription', [], Textarea)}
            </div>

          <div />
          <div>
            <b>About me</b> :
            {creatField('About me', 'aboutMe', [], Textarea)}
          </div>
          <div>
        <b>Contacts</b>: 
        {Object.keys(profile.contacts).map((key ,id) => {
        return  <div key={key} className={s.contacts}> 
        {/* todo: to do something */}
        <b>{key}:{creatField(key, 'contacts.' + key, [], Input)}</b>
        </div>
      })}
      </div>
      </div>
      </form>
  )
}


const ProfileDataFormRedaXForm = reduxForm<ProfileType, PropsType>({ form: 'edit-profile' })(ProfileDataForm);

export default ProfileDataFormRedaXForm;