import React, {Component} from "react";
import "./Login.css";

const api = process.env.REACT_APP_API_URL;

class Login extends Component {
  submit(e) {
    e.preventDefault();
    return fetch(`${api}/users/auth`, {
      method: 'POST',
      body: new FormData(e.target)
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          const field = Object.keys(data.errors)[0];
          const el = document.querySelector(`[name=${field}]`);
          el.setCustomValidity(data.errors[field].join(', '));
          el.reportValidity()
        } else {
          window.localStorage.setItem('token', data.token);
          window.localStorage.setItem('roles', data.roles.join(', '));
          window.localStorage.setItem('id', data.id);
          if (data.roles.includes('admin')) return this.props.history.push('/users');

          return this.props.history.push('/app')
        }
      })
  }

  clearValidity(e) {
    e.target.setCustomValidity('')
  }
  render() {
    return (
      <div>
        <h1>Auth</h1>
        <form onSubmit={e => this.submit(e)}>
          <div>
            <label>
              Email:
              <input type="email" name="email" onBlur={e => this.clearValidity(e)}/>
            </label>
          </div>
          <div>
            <label>
              Password:
              <input type="password" name="password" onBlur={e => this.clearValidity(e)}/>
            </label>
          </div>
          <div>
            <input type="submit" value="submit"/>
          </div>
        </form>
      </div>
    )
  }
}

export default Login