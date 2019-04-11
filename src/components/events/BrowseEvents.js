import React, { Component } from 'react'

export class BrowseEvents extends Component {
  render() {

    let eventArray = [];
    let data = this.props.eventData;
    data.forEach(elm => {
        eventArray.push(
          <div className="event-box">
            <header>
              <h2>{elm.title}</h2>
              <p><strong>Category:</strong> {elm.category}</p>
            </header>
          </div>
        )
    });

      return (
        <div className="browse-events">
          {eventArray}
        </div>
      )
  }
}

export default BrowseEvents
