import React from "react";
//import { withRouter } from "react-router-dom";

class PageNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { pageNumber } = this.props;
    return (
      <div className="question-show-container">
        <h1 style={{ color: "white" }}>{pageNumber}</h1>
      </div>
    );
  }
}

export default (PageNumber);
