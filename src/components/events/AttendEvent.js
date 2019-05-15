import React, { Component } from 'react'
import eventStore from '../../utils/eventStore';

export class AttendEvent extends Component {
  
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

    this.props.changeAttendStatus(this.props.event);

    eventStore.addToObjectStore("events", attendEvent)
    .then(res => {
      console.log(res);
    })
    this.props.attendEvent(attendEvent);


    //Trigger bgSync if supported
    // if("serviceWorker" in navigator && "SyncManager" in window){
    //   this.triggerEventQueueUpdate()
    // }else{
    //   this.props.attendEvent(attendEvent);
    // }
    
  }

  // triggerEventQueueUpdate = () => {
  //   navigator.serviceWorker.ready.then(reg => {
  //       reg.sync.register("event-queue-sync");
  //     });
  // }

  render() {
    return (
      <div>
        <button onClick={this.handleAttend}>Attend event</button>
      </div>
    )
  }
}

export default AttendEvent
