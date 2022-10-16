
import styles from './FormsControl.module.css'


const FormControl = ({input, meta, ...props}) => {
  const showError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + ' ' + (showError ? styles.error : '')}>
      <div>
      {props.children}
      </div>
      
      {showError && <span>{meta.error}</span>}
    </div>
  )
}

export const Textarea = (props) => {
 const {input, meta, ...restProps} = props;
  return (
    <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
  )
}

export const Input = (props) => {
  const {input, meta, ...restProps} = props;
  return (
    <FormControl {...props}><input {...input} {...restProps} /></FormControl>
  )
}