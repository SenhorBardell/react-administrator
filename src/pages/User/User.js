import React, {Component} from "react";
import UserForm from "../../components/UserForm";
import moment from "moment";
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
      .then(user => {
        user.birth_date = moment(user.birth_date).format('YYYY-MM-DD');
        return this.setState({user})
      })
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
      .then(user => {
        user.birth_date = moment(user.birth_date).format('YYYY-MM-DD');
        return this.setState({user})
      })
  }

  change(e) {
    const user = Object.assign({}, this.state.user);
    let name = e.target.name.substring(5); // since i am not submitting for, rather object
    name = name.substr(0, name.length - 1); // fancy names is obsolete
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

  render() {
    return (
      <div className="page">
        <header>Show user</header>
        <div className="container">
          <UserForm
            submit={e => this.submit(e)}
            change={e => this.change(e)}
            user={this.state.user}
            password={false}/>
          <div>
            <h2>Email this user</h2>
            <form onSubmit={e => this.email(e)}>
              <input
                type="email"
                value={this.state.email}
                placeholder="email"
                onChange={e => this.updateEmail(e)}/>
              <input type="submit" value="Send"/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default User