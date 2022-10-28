import React from 'react';
import preloader from '../../../assets/images/load.svg'

type PropsType = {
}

const Preloader: React.FC<PropsType> = (props) => {
  return (
    <div style={{backgroundColor: 'white'}}>
            <img alt="Load" src={preloader} />
          </div> 
  )
}

export default Preloader;