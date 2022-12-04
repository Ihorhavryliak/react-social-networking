import React, { useState } from 'react';
import styles from './Paginator.module.css';
import cn from 'classnames';
import { Button } from 'antd';

type PropsType = {
  totalUserCount: number, 
  pageSize: number, 
  curruntPage: number, 
  onPageChange: (pageNumber: number) => void, 
  portionSize?: number
}

const Paginator: React.FC<PropsType> = ({totalUserCount, pageSize, curruntPage, onPageChange, portionSize = 10}) => {

  let pagesCount = Math.ceil(totalUserCount / pageSize);
  let pages: Array<number> = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let potrionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let righttPortionPageNumber = portionNumber * portionSize;

  return (
      <div className={styles.paginator}>
        {portionNumber > 1 &&
        <Button onClick={() => setPortionNumber(portionNumber - 1)}>Previos</Button>
}
        {pages.filter(p => p >= leftPortionPageNumber && p <= righttPortionPageNumber)
        .map((p, i) => {
          return <span key={'-' + i}
            className={cn({
             [styles.selectedPage] : curruntPage === p 
            }, styles.pageNumber )}
            onClick={(e) => {onPageChange(p) ;
            }}>{p}</span>
        })}

        { potrionCount > portionNumber &&
           <Button onClick={() => setPortionNumber(portionNumber + 1)}>Next</Button>
        }
      </div>

  )
}

export default Paginator