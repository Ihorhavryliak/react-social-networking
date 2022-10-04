import se from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
  return (
    <div className={se.items + ' ' + se.active}>
      <img className={se.imagess} alt="sfd" src={props.src} />
      <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
    </div>
  )
}


export default DialogItem;