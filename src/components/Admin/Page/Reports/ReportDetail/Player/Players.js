import React from "react";
import "./Players.css";
//import { withRouter } from "react-router-dom";

class ReportPlayers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accuracy: 0,
      correctAnswer: 0,
      inCorrectAnswer: 0,
      unAttempt: 0,
      totalQuestion: 0,
    };
  }
  componentDidMount() {
    let { data, accuracyForPlayers } = this.props;
    let accuracy = this.calculate(data.answer_records);
    accuracyForPlayers(accuracy);
  }
  calculate = (attemptList) => {
    let accuracyArr = [];
    attemptList.forEach((answerRecord) => {
      accuracyArr.push(this.calculateAccuracy(answerRecord));
    });
    let accuracy = Math.max(...accuracyArr);
    this.setState({
      accuracy: accuracy,
    });
    return accuracy;
  };

  calculateAccuracy = (data) => {
    //calculate the accuracy
    let correctAnswer = 0;
    let unAttempt = 0;
    data.forEach((attempt) => {
      if (attempt.question.type === 1) {
        if (attempt.question_choice.is_right === 1) correctAnswer++;
        if (attempt.question_choice.is_right === 2) unAttempt++;
      } else if (attempt.question.type === 2) {
        let questionRightTotal = 0;
        let multiRightTotal = 0;
        for (let i = 0; i < attempt.question.question_choices.length; i++)
          if (attempt.question.question_choices[i].is_right === 1)
            questionRightTotal++;
        if (attempt.multi_choice_id !== null) {
          let { question_choices } = attempt.multi_choice;
          for (let i = 0; i < question_choices.length; i++)
            if (question_choices[i].is_right === 1) multiRightTotal++;
        }
        if (multiRightTotal === questionRightTotal) correctAnswer++;
      }
    });
    let textQuestion = 0;
    data.forEach((sub) => {
      if (sub.question.type === 3) textQuestion++;
    });
    if (correctAnswer > this.state.correctAnswer)
      this.setState({
        correctAnswer: correctAnswer,
        totalQuestion: data.length - textQuestion,
        unAttempt: unAttempt,
        inCorrectAnswer: data.length - textQuestion - correctAnswer - unAttempt,
      });
    let accuracy =
      (correctAnswer / (data.length - textQuestion)).toFixed(2) * 100;
    return accuracy;
  };
  render() {
    let { data } = this.props;
    let { accuracy, correctAnswer, inCorrectAnswer, unAttempt } = this.state;
    console.log(accuracy, correctAnswer, inCorrectAnswer, unAttempt);
    return (
      <div className="report-detail-player-container container-fluid ">
        <div className="rd-player-row row shadow-sm d-flex flex-row ">
          <div className="rdp-ava align-self-center col-1">
            <img
              alt="rdp-ava"
              src={require("../../../../../../utils/images/defaultava.png")}
            />
          </div>
          <div className="rdp-name col-1 align-self-center">{data.name}</div>
          {/*De so zo*/}
          <div className="rdp-accuracy-bar col-4 align-self-center">
            50
          </div>{" "}
          {/*De so zo*/}
          <div className="rdp-accuracy-rate col-3 align-self-center">
            100
          </div>{" "}
          {/*De so zo*/}
          <div className="rdp-score col-3 align-self-center">9000</div>{" "}
          {/*De so zo*/}
        </div>
      </div>
    );
  }
}

export default (ReportPlayers);
