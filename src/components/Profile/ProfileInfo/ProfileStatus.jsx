import React from "react";


class ProfileStatus extends React.Component {
  state = {
    editMode: false
  }

  activateAditMod = () => {

    this.setState({
      editMode: true
    })
  }

  deActivateAditMod = () => {
    this.setState({
      editMode: false
    })
  }

  render() {
    return (
      <div>
        {!this.state.editMode && 
        <div>
          <span onDoubleClick={this.activateAditMod}>{this.props.status}</span>
        </div>
        }
        {this.state.editMode && 
        <div >
          <input autoFocus={true} onBlur={this.deActivateAditMod} value={this.props.status}></input>
        </div>
        }
      </div>
    )
  }
}



export default ProfileStatus;