import React from "react";
import QuizCreateEditor from "../../../components/QuizCreator/Editor/Editor";
import "./QuizCreator.css";
//import { withRouter } from "react-router-dom";

class QuizCreator extends React.Component {
  componentDidMount() {
    document.title = "Quiz Creator";
  }
  render() {
    return <QuizCreateEditor />;
  }
}

export default (QuizCreator);
