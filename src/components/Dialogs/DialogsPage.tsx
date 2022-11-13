import se from './Dialogs.module.css';
import React, { useEffect } from 'react';
import { AppDispatch } from '../../redux/redux-store';
import { useDispatch } from 'react-redux';
import { setDialog } from '../../redux/dialogs-reducer';
import { useSelector } from 'react-redux';
import { getInformDialog, } from '../../redux/dialog-selector';
import { ListDialogsPage } from './ListDialogsPage';
import Preloader from '../Common/Preloader/Preloader';
import { getSsFeching } from '../../redux/user-selectors';


export const DialogsPage = React.memo(() => {

  const userId = useSelector(getInformDialog);
  const isDialogsLoads = useSelector(getSsFeching);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setDialog())
  }, [])
  
  /* const birthday = Date.parse('2022-11-08 T13:46:46.523'); 
  console.log(birthday) */
  return (<>
    {isDialogsLoads && <Preloader />}
    <div className={se.dialogs}>
      {userId.length > 0 ? userId.map(d => {
        return (
          <ListDialogsPage d={d} key={d.id} />
        )
      })
    : <>No any message</>
    }
    </div>
    </>
  );
});

export default DialogsPage;




