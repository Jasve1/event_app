import React, { Component } from 'react'
import eventStore from '../../utils/eventStore';

export class AttendEvent extends Component {
  constructor(props){
    super(props);

    this.state = {
      isAttending: false
    }
  }
  
  handleAttend = (e) => {
    e.preventDefault();
    let attendEvent = {
      id: this.props.event.id,
      title: this.props.event.title,
      description: this.props.event.description,
      location: this.props.event.location,
      category: this.props.event.category,
      start: this.props.event.start,
      end: this.props.event.end,
      status: "sendt"
    }

    this.setState({isAttending: true})

    eventStore.addToObjectStore("events", attendEvent)
    .then(res => {
      console.log(res);
      this.props.findAttending(this.props.event.id);
    });

    this.props.attendEvent(attendEvent);
    
  }
  render() {
    if(!this.state.isAttending){
      return (
        <div>
          <button onClick={this.handleAttend}>Attend event</button>
        </div>
      )
    }
    return (
      <div>
        <h3>Request sendt!</h3>
      </div>
    )
  }
}

export default AttendEvent
