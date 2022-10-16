export const reqiaret = value => {
  if(value) {
    return undefined
  } 
    return 'Field is reqired'

}


export const maxLengthCreator = (maxLenght) => value => {
  if(value && value.length > maxLenght) {
    return `Max length is ${maxLenght} symbol`
  } 
  return undefined;
}