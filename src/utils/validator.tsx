
export type ValidatorFiledType = (value: string) => string | undefined

export const reqiaret: ValidatorFiledType = (value)=> {
  if(value) {
    return undefined
  } 
    return 'Field is reqired'

}


export const maxLengthCreator = (maxLenght: number): ValidatorFiledType => (value) => {
  if(value && value.length > maxLenght) {
    return `Max length is ${maxLenght} symbol`
  } 
  return undefined;
}