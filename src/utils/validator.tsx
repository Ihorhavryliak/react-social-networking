
export type ValidatorFiledType = (value: string) => string | undefined

export const reqiaret: ValidatorFiledType = (value)=> {
  if(value) {
    return undefined
  } 
    return 'Field is reqired'

}
export type cantNullFiledType = (value: string) => string | undefined;

export const cantNull: ValidatorFiledType = (value)=> {
  if(value) {
    return undefined
  } 
    return 'Field can not be empty'

}
type UrlLingType = (value: string) => string | undefined;

export const urlLing: UrlLingType = (value)=> {
    if(!value) {
      return undefined;
    }
    let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    if (!!pattern.test(value)) {
      return undefined;
    } else {
      return 'Invalid url format. Exapmle: https://uk-ua.facebook'
    }


}



export const maxLengthCreator = (maxLenght: number): ValidatorFiledType => (value) => {
  if(value && value.length > maxLenght) {
    return `Max length is ${maxLenght} symbol`
  } 
  return undefined;
}