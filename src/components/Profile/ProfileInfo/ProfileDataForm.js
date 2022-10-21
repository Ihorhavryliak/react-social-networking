import { reduxForm } from "redux-form"
import { creatField, Input, Textarea } from "../../Common/Preloader/FormControl/FormsControl"
import s from './ProfileInfo.module.css';

const ProfileDataForm = ({handleSubmit, profile, error}) => {  return (
    <form onSubmit={handleSubmit}>
 {error && <div className={s.formSUmmeryError}>{error}</div>}  
      <div>
        <div><button>Save</button> </div>
        <div>
          <b>Full Name</b>: {creatField('FullName', 'fullName', [], Input)}
        </div>
        <div>
          <b>Looking a job:</b>
          {creatField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
          </div>
    
            <div>
              <b>My profesion skils</b>:
              {creatField('My profesion skils', 'lookingForAJobDescription', [], Textarea)}
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
        <b>{key}:{creatField(key, 'contacts.' + key, [], Input)}</b>
        </div>
      })}
      </div>
      </div>
      </form>
  )
}
const ProfileDataFormRedaXForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm);

export default ProfileDataFormRedaXForm;