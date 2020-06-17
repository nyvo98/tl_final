import React from "react";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
//import { withRouter } from "react-router-dom";

class AdminNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="admin-nav">
        <div className="logo">
          <img
            src={require("../../../utils/images/logo.png")}
            alt="quiz-icon"
          />
        </div>
        <div className="admin-nav-btn">
          <button
            onClick={() => {
              this.props.history.push("/join");
            }}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
            Join a game
          </button>
        </div>
      </div>
    );
  }
}

export default (AdminNav);
