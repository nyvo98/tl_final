import React from "react";
import QuizCreateModal from "../../../components/QuizCreateModal/QuizCreateModal";
import "./QuizCreateModal.css";
//import { withRouter } from "react-router-dom";

class Create extends React.Component {
  componentDidMount() {
    document.title = "Quiz Initiation";
  }
  render() {
    return (
      <div className="page-container">
        <QuizCreateModal />
      </div>
    );
  }
}

export default (Create);
