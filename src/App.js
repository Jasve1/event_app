import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import location from './utils/location';
import eventStore from './utils/eventStore';

import BrowseEvents from './components/events/BrowseEvents';
import AttendingEvents from './components/userEvents/AttendingEvents';
import Navigation from './components/Navigation';
import Event from './components/events/Event';

class App extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      events: [],
      attending: [],
      isLoading: true,
      position: {
        range: null,
        minLat: null,
        maxLat: null,
        minLong: null,
        maxLong: null
      }
    }

    this.attendEvent = this.attendEvent.bind(this);
    this.getAttending = this.getAttending.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});
    console.log("App component has mounted"); 
    this.getAttending();
    this.getData();
  }

  getData(){
    fetch('http://localhost:8080/api/events')
    .then(response => response.json())
    .then(json => {
      if(navigator.geolocation){
        location.getLocation()
        .then(res => {
          this.setState({position: res})
          this.setState({events: location.filterByPosition(json.results, this.state.position), isLoading: false})
        })
      }
      this.setState({events: json.results});
    })
    .then(() => {
      console.log(this.state.events);
      this.state.attending.forEach(attend => {
        this.findAttending(attend.id);
      });
      this.setState({isLoading: false});
    })
  }

  getAttending(){
    eventStore.getEvents()
    .then(res => {
      this.setState({attending: res});
    })
  }

  findAttending = (id) => {
    this.state.events.forEach(event => {
      if(event.id === id){
        event["attending"] = true;
        console.log(event);
      }
    })
  }

  changeAttendStatus = (event) => {
    event["attending"] = true;
  }

  attendEvent(event){
    fetch('http://localhost:8080/api/attend', {
      method: 'post',
      body: JSON.stringify({
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        category: event.category,
        start: event.start,
        end: event.end
      }),
      headers:{
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(() => {
      this.getAttending();
    })
  }

  getEventById(id){
    let eventFound = this.state.events.find(elm => elm.id === id);
    return eventFound;
  }

  renderEvent(props, id){
    let event = this.getEventById(id);
    return <Event {...props} 
                eventData={event} 
                attendEvent={this.attendEvent} 
                changeAttendStatus={this.changeAttendStatus}
            />
  }

  render() {
    return (
      <Router>
        <header className="main-header">
          <h1>The Eventship</h1> {/*place logo here maybe */}
        </header>
        <main>
          <Switch>

            <Route exact path={'/'} render={ props =>
              this.state.isLoading ? <div>Events loading...</div> :
                <BrowseEvents {...props} eventData={this.state.events} position={this.state.position}/>
            } />

            <Route exact path={'/event/:id'} render={ props =>
              this.renderEvent(props, props.match.params.id)
            } />

            <Route exact path={'/attending'} render={ props => 
              <AttendingEvents {...props} events={this.state.attending}/> 
            } />

          </Switch>
        </main>
        <footer>
          <Navigation/>
        </footer>
      </Router>
    );
  }
}

export default App;
