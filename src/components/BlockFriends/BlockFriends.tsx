import se from './BlockFriends.module.css';

type BlockFriendsType = {
  key: number
  name: string
}


const BlockFriends: React.FC<BlockFriendsType> = (props) => {
  return (

        <span className={se.pad}>
          <span className={se.colo}></span>
          {props.name}
        </span>
  )
}


export default BlockFriends;