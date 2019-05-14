import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
      isLoading: false,
      position: {
        range: null,
        minLat: null,
        maxLat: null,
        minLong: null,
        maxLong: null
      }
    }

    this.findRange = this.findRange.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.attendEvent = this.attendEvent.bind(this);
    this.getAttending = this.getAttending.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});
    console.log("App component has mounted");
    this.getData();
    this.getAttending();
    this.getLocation();
  }

  getData(){
    fetch('http://localhost:8080/api/events')
    .then(response => response.json())
    .then(json => {
      if(this.state.position.maxLat){
        this.filterByPosition();
      }
      this.setState({events: json.results})
      this.setState({isLoading: false});
      console.log(this.state.events);
    })
  }

  getAttending(){
    fetch('http://localhost:8080/api/attending')
    .then(response => response.json())
    .then(json => {
      this.setState({attending: json});
      this.setState({isLoading: false});
      console.log(json);
    })
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
    .then(json => {
      this.getAttending();
      console.log(json);
    })
  }

  getEventById(id){
    let eventFound = this.state.events.find(elm => elm.id === id);
    return eventFound;
  }

  renderEvent(props, id){
    let event = this.getEventById(id);
    return <Event {...props} eventData={event} attendEvent={this.attendEvent}/>
  }

  getLocation(){
    return new Promise((res, rej) => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.findRange);
        res(this.state.position);
      }
      else{
        console.log('Geolocation is not supported');
        res(null);
      }
    });
  }
  
  findRange(position) {
    let range = 0.04;
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let minLat = lat - range;
    let maxLat = lat + range;
    let minLong = long - range;
    let maxLong = long + range;

    this.setState({
      position: {
        range: range,
        minLat: minLat,
        maxLat: maxLat,
        minLong: minLong,
        maxLong: maxLong
      }
    })
    console.log(this.state.position)
  }

  filterByPosition = () => {
    this.getLocation()
      .then((position) => {
        let events = this.state.events.filter(event => 
          event.location[0] >= position.minLat && event.location[0] <= position.maxLat
          && event.location[1] >= position.minLong && event.location[1] <= position.maxLong
        )
        this.setState({events: events, isLoading: false});
      })
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
