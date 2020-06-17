import React from "react";
import "./DoingQuiz.css";
import QuestionShow from "./QuestionShow/QuestionShow";
import PageNumber from "./PageNumber/PageNumber";
import PageScore from "./PageScore/PageScore";

//import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../redux/actions/index";

let showQuestion;
let showPage;
let pageNumber = 1;
class DoingQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          id: 0,
          question: "",
          question_choices: [],
          time: 0,
        },
      ],
      data: [],
      count: 0,
      changePage: true,
      changeQuestion: false,
      step: 1,
      isDone: false,
      accessToPush: false,
      right_answer: 0,
    };
  }
  componentDidMount() {
    let question_table_id = this.props.match.params.question_table_id;
    this.props.showListQuestionAnswer(question_table_id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("question and answer", nextProps.questionTable.questions);
    this.setState({
      accessToPush: nextProps.accessToPush.push,
      questions: nextProps.questionTable.questions,
    });
  }
  componentWillUnmount() {
    pageNumber = 1;
  }
  recordAnswer = (
    question_id,
    question_choice,
    multi_choice,
    answer_text,
    type
  ) => {
    ///create data to send API
    let question_table_id = parseInt(this.props.match.params.question_table_id);
    let choice_id = 0;
    if (question_choice !== undefined) choice_id = question_choice.id;
    let data = {
      question_table_id: question_table_id,
      question_id,
      choice_id,
      multi_choice: multi_choice,
      answer_text: answer_text,
      type,
    };
    let dataPush = this.state.data;
    if (question_id) dataPush.push({ ...data });
    console.log("dataPush", dataPush);
  };
  doneQuestionHandler = (isChooseRight) => {
    clearTimeout(showQuestion);
    clearTimeout(showPage);
    if (isChooseRight)
      this.setState({
        right_answer: this.state.right_answer + 1,
      });
    setTimeout(() => {
      this.setState({
        step: 3,
      });
    }, 1500);
  };
  showPageNumber = () => {
    let { isDone, step, data, right_answer, questions } = this.state;
    if (!isDone) {
      switch (step) {
        case 1:
          showPage = setTimeout(() => {
            this.setState({
              step: 2,
            });
            if (pageNumber === questions.length) pageNumber = "Done";
            else pageNumber += 1;
            /////////////////////////////////////// speed of change page
          }, 3000);
          return <PageNumber key={pageNumber} pageNumber={pageNumber} />;
        case 2:
          clearTimeout(showPage);
          return this.createQuestion();
        case 3:
          setTimeout(() => {
            this.setState({
              changeQuestion: true,
              changePage: true,
              step: 1,
            });
          }, 3000);
          return (
            <PageScore
              key={pageNumber}
              right_answer={right_answer}
              questionsLength={questions.length}
            />
          );
        default:
          return "";
      }
    } else {
      // all questions is completed
      this.props.addAnswerRecord(data);
      let state = this.state;
      state.isDone = false;
      state.changePage = false;

      let question_table_id = this.props.match.params.question_table_id;
      this.props.updateTableWithPlayed(question_table_id);
      clearTimeout(showQuestion);
      clearTimeout(showPage);
    }
  };
  createQuestion = () => {
    let { questions, count, isDone, changeQuestion } = this.state;
    //changeQuestion is not permitted(not click answer), show question
    if (changeQuestion === false) {
      showQuestion = setTimeout(() => {
        if (count < questions.length - 1 && isDone === false) {
          this.setState({
            count: count + 1,
            step: 3,
          });
        } else {
          this.setState({
            isDone: true,
            step: 3,
          });
        }
      }, questions[count].time * 1000);
    } else {
      //changeQuestion is permitted
      if (count < questions.length - 1 && isDone === false) {
        this.setState({
          count: count + 1,
          changeQuestion: false,
        });
      } else {
        this.setState({
          isDone: true,
          changeQuestion: false,
        });
      }
    }

    if (!isDone)
      return (
        <QuestionShow
          questionsLength={questions.length}
          key={count}
          index={count}
          question={questions[count]}
          doneQuestionHandler={this.doneQuestionHandler}
          recordAnswer={this.recordAnswer}
        />
      );
    else return <div></div>;
  };

  render() {
    let question_table_id = this.props.match.params.question_table_id;
    let element = "";

    if (this.state.accessToPush)
      this.props.history.push(`/pre-game/${question_table_id}/review`);
    else {
      if (this.state.questions[0].id !== 0) element = this.showPageNumber();
      else element = "";

      //let question = this.createQuestion();
    }
    return <div className="doing-quiz-container">{element}</div>;
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    showListQuestionAnswer: (question_table_id) => {
      dispatch(actions.showListQuestionAnswer(question_table_id));
    },
    addAnswerRecord: (data) => {
      dispatch(actions.addAnswerRecord(data));
    },
    updateTableWithPlayed: (id) => {
      dispatch(actions.updateTableWithPlayed(id));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    questionTable: state.questionTable,
    question: state.question,
    accessToPush: state.accessToPush,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)((DoingQuiz));
