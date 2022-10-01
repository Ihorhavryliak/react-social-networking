import s from './Slidebar.module.css';

const Sidebar = () => {
  return (
    <nav className={s.nav}>
      <div><a href="">Profile</a> </div>
      <div><a href="">Messege</a> </div>
      <div><a href="">News</a> </div>
      <div><a href="">Music</a> </div>
      <div><a href="">Settings</a> </div>
    </nav>
  )
}

export default Sidebar;