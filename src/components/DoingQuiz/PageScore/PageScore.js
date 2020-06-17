import React from "react";
//import { withRouter } from "react-router-dom";

class PageScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { right_answer, questionsLength } = this.props;

    return (
      <div className="question-show-container">
        <h1 style={{ color: "white" }}>
          result: {right_answer}/{questionsLength}
        </h1>
      </div>
    );
  }
}

export default (PageScore);
