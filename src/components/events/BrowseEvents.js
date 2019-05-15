import React, { Component } from 'react'
import { Link } from "react-router-dom";

export class BrowseEvents extends Component {

  render() {
    let eventArray = [];
    let data = this.props.eventData;
    if(!data){
      return <div>Events loading...</div>
    }
    data.forEach(elm => {
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

    if(eventArray <= 0){
      return (
        <div>
          <p>No events in your area</p>
        </div>
      )
    }
    return (
        <div className="browse-events">
          {eventArray}
        </div>
      )
  }
}

export default BrowseEvents
