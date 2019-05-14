import React, { Component } from 'react'
import { Link } from "react-router-dom";

export class AttendingEvents extends Component {
  render() {
    let events = this.props.events;
    if(!events){
      return <div>Events loading...</div>
    }
    let eventArray = [];
    events.forEach(elm => {
      eventArray.push(
        <Link to={`/event/${elm.id}`}>
          <div className="event-box">
            <header>
              <h2>{elm.title}</h2>
              <p><strong>Category:</strong> {elm.category}</p>
            </header>
          </div>
        </Link>
      )
    });
    return (
      <div className="browse-events">
        {eventArray}
      </div>
    )
  }
}

export default AttendingEvents
