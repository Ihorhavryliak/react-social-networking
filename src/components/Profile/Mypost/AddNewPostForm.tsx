import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { reqiaret } from '../../../utils/validator';
import { creatField, GetStringKeysType, Textarea } from '../../Common/Preloader/FormControl/FormsControl';
import { maxLenght10 } from './Mypost';

//forma
type AddNewPostFormValuesType = {
  newPostText: string
};

type LoginFormValuesKeysTypeKeys = GetStringKeysType<AddNewPostFormValuesType>;

type PropsType = {};

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormValuesType, PropsType> & PropsType> = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {creatField<LoginFormValuesKeysTypeKeys>('Enter your messege', 'newPostText', [reqiaret, maxLenght10], Textarea)}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

export const GetFormDateDedux = reduxForm<AddNewPostFormValuesType, PropsType>({ form: 'profileAddNewPostForm' })(AddNewPostForm);
