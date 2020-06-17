import React from "react";
import "./CreatedQuizzes.css";
import QuizThumbnail from "../../../../utils/QuizThumbnail/QuizThumbnail";
//import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";

class CreatedQuizzes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        question_tables: [],
      },
    };
  }
  componentDidMount() {
    //get data from redux
    //console.log("match", this.props.match);
    this.props.showListQuestionTable();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    //console.log("created", nextProps.user);
    this.setState({
      data: nextProps.user[0],
    });
  }
  render() {
    let { data } = this.state;
    let name = data.name;
    let quizthumb = data.question_tables.map((table, index) => {
      return (
        <QuizThumbnail
          image_index={index}
          key={index}
          data={table}
          userName={name}
        />
      );
    });
    return (
      <div className="quiz-list">
        {quizthumb}
        {quizthumb.length === 0 ? (
          <img
            style={{ width: "30%", margin: "30px auto" }}
            src={require("../images/no-quiz.png")}
            alt="no-quiz"
          />
        ) : null}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    showListQuestionTable: () => {
      dispatch(actions.showListQuestionTable());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    questionTable: state.questionTable,
    user: state.user,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)((CreatedQuizzes));
