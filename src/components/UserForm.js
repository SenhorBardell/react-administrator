import React, {Component} from "react";

class UserForm extends Component {
  constructor(props) {
    super(props)
  }

  submit(e) {
    this.props.submit(e)
  }

  clearValidity(e) {
    e.target.setCustomValidity('')
  }

  change(e) {
    this.props.change(e)
  }

  render() {
    return (<form onSubmit={e => this.submit(e)}>
      <div className="form-row">
        <label>First name:</label>
        <input
          type="text" name="user[first_name]"
          value={this.props.user.first_name}
          onChange={e => this.change(e)}
          onBlur={e => this.clearValidity(e)}/>
      </div>
      <div className="form-row">
        <label>Last name:</label>
        <input
          type="text" name="user[last_name]"
          value={this.props.user.last_name}
          onChange={e => this.change(e)}
          onBlur={e => this.clearValidity(e)}/>
      </div>
      <div className="form-row">
        <label>Email:</label>
        <input
          type="email" name="user[email]"
          value={this.props.user.email}
          onChange={e => this.change(e)}
          onBlur={e => this.clearValidity(e)}/>
      </div>
      {this.props.password ? <div>
        <label>Password:</label>
        <input
          type="password" name="user[password]"
          value={this.props.user.password}
          onChange={e => this.change(e)}
          onBlur={e => this.clearValidity(e)}/>
      </div> : ''}
      <div className="form-row">
        <label>Birth date:</label>
        <input
          type="date" name="user[birthdate]"
          value={this.props.user.birthdate}
          onChange={e => this.change(e)}
          onBlur={e => this.clearValidity(e)}/>
      </div>
      <div className="form-row">
        <label>Bio:</label>
        <textarea name="user[bio]"
                  onBlur={e => this.clearValidity(e)}
                  value={this.props.user.bio}
                  onChange={e => this.change(e)}
        ></textarea>
      </div>
      <div className="form-row">
        <input type="submit" value="Submit"/>
      </div>
    </form>)
  }
}

export default UserForm