import React, {Component} from "react";

const api = process.env.REACT_APP_API_URL;

class Register extends Component {
  submit(e) {
    e.preventDefault();
    console.log(new Map(new FormData(e.target)));
    return fetch(`${api}/users`, {
      method: 'POST',
      body: new FormData(e.target)
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
        <h1>Register</h1>
        <form onSubmit={e => this.submit(e)}>
          <div>
            <label>
              First name:
              <input type="text" name="user[first_name]" onBlur={e => this.clearValidity(e)}/>
            </label>
          </div>
          <div>
            <label>
              Last name:
              <input type="text" name="user[last_name]" onBlur={e => this.clearValidity(e)}/>
            </label>
          </div>
          <div>
            <label>
              Email:
              <input type="email" name="user[email]" onBlur={e => this.clearValidity(e)}/>
            </label>
          </div>
          <div>
            <label>
              Password:
              <input type="password" name="user[password]" onBlur={e => this.clearValidity(e)}/>
            </label>
          </div>
          <div>
            <label>
              Birth date:
              <input type="date" name="user[birthdate]" onBlur={e => this.clearValidity(e)}/>
            </label>
          </div>
          <div>
            <label>
              Bio:
              <textarea name="user[bio]" onBlur={e => this.clearValidity(e)}></textarea>
            </label>
          </div>
          <div>
            <input type="submit" value="Submit"/>
          </div>
        </form>
      </div>
    )
  }
}

export default Register
