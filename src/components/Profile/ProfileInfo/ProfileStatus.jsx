import React from "react";


class ProfileStatus extends React.Component {

  state = {
    editMode: false,
    status: this.props.status
  }

  activateAditMod = () => {
    this.setState({
      editMode: true
    })
  }

  deActivateAditMod = () => {
    this.setState({
      editMode: false,
    });
    this.props.upDateStatuses(this.state.status);
  }

  onStatusChange = (e) => {
      this.setState({
      status: e.currentTarget.value
    });
  }

  componentDidUpdate (prevProps, prevState) {

    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }

  }

  render() {

    return (
      <div>
        {!this.state.editMode && 
        <div>
          <span  onDoubleClick={this.activateAditMod}>{this.props.status || '----'}</span>
        </div>
        }
        {this.state.editMode && 
        <div >
          <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateAditMod} 
          value={this.state.status}></input>
        </div>
        }
      </div>
    )
  }
}



export default ProfileStatus;