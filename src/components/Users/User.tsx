import React from 'react';
import styles from './users.module.css';
import userPhoto from './../../assets/images/image-user.png'
import { NavLink } from 'react-router-dom';
import { UserType,  } from '../../types/types';




type PropsType = {
  users: UserType
  followingInProgres: Array<number>
  unfollow: (userId: number)=> void
  follow: (userId: number)=> void
}


const User: React.FC<PropsType> = ({users, followingInProgres, unfollow, follow}) => {
  return (
       <div>
          <span>
            <div>
              <NavLink to={'/profile/' + users.id}>
                <img src={(users.photos.small !== null) ? users.photos.small : userPhoto} alt="got" className={styles.userPhoto} />
              </NavLink>
            </div>
            <div>
              {users.followed
                ? <button className={styles.buttonFollow} disabled={followingInProgres.some(id => id === users.id)} onClick={() => {
                  unfollow(users.id)
                }}>Unfollow</button>
                : <button className={styles.buttonFollow} disabled={followingInProgres.some(id => id === users.id)} onClick={() => {
                  follow(users.id)
                }}>Follow</button>}
            </div>
          </span>
          <span>
            <span>
              <div>{users.name}</div>
              <div>{users.status}</div>
            </span>
            <span>
              <div>{/* u.location.country */}</div>
              <div>{/* u.location.city */}</div>
            </span>
          </span>
        </div>
        )

}

export default User