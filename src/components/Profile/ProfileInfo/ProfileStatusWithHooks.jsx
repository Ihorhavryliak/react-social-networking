import React, { useState } from "react";
import { useEffect } from "react";


const ProfileStatusWithHooks = (props) => {

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);
  
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

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
}

  return (
    <div>
      {!editMode &&
        <div>
          <span onDoubleClick={activateMode}>{props.status || '----'}</span>
        </div>
      }
      {editMode &&
        <div >
          <input onChange={onStatusChange} autoFocus={true} onBlur={deActivateAditMod}
            value={status}></input>
        </div>
      }
    </div>
  )

}



export default ProfileStatusWithHooks;