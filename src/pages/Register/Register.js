import React, {Component} from "react";
import UserForm from "../../components/UserForm";

const api = process.env.REACT_APP_API_URL;
const url = process.env.PUBLIC_URL;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }
  submit(e) {
    e.preventDefault();
    return fetch(`${api}/users`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        user: this.state.user
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          const field = Object.keys(data.errors)[0];
          const el = document.querySelector(`[name=user\\\[${field}\\\]`); // eslint-disable-line
          el.setCustomValidity(data.errors[field].join(', '));
          el.reportValidity()
        } else {
          window.localStorage.setItem('token', data.token);
          window.localStorage.setItem('roles', data.roles.join(', '));
          window.localStorage.setItem('id', data.id);
          if (data.roles.includes('admin')) return this.props.history.push(`${url}/users`);

          return this.props.history.push(`${url}/app`)
        }
      })
  }

  clearValidity(e) {
    e.target.setCustomValidity('')
  }

  change(e) {
    const user = Object.assign({}, this.state.user);
    let name = e.target.name.substring(5);
    name = name.substr(0, name.length - 1);
    user[name] = e.target.value;
    this.setState({user})
  }

  render() {
    return (
      <div className="page">
        <header>Register</header>
        <div className="container">
        <UserForm
          submit={e => this.submit(e)}
          change={e => this.change(e)}
          user={this.state.user}
          password={true}/>
        </div>
      </div>
    )
  }
}

export default Register
