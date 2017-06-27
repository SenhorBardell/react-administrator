import React, {Component} from "react";
import {BrowserRouter as Router, NavLink, Redirect, Route, Switch} from "react-router-dom";
import {CSSTransitionGroup} from "react-transition-group";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";
import Welcome from "./pages/Welcome/Welcome";
import Auth from "./services/Auth";
import Landing from "./pages/Landing/Landing";
import Register from "./pages/Register/Register";

const url = process.env.PUBLIC_URL;

class LogoutLink extends Component {
  logout(e) {
    e.preventDefault();
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('roles');
    window.localStorage.removeItem('id');
    this.props.history.replace(`${url}/`)
  }

  render() {
    return window.localStorage.getItem('token') && <a href={`${url}/`} onClick={e => this.logout(e)}>Log out</a>
  }
}

class AdminLink extends Component {
  render() {
    const rolesStr = window.localStorage.getItem('roles');
    if (rolesStr) {
      const roles = rolesStr.split(', ');
      return roles.includes('admin') && <NavLink to={`${url}/users`}>Users</NavLink>
    }
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <Route render={({location, history}) => (
          <div>
            <div className="content-background"></div>
            <div className="content">
              <CSSTransitionGroup transitionName="fade"
                                  transitionEnterTimeout={300}
                                  transitionLeaveTimeout={300}
                                  transitionAppear={true}
                                  transitionAppearTimeout={500}
              >
                <Switch key={location.key} location={location}>
                  <Route exact path={`${url}/`} component={Landing}/>
                  <PrivateRoute exact path={`${url}/app`} component={Welcome} pub="true"/>
                  <Route exact path={`${url}/login`} component={Login}/>
                  <Route exact path={`${url}/register`} component={Register}/>
                  <PrivateRoute exact path={`${url}/users`} component={Dashboard}/>
                  <PrivateRoute path={`${url}/users/:id`} component={User}/>
                </Switch>
              </CSSTransitionGroup>
              <nav>
                <h2>Navigation</h2>
                <div className="links">
                  <AdminLink/>
                  <NavLink to={`${url}/app`}>App</NavLink>
                  <LogoutLink history={history}/>
                </div>
              </nav>
            </div>
          </div>
        )}/>
      </Router>
    )
  }
}


const PrivateRoute = ({component: Component, pub, ...rest}) => (
  <Route {...rest} render={props => (

    Auth.isAuthenticated() && pub || Auth.isAuthorized() && Auth.isAuthenticated() ? ( // eslint-disable-line
      <Component {...props}/>
    ) : (
      <Redirect to={{pathname: `${url}/`, state: {from: props.location}}}/>
    )
  )}/>
);

export default App;
