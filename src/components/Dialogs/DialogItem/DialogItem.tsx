import se from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
  id: number, 
  name: string, 
  src: string
}

const DialogItem: React.FC<PropsType> = (props) => {
  return (
    <div className={se.items + ' ' + se.active}>
      <img className={se.imagess} alt="sfd" src={props.src} />
      <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
    </div>
  )
}


export default DialogItem;