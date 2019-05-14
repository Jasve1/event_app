import React, { Component } from 'react'

export class AttendEvent extends Component {
  constructor(props){
    super(props);

    this.state = {
      attending: false
    }
  }
  handleAttend = (e) => {
      e.preventDefault();
    this.props.attendEvent(this.props.event);
    this.setState({attending: true});
  }
  render() {
    if(!this.state.attending){
      return (
        <div>
          <button onClick={this.handleAttend}>Attend event</button>
        </div>
      )
    }
    return (
      <div>
        <h3>You've choosen to attend!</h3>
      </div>
    )
  }
}

export default AttendEvent
