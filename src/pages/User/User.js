import React, {Component} from "react";
import "./User.css";

const api = process.env.REACT_APP_API_URL;

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    fetch(`${api}/users/${this.props.match.params.id}`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(user => this.setState({user}))
  }

  submit(e) {
    e.preventDefault();
    return fetch(`${api}/users/${this.props.match.params.id}`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        user: this.state.user
      })
    })
      .then(response => response.json())
      .then(user => this.setState({user}))
  }

  change(e) {
    const user = Object.assign({}, this.state.user);
    let name = e.target.name.substring(5);
    name = name.substr(0, name.length - 1);
    user[name] = e.target.value;
    this.setState({user})
  }

  updateEmail(e) {
    const email = e.target.value;
    this.setState({email})
  }

  email(e) {
    e.preventDefault();
    return fetch(`${api}/users/${this.state.user.id}/email?email=${this.state.email}`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${window.localStorage.getItem('token')}`
      }
    }).then(response => alert('done'))
  }

  clearValidity(e) {
    e.target.setCustomValidity('')
  }
  render() {
    return (
      <div>
        <form onSubmit={e => this.submit(e)}>
          <div>
            <label>
              First name:
              <input
                type="text" name="user[first_name]"
                value={this.state.user.first_name}
                onChange={e => this.change(e)}
                onBlur={e => this.clearValidity(e)}/>
            </label>
          </div>
          <div>
            <label>
              Last name:
              <input
                type="text" name="user[last_name]"
                value={this.state.user.last_name}
                onChange={e => this.change(e)}
                onBlur={e => this.clearValidity(e)}/>
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email" name="user[email]"
                value={this.state.user.email}
                onChange={e => this.change(e)}
                onBlur={e => this.clearValidity(e)}/>
            </label>
          </div>
          <div>
            <label>
              Birth date:
              <input
                type="date" name="user[birthdate]"
                value={this.state.user.birthdate}
                onChange={e => this.change(e)}
                onBlur={e => this.clearValidity(e)}/>
            </label>
          </div>
          <div>
            <label>
              Bio:
              <textarea name="user[bio]"
                        onBlur={e => this.clearValidity(e)}
                        value={this.state.user.bio}
                        onChange={e => this.change(e)}
              ></textarea>
            </label>
          </div>
          <div>
            <input type="submit" value="Submit"/>
          </div>
        </form>
        <div>
          <h2>Email this user</h2>
          <form onSubmit={e => this.email(e)}>
            <input type="email" value={this.state.email} placeholder="email" onChange={e => this.updateEmail(e)}/>
            <input type="submit" value="Send"/>
          </form>
        </div>
      </div>
    )
  }
}

export default User