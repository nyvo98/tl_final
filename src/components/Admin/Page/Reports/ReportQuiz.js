import React from "react";
import "./Reports.css";
//import { withRouter } from "react-router-dom";

class ReportQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accuracy: 2,
      playerData: {}
    };
  }
  componentDidMount() {
    let { data } = this.props;
    let playersList = [];
    let answerRecord = [];
    let attempt = [];
    let { answer_records } = data;
    console.log(data);
    //modify object so we can calculate the accuracy more easier
    for (let i = 0; i < answer_records.length; i++) {
      answerRecord.push(answer_records[i]);
      if (
        i === answer_records.length - 1 || //in boundary
        answer_records[i].id !== answer_records[i + 1].id ||
        answer_records[i].user_id !== answer_records[i + 1].user_id
      ) {
        attempt.push(answerRecord);
        answerRecord = [];
      }
      if (
        i === answer_records.length - 1 || //in boundary
        answer_records[i].user_id !== answer_records[i + 1].user_id
      ) {
        playersList.push({
          id: answer_records[i].user.id,
          name: answer_records[i].user.name,
          answer_records: attempt
        });
        attempt = [];
      }
      this.setState({
        playerData: playersList
      });
    }
    let accuracyArr = [];
    for (let i = 0; i < playersList.length; i++)
      accuracyArr.push(this.calculate(playersList[i].answer_records));
    let accuracy = 0;
    for (let i = 0; i < accuracyArr.length; i++) accuracy += accuracyArr[i];
    let totalAccuracy = accuracy.toFixed(2) / accuracyArr.length;
    this.setState({
      accuracy: totalAccuracy
    });
  }
  calculate = attemptList => {
    let accuracyArr = [];
    attemptList.forEach(answerRecord => {
      accuracyArr.push(this.calculateAccuracy(answerRecord));
    });
    let accuracy = Math.max(...accuracyArr);
    return accuracy;
  };

  calculateAccuracy = data => {
    //calculate the accuracy
    let correctAnswer = 0;
    let unAttempt = 0;
    data.forEach(attempt => {
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
    data.forEach(sub => {
      if (sub.question.type === 3) textQuestion++;
    });
    if (correctAnswer > this.state.correctAnswer)
      this.setState({
        correctAnswer: correctAnswer,
        totalQuestion: data.length - textQuestion,
        unAttempt: unAttempt,
        inCorrectAnswer: data.length - textQuestion - correctAnswer - unAttempt
      });
    let accuracy =
      (correctAnswer / (data.length - textQuestion)).toFixed(2) * 100;
    return accuracy;
  };
  render() {
    let { accuracy } = this.state;
    let accuracyColor = () => {
      if (accuracy > 85) return "#7AD18E";
      if (accuracy > 50) return "#FDC954";
      return "#EC0B43";
    };

    let { history, data } = this.props;
    let { playerData } = this.state;
    return (
      <div
        className="report-quiz-container container"
        onClick={() => {
          localStorage.setItem("report_player", JSON.stringify(playerData));
          localStorage.setItem(
            "report_detail",
            JSON.stringify({ ...data, accuracy })
          );

          history.push(`/admin/reports/report_detail`);
        }}
      >
        <div className="rq-row row">
          <div className="rq-name col-sm text-truncate">{data.title}</div>
          <div className="rq-players col-sm">{data.played}</div>
          <div className="rq-accuracy col-sm">
            <div
              className="rounded"
              style={{
                backgroundColor: accuracyColor(),
                padding: "2px 8px",
                color: "white",
                width: `${accuracy}%`
              }}
            >
              {accuracy}%
            </div>
          </div>
          <div className="rq-option col-sm"></div>
        </div>
      </div>
    );
  }
}

export default (ReportQuiz);
