import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, reqiaret } from "../../../utils/validator";
import { creatField, Textarea } from "../../Common/Preloader/FormControl/FormsControl";
import { NewMessegeFormType } from "../DialogsPage";

const maxLength50 = maxLengthCreator(50);

type NewMessegeFormValuesKeysType = Extract<keyof NewMessegeFormType, string>;
type PropsType = {};

const AddMessegeForm: React.FC<InjectedFormProps<NewMessegeFormType, PropsType > & PropsType > = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
    <div>
    {creatField<NewMessegeFormValuesKeysType>('Enter your messege', 'newMessegeBoddy', [reqiaret, maxLength50], Textarea)}
    </div>
    <div>
    <button>Send</button>
    </div>
  </form>
  )
}

export  const AddMessegeFormRedux = reduxForm<NewMessegeFormType>({form: 'addMessegeForm'})(AddMessegeForm)