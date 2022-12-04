import React from 'react';
import preloader from '../../../assets/images/load.svg'

type PropsType = {
}

const Preloader: React.FC<PropsType> = (props) => {
  return (
    <div /* style={{backgroundColor: 'white'}} */ className='preloAder'>
            <img alt="Load" src={preloader} />
          </div> 
  )
}

export default Preloader;