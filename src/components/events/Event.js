import React, { Component } from 'react'

export class Event extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.eventData.title}</h1>
      </div>
    )
  }
}

export default Event
