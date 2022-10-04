import se from './BlockFriends.module.css';


const BlockFriends = (props) => {
  return (

        <span className={se.pad}>
          <span className={se.colo}></span>
          {props.name}
        </span>
  )
}


export default BlockFriends;