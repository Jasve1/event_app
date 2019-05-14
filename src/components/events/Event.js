import React, { Component } from 'react'

import AttendEvent from './AttendEvent';

export class Event extends Component {
  render() {
    let event = this.props.eventData
    if(!event){
      return <div>Event loading...</div>
    }
    return (
      <div>
        <h1>{event.title}</h1>
        <AttendEvent attendEvent={this.props.attendEvent} event={event}/>
      </div>
    )
  }
}

export default Event
