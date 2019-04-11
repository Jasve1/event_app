import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import BrowseEvents from './components/events/BrowseEvents';
import AttendingEvents from './components/userEvents/AttendingEvents';
import Navigation from './components/Navigation';

class App extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      events: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});
    console.log("App component has mounted");
    this.getData();
  }

  getData(){
    fetch('http://localhost:8080/api/events')
    .then(response => response.json())
    .then(json => {
      this.setState({events: json.results, isLoading: false});
      console.log(this.state.events);
    })
  }

  render() {
    return (
      <Router>
        <header className="main-header">
          <h1>The Eventship</h1> {/*place log here maybe */}
        </header>
        <main>
          <Switch>

            <Route exact path={'/'} render={ props =>
              this.state.isLoading ? <div>Events loading...</div> :
                <BrowseEvents {...props} eventData={this.state.events} />
            } />
            <Route exact path={'/attending'} render={ props => 
              <AttendingEvents {...props} /> 
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
