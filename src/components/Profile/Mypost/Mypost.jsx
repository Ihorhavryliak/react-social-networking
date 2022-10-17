import se from './Mypost.module.css';
import Post from './Post/Post';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, reqiaret } from '../../../utils/validator';
import { Textarea } from '../../Common/Preloader/FormControl/FormsControl';

const maxLenght10 = maxLengthCreator(10);

const Mypost = React.memo(props => {

    console.log("RENDER ")
  let dialogElements = props.postDate.map(phra => (<Post messege={phra.name} key={phra.id} count={phra.count} />))
  const onAddPost = (values) => {
    props.adPost(values.newPostText);
  }

  return (
    <div className={se.postBlock}>
      <h3 className={se.myPost}>
        my pos
      </h3>
      <div>
        <GetFormDateDedux onSubmit={onAddPost}  />
      </div>
      <div className={se.post}>
        {dialogElements}
      </div>
    </div>
  )
 
});

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} name={'newPostText'}  placeholder={'Enter your messege'}
        validate={[reqiaret, maxLenght10]}
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
};

const GetFormDateDedux = reduxForm ({form: 'profileAddNewPostForm'})(AddNewPostForm)

export default Mypost;