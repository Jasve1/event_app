import React, { Component } from 'react'

import AttendEvent from './AttendEvent';

export class Event extends Component {
  render() {
    let event = this.props.eventData
    if(!event){
      return <div>Event loading...</div>
    }
    if(!event.attending){
      return (
        <div>
          <h1>{event.title}</h1>
          <AttendEvent 
            attendEvent={this.props.attendEvent} 
            event={event}
            findAttending={this.props.findAttending}
          />
        </div>
      )
    }
    return (
      <div>
        <h1>{event.title}</h1>
        <h3>Attending event</h3>
      </div>
    )
  }
}

export default Event
