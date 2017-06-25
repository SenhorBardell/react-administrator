import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";
import Welcome from "./pages/Welcome/Welcome";
import Auth from "./services/Auth";
import Landing from "./pages/Landing/Landing";
import Register from "./pages/Register/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Landing}/>
          <PrivateRoute exact path="/app" component={Welcome} pub="true"/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <PrivateRoute exact path="/users" component={Dashboard}/>
          <PrivateRoute path="/users/:id" component={User}/>
        </div>
      </Router>
    )
  }
}


const PrivateRoute = ({component: Component, pub, ...rest}) => (
  <Route {...rest} render={props => (

    Auth.isAuthenticated() && pub || Auth.isAuthorized() && Auth.isAuthenticated() ? ( // eslint-disable-line
      <Component {...props}/>
    ) : (
      <Redirect to={{pathname: '/', state: {from: props.location}}}/>
    )
  )}/>
);

export default App;
