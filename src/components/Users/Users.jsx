import styles from './users.module.css'
const Users = (props) => {

  if (props.users.length === 0) {
    props.setUsers({users: [
      {id: 1, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSqze_aA54povlzYiL_6SyPkvMicwJ_ilzA&usqp=CAU', followed: false, fullName: 'Ihor', status: 'I am a boss', location: {city: 'Lviv', country: 'Ukraine'} }, 
      {id: 2, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSqze_aA54povlzYiL_6SyPkvMicwJ_ilzA&usqp=CAU', followed: true, fullName: 'Vasia', status: 'I am a boss too', location: {city: 'London', country: 'Ukraine'} }, 
      {id: 3, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSqze_aA54povlzYiL_6SyPkvMicwJ_ilzA&usqp=CAU', followed: false, fullName: 'Roman', status: 'I am not a boss', location: {city: 'Lviv', country: 'USA'} }, 
      {id: 4, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSqze_aA54povlzYiL_6SyPkvMicwJ_ilzA&usqp=CAU', followed: false, fullName: 'Name', status: 'I am  not a boss', location: {city: 'Lviv', country: 'Ukraine'} }, 
      {id: 5, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSqze_aA54povlzYiL_6SyPkvMicwJ_ilzA&usqp=CAU', followed: false, fullName: 'Name', status: 'I am not a boss', location: {city: 'Lviv', country: 'Ukraine'} }, 
      {id: 6, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSqze_aA54povlzYiL_6SyPkvMicwJ_ilzA&usqp=CAU', followed: false, fullName: 'Name', status: 'I am not a boss', location: {city: 'Lviv', country: 'Ukraine'} }, 
    ]})
  }

  return (
    <div>
      {
        props.users.map(u => <div key={u.id}> 
                                <span>
                                  <div>
                                    <img src={u.photoUrl} alt="got" className={styles.userPhoto} />
                                    </div>
                                  <div>
                                    {u.followed 
                                    ?  <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button> 
                                    :  <button onClick={() => {props.follow(u.id)}}>Follow</button>}
                                   
                                  </div>
                                </span> 
                                <span>
                                  <span>
                                    <div>{u.fullName}</div>
                                    <div>{u.status}</div>
                                  </span>
                                  <span>
                                    <div>{u.location.country}</div>
                                    <div>{u.location.city}</div>
                                  </span>
                                </span>
                             </div> 
                       )
      }
    </div>
  )
}

export default Users