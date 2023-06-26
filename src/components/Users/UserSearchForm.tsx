import { Button } from 'antd';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { getUsersFilter } from '../../redux/user-selectors';
import { FilterType } from '../../redux/usere_reducer';
import s from '../Users/users.module.css'
type  ValuesType = {
  term?: string
  friend?: string
}
const userSearchFormValidate = (values: ValuesType) => {

  const errors: ValuesType = {};
/*   if (!values.term) {
    errors.term = 'Required';
  }  */

  return errors;
};


export const UserSearchForm: React.FC<PropsType> = React.memo((props) => {

  const filter = useSelector(getUsersFilter);

  const sumbit = (values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void; }) => {
      
      const filter: FilterType = {
        term: values.term,
        friend: values.friend === 'null' ? null : values.friend === 'true'? true: false
      }
    props.onFilterChange(filter);
    setSubmitting(false)
  };

  return (
    <div>
      <Formik
      enableReinitialize={true}
        initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
        validate={userSearchFormValidate}
        onSubmit={sumbit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className={s.errorField}>
            <Field type="text" placeholder='Enter a user name' className={s.searchFormUser} name="term" />
            {errors.term  ? (
             <span className={s.errorFiledMessage}>{errors.term}</span>
           ) : null}
           </div>
            <Field className={s.searchFormUser} name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
            <button className="ant-btn ant-btn-default users_buttonFollow__6VvmC" disabled={isSubmitting}>
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});


//type ---
type PropsType = {
  onFilterChange: (fitler: FilterType) => void
}

type FriendFormType = 'true' | 'false' | 'null';

type FormType =  {
  term: string,
  friend: FriendFormType
}
