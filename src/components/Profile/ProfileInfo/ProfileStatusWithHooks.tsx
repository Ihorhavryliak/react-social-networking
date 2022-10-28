import React, { useState } from "react";
import { useEffect } from "react";


type ProfileStatusWithHooksType = {
  status: string
  upDateStatuses: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<ProfileStatusWithHooksType> = (props) => {

  let [editMode, setEditMode] = useState<boolean>(false);
  let [status, setStatus] = useState<string>(props.status);
  
  useEffect(() => {
    setStatus(props.status);
  }, [props.status])


  const activateMode = () => {
    setEditMode(true);
  };

  let deActivateAditMod = () => {
   setEditMode(false);
   props.upDateStatuses(status);
  };

  const onStatusChange = (e: React.FormEvent<HTMLInputElement> ) => {
    setStatus(e.currentTarget.value);
}

  return (
    <div>
      {!editMode &&
        <div>
        <b>Status</b>:  <span onDoubleClick={activateMode}>{props.status || '----'}</span>
        </div>
      }
      {editMode &&
        <div >
       <b>Status</b>:   <input onChange={onStatusChange} autoFocus={true} onBlur={deActivateAditMod}
            value={status}></input>
        </div>
      }
    </div>
  )

}



export default ProfileStatusWithHooks;