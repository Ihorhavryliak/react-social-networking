import se from './../Dialogs.module.css';
type PropsType = {
  messege: string
}
const Messege: React.FC<PropsType> = (props) => {
  return (
    <div className={se.messege}>
      {props.messege}
    </div>
  )
}


export default Messege;