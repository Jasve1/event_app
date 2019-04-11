import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import BrowseEvents from './components/events/BrowseEvents';
import AttendingEvents from './components/events/AttendingEvents';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
      <Router>
        <header className="App">
          <h1>Header stuff</h1> {/*place log here maybe */}
        </header>
        <main>
          <Switch>

            <Route exact path={'/'} render={ props =>
                <BrowseEvents {...props} />
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
