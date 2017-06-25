import React, {Component} from "react";
import {Link} from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to user administration app</h1>
        <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
      </div>
    )
  }
}

export default Landing
