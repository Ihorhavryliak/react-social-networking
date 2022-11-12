import React from 'react';
import styles from './users.module.css';
import userPhoto from './../../assets/images/image-user.png'
import { NavLink } from 'react-router-dom';
import { UserType,  } from '../../types/types';
import { Button } from 'antd';




type PropsType = {
  users: UserType
  followingInProgres: Array<number>
  unfollow: (userId: number)=> void
  follow: (userId: number)=> void
  createChat: (userId: number)=> void
}



const User: React.FC<PropsType> = ({users, followingInProgres, unfollow, follow, createChat}) => {
  return (
            <div className={styles.oneUserSearch}>
              <NavLink to={'/profile/' + users.id}>
                <img src={(users.photos.small !== null) ? users.photos.small : userPhoto} alt="got" className={styles.userPhoto} />
              </NavLink>
              <div className={styles.nameUser}>
              <NavLink to={'/profile/' + users.id}>{users.name}</NavLink>   
                </div>
              <div className={styles.status}>{users.status} </div>
              <div className={styles.sendMessage}>
              {users.followed
                ? <Button className={styles.buttonFollow} disabled={followingInProgres.some(id => id === users.id)} onClick={() => {
                  unfollow(users.id)
                }}>Unfollow</Button>
                : <Button className={styles.buttonFollow} disabled={followingInProgres.some(id => id === users.id)} onClick={() => {
                  follow(users.id)
                }}>Follow</Button>}
                       <Button onClick={() => createChat(users.id)}>Send Message</Button></div>
            </div>
        )

}

export default User