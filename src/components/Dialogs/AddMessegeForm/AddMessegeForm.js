import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, reqiaret } from "../../../utils/validator";
import { Textarea } from "../../Common/Preloader/FormControl/FormsControl";

const maxLength50 = maxLengthCreator(50);

const AddMessegeForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
    <div>
      <Field component={Textarea}
      validate={[reqiaret, maxLength50]}
      name={'newMessegeBoddy'} placeholder={'Enter your messege'} />
    </div>
    <div>
    <button>Send</button>
    </div>
  </form>
  )
}

export  const AddMessegeFormRedux = reduxForm({form: 'addMessegeForm'})(AddMessegeForm)