import React from 'react';
import styles from './users.module.css';
import userPhoto from './../../assets/images/image-user.png'
import { NavLink } from 'react-router-dom';

const User = ({user, followingInProgres, unfollow, follow}) => {

  return (
       <div>
          <span>
            <div>
              <NavLink to={'/profile/' + user.id}>
                <img src={(user.photos.small !== null) ? user.photos.small : userPhoto} alt="got" className={styles.userPhoto} />
              </NavLink>
            </div>
            <div>
              {user.followed
                ? <button disabled={followingInProgres.some(id => id === user.id)} onClick={() => {
                  unfollow(user.id)
                }}>Unfollow</button>
                : <button disabled={followingInProgres.some(id => id === user.id)} onClick={() => {
                  follow(user.id)
                }}>Follow</button>}
            </div>
          </span>
          <span>
            <span>
              <div>{user.name}</div>
              <div>{user.status}</div>
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