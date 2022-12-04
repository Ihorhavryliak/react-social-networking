import { Field, Form, Formik } from "formik"
import React from "react"
import s from './../Dialogs.module.css'

const userSearchFormValidate = (values: any) => {
  const errors: { text?: string } = {};
  if (values.text.length <= 0) {
    errors.text = 'Require'
  }
  return errors;
};

type NewType = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void
}
export const FriendMessageForm: React.FC<PropsType> = React.memo((props) => {

  const sumbit = (values: FormType, { setSubmitting, resetForm }: NewType) => {
    props.sendFriednMeesege(+props.friendId, values.text)
    resetForm();
    setSubmitting(false)
  };
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{ text: '' }}
        validate={userSearchFormValidate}
        onSubmit={sumbit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Field component="textarea" className="ant-input" type="textarea" name="text" style={{ height: '65px', margin: '10px 0px', borderRadius: '7px 7px 7px 0px' }} />
            <div className={s.fomErrorMessage}>{errors.text && errors.text}</div>
            <button className="ant-btn ant-btn-default" type="submit" disabled={isSubmitting}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
})

//type ---
type PropsType = {
  sendFriednMeesege: (userId: number, mesege: string) => void
  friendId: string
}

type FormType = {
  text: string
}
