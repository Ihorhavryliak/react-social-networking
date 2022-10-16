import { NavLink } from 'react-router-dom';
import s from './Header.module.css';


const Header = (props) => {
  return (
    <header className={s.header}>
      <img alt='photos' src="https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x0"></img>
      <div className={s.loginBlock}>
        {props.isAuth ? <div>{props.login} - <button onClick={props.logOut}>Log out</button></div> 
        : <NavLink to='/login'>Login</NavLink>}
      </div>
    </header>
  )
}

export default Header;