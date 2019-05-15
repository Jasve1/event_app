import React, { Component } from 'react'

export class AttendEvent extends Component {
  handleAttend = (e) => {
      e.preventDefault();
    this.props.attendEvent(this.props.event);
    this.succes();
  }

  success = () => {
    return (
      <div>
        <h2>Attending event</h2>
      </div>
    )
  }

  render() {
    return (
      <div>
        <button onClick={this.handleAttend}>Attend event</button>
        {this.success}
      </div>
    )
  }
}

export default AttendEvent;
