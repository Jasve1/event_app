import React, { Component } from 'react'
import { Link } from "react-router-dom";

export class Navigation extends Component {
  render() {
    return (
      <nav id="main-nav">
        <ul>
          <li>
            <Link to={'/'}>
              <h3>Browse</h3> 
            </Link>
          </li>
          <li>
            <Link to={'/attending'}>
              <h3>Attending</h3> 
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navigation
