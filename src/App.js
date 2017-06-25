import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, withRouter} from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";
import Welcome from "./pages/Welcome/Welcome";
import Auth from "./services/Auth";
import Landing from "./pages/Landing/Landing";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Landing}/>
          <PrivateRoute exact path="/app" component={Welcome} public="true"/>
          <Route exact path="/login" component={Login}/>
          <PrivateRoute exact path="/users" component={Dashboard}/>
          <PrivateRoute path="/users/:id" component={User}/>
        </div>
      </Router>
    )
  }
}

const AuthButton = withRouter(({history}) => (
  Auth.isAuthenticated ? (
    <a href="#" onClick={() => Auth.clear().then(() => history.push('/'))}>Log out</a>
  ) : (
    <a href="#" onClick={() => history.push('/login')}>Log in</a>
  )
));

const PrivateRoute = ({component: Component, public: Public, ...rest}) => (
  <Route {...rest} render={props => (
    Auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{pathname: '/', state: {from: props.location}}}/>
    )
  )}/>
);

export default App;
