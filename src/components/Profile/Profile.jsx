import Mypost from './Mypost/Mypost';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './Mypost/MyPostContainer'

const Content = (props) => {

  return (
    <div >
      <ProfileInfo/>
      <MyPostContainer />
  </div>
  )
}
export default Content