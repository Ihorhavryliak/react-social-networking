
import { Field } from 'redux-form';
import styles from './FormsControl.module.css'


const FormControl = ({ input, meta: { touched, error }, children }) => {
  const showError = touched && error;
  return (
    <div className={styles.formControl + ' ' + (showError ? styles.error : '')}>
      <div>
        {children}
      </div>
      {showError && <span>{error}</span>}
    </div>
  )
}

export const Textarea = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
  )
}

export const Input = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}><input {...input} {...restProps} /></FormControl>
  )
}

export const creatField = (placeholder, name, validate, component, props = {}, text = '') => {
  return (
    <div>
      <Field placeholder={placeholder} validate={validate} name={name} component={component}  {...props} /> {text}
    </div>
  )

}