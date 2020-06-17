import React from "react";
import "./ProgressCircle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
//import { withRouter } from "react-router-dom";

class ProgressCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { progress } = this.props;
    let accuracyColor = () => {
      if (progress > 85) return "#7AD18E";
      if (progress > 50) return "#FDC954";
      return "#EC0B43";
    };
    return (
      <div className="progress-circle-container " data-progress="9">
        <div
          className="completed-circle"
          style={{ backgroundColor: accuracyColor() }}
        ></div>
        <div className="overlay-info d-flex flex-column justify-content-center">
          <FontAwesomeIcon className="align-self-center" icon={faBullseye} />
          <p className="align-self-center">{progress}</p>
        </div>
      </div>
    );
  }
}

export default (ProgressCircle);
