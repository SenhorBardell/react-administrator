import React, {Component} from "react";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="page">
        <header>An awesome App</header>
        <div className="container">
          <h1>
            Main app for client
          </h1>
        </div>
      </div>
    )
  }
}

export default Welcome