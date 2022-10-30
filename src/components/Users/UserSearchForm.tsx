import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { getUsersFilter } from '../../redux/user-selectors';
import { FilterType } from '../../redux/usere_reducer';



const userSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type PropsType = {
  onFilterChange: (fitler: FilterType) => void
}

type FriendFormType = 'true' | 'false' | 'null';

type FormType =  {
  term: string,
  friend: FriendFormType
}

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
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

