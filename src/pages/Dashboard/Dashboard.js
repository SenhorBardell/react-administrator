import React from "react";
import {Link} from "react-router-dom";
import "./Dashboard.css";

const api = process.env.REACT_APP_API_URL;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentWillMount() {
    console.log(api, process.env.REACT_APP_API_URL);
    fetch(`${api}/users`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(users => this.setState({users}))
  }

  delete(e, user) {
    const confirmed = window.confirm(`Are you sure you want to delete ${user.first_name} ${user.last_name}`);
    if (confirmed) {
      fetch(`${api}/users/${user.id}`, {
        headers: {
          Authorization: `Token ${window.localStorage.getItem('token')}`
        },
        method: 'DELETE'
      })
        .then(response => {
          if (response.status === 204) {
            const users = this.state.users.filter(u => u.id !== user.id);
            this.setState({users})
          }
        })
    }
  }
  render() {
    return (
      <div>
        <h1>users</h1>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>
              <Link to={`${this.props.match.url}/${user.id}`}>{`${user.first_name} ${user.last_name}`}</Link>
              &nbsp;
              <button onClick={e => this.delete(e, user)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Dashboard