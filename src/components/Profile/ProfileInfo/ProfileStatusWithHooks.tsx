import { Input } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { upDateStatuses } from "../../../redux/profile_reducer";
import { AppDispatch, AppStateType } from "../../../redux/redux-store";
import style from './ProfileInfo.module.css';

type ProfileStatusWithHooksType = {
  status: string
  upDateStatuses: (status: string) => void
}


const ProfileStatusWithHooks: React.FC<ProfileStatusWithHooksType> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.profilePage.status)

  let [editMode, setEditMode] = useState<boolean>(false);
  let [statuse, setStatus] = useState<string>(status);
  
  useEffect(() => {
    setStatus(status);
  }, [status])


  const activateMode = () => {
    setEditMode(true);
  };

  let deActivateAditMod = () => {
   setEditMode(false);
   dispatch(upDateStatuses(statuse));
  };

  const onStatusChange = (e: React.FormEvent<HTMLInputElement> ) => {
    setStatus(e.currentTarget.value);
}

  return (
    
    <div>
      {!editMode &&
        <div className={style.status}>
       {/* <span className={style.statusName}> <b>Status</b>:</span> */}<span>   <Input className={style.fieldStatus} value={status || '----' } onClick={activateMode} /></span>
        </div>
      }
      {editMode &&
        <div className={style.status}>
       {/* <span className={style.statusName}> <b>Status</b>:</span> */}<span>   <Input className={style.fieldStatus} onChange={onStatusChange} autoFocus={true} onBlur={deActivateAditMod}
            value={statuse} /></span>
        </div>
      }
    </div>
  )

}



export default ProfileStatusWithHooks;