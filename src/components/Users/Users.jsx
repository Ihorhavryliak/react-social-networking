import React from 'react';
import styles from './users.module.css';
import userPhoto from './../../assets/images/image-user.png'
import { NavLink } from 'react-router-dom';
import axios from 'axios';


const Users = (props) => {

  let pagesCount = Math.ceil(props.totalUserCount / props.pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  return (
    <div>
      <div>
        {pages.map((v, i) => {
          return <span key={'-' + i}
            className={props.curruntPage === v ? styles.selectedPage : ''}
            onClick={(e) => { props.onPageChange(v) }}>{v}</span>
        })}

      </div>
      {
        props.users.map(u => <div key={u.id}>
          <span>
            <div>
              <NavLink to={'/profil/' + u.id}>
                <img src={(u.photos.small !== null) ? u.photos.small : userPhoto} alt="got" className={styles.userPhoto} />
              </NavLink>
            </div>
            <div>
              {u.followed
                ? <button disabled={props.followingInProgres.some(id => id === u.id)} onClick={() => {
                  props.toggFollowingProgres(true, u.id);
                  axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                    withCredentials: true,
                    headers: {
                      "API-KEY": "3b4235c9-3ad0-432a-a8a4-8bf64ae9fa5f"
                    }
                  })
                    .then(response => {
                      if (response.data.resultCode === 0) {
                        props.unfollow(u.id)
                      }
                      props.toggFollowingProgres(false, u.id);
                    });



                }}>Unfollow</button>
                : <button disabled={props.followingInProgres.some(id => id === u.id)}  onClick={() => {
                  props.toggFollowingProgres(true, u.id);
                  axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},
                    {
                      withCredentials: true,
                      headers: {
                        "API-KEY": "3b4235c9-3ad0-432a-a8a4-8bf64ae9fa5f"
                      }
                    })
                    .then(response => {
                      if (response.data.resultCode === 0) {
                        props.followed(u.id)
                      }
                      props.toggFollowingProgres(false, u.id);
                    });



                }}>Follow</button>}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{/* u.location.country */}</div>
              <div>{/* u.location.city */}</div>
            </span>
          </span>
        </div>
        )
      }
    </div>
  )
}

export default Users