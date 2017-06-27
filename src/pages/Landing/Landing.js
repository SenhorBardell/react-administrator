import React, {Component} from "react";
import {Link} from "react-router-dom";

const url = process.env.PUBLIC_URL;

class Landing extends Component {
  componentWillMount() {
    const token = window.localStorage.getItem('token');
    const rolesStr = window.localStorage.getItem('roles');
    if (token && rolesStr) {
      const roles = rolesStr.split(', ');
      if (roles.includes('admin')) return this.props.history.push(`${url}/users`);

      return this.props.history.push(`${url}/app`)
    }
  }
  render() {
    return (
      <div>
        <h1>Welcome to user administration app</h1>
        <Link to={`${url}/login`}>Login</Link> or <Link to={`${url}/register`}>Register</Link>
      </div>
    )
  }
}

export default Landing
