import se from './../Dialogs.module.css';

const Messege = (props) => {
  return (
    <div className={se.messege}>
      {props.messege}
    </div>
  )
}


export default Messege;