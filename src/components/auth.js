import React from "react";
import {Link, withRouter} from "react-router-dom";
import Auth from "../services/Auth";

const AuthButton = withRouter(({history}) => (
  Auth.isAuthenticated ? (
    <a href="#" onClick={() => Auth.clear().then(() => history.push('/'))}>Log out</a>
  ) : (<Link to="/login">Login</Link>)
));

export default AuthButton
