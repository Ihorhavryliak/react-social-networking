import { createPortal } from "react-dom";
import { InjectedFormProps, reduxForm } from "redux-form"
import { ProfileType } from "../../../types/types";
import { cantNull, urlLing } from "../../../utils/validator";
import { creatField, GetStringKeysType, Input, Textarea } from "../../Common/Preloader/FormControl/FormsControl"
import Preloader from "../../Common/Preloader/Preloader";
import s from './ProfileInfo.module.css';


type PropsType = {
  profile: ProfileType;
  isFecbg: boolean
  closeEditMode: () => void
};
type ProfileTypeKeys = GetStringKeysType<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType > & PropsType > = ({handleSubmit, profile, closeEditMode, error, isFecbg}) => {  
  if (isFecbg === true) {
    return <Preloader />
  }

  return createPortal (
    
    <div className={s.windowForm}>
             <span className={s.closeWindow} onClick={closeEditMode}>X</span>
   <form onSubmit={handleSubmit} className={s.profileEditForm}>
  {error && <div className={s.formSUmmeryError}>{error}</div>}  
 
      <div>

        <div>
          <b>Full Name</b>: {creatField<ProfileTypeKeys>('FullName', 'fullName', [cantNull], Input)}
        </div>
        <div>
          <b>Looking a job:</b>
          {creatField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
          </div>
    
            <div>
              <b>My profesion skils</b>:
              {creatField<ProfileTypeKeys>('My profesion skils', 'lookingForAJobDescription', [cantNull], Textarea)}
            </div>

          <div />
          <div>
            <b>About me</b> :
            {creatField('About me', 'aboutMe', [cantNull], Textarea)}
          </div>
          <div>
        <b>Contacts</b>: 
        {Object.keys(profile.contacts).map((key ,id) => {
        return  <div key={key} className={s.contacts}> 
        {/* todo: to do something */}
        <b>{key}:{creatField(key, 'contacts.' + key, [urlLing], Input)}</b>
        </div>
      })}
      </div>
      </div>
      <div><button className="ant-btn ant-btn-default" style={{marginTop: '25px'}}>Save</button> </div>
      </form>
      </div>,
      document.getElementById('portal') as Element | DocumentFragment
  )
}


const ProfileDataFormRedaXForm = reduxForm<ProfileType, PropsType>({ form: 'edit-profile' })(ProfileDataForm);

export default ProfileDataFormRedaXForm;