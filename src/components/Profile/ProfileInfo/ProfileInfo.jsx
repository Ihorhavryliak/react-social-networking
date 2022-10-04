import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
  return (
    <div >
      <div>
        <img className={s.image} alt="hooo" src="https://img.freepik.com/free-photo/wide-angle-shot-of-a-single-tree-growing-under-a-clouded-sky-during-a-sunset-surrounded-by-grass_181624-22807.jpg?w=2000"></img>
      </div>
      <div className={s.descri_pbloxk}>
        ava + des
      </div>
    </div>
  )
}
export default ProfileInfo;