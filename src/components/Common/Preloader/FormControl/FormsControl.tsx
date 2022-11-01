import { Field,WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import { ValidatorFiledType } from '../../../../utils/validator';
import styles from './FormsControl.module.css'

type FormControlPropsType = {
meta: WrappedFieldMetaProps
children: React.ReactNode
}
/* type FormControlType = (params: FormControlPropsType) => React.ReactNode; */

const FormControl: React.FC<FormControlPropsType> = ({meta: { touched, error }, children}) => {
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

export type TextareaType = {

}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  //const { input, meta, ...restProps } = props;
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}><textarea className="ant-input"  {...input} {...restProps} /></FormControl>
  )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
    // @ts-ignore
  if (restProps.type === 'checkbox') {
    return (
      <FormControl {...props}><input  {...input} {...restProps} /></FormControl>
    )
  } else { 
    return (
      <FormControl {...props}><input className="ant-input" {...input} {...restProps} /></FormControl>
    )
  }

}


//generetic
export function creatField<FormKeysType extends string> (placeholder: string | undefined, name: FormKeysType, 
  validate: Array<ValidatorFiledType>,
  component:  React.FC<WrappedFieldProps>, props = {}, text = '')  {
  return (
    <div>
      <Field placeholder={placeholder} validate={validate} name={name} component={component}  {...props} /> {text}
    </div>
  )

}

export type GetStringKeysType<T> = Extract<keyof T, string>