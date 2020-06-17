import React from "react";
import { connect } from "react-redux";
import * as actions from "./../../redux/actions/index";
import "./QuizCreateModal.css";
//import { withRouter } from "react-router-dom";

class QuizCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      data: {
        title: "",
      },
      accessToPush: {
        question_table_id: 0,
        push: false,
      },
    };
  }

  componentDidMount() {
    let { data } = this.state;
    let campaign_id = localStorage.getItem("campaign_id");
    if (campaign_id) {
      this.setState({
        data: {
          ...data,
          campaign_id,
        },
      });
      localStorage.removeItem("campaign_id");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      accessToPush: nextProps.accessToPush,
    });
  }
  onSubmitHandler = (event) => {
    event.preventDefault();
    //console.log(this.state.data);
    this.props.createQuestionTable(this.state.data);
  };

  onChangeHandler = (event) => {
    let { name, value } = event.target;

    this.setState((prevState) => ({
      data: {
        // object that we want to update
        ...prevState.data, // keep all other key-value pairs
        [name]: value, // update the value of specific key
      },
    }));
  };

  render() {
    let { accessToPush } = this.state;
    if (accessToPush.push)
      this.props.history.push(`/quiz/${accessToPush.question_table_id}`);

    return (
      <div className="quiz-create-modal-container">
        <div className="init-quiz">
          <form onSubmit={this.onSubmitHandler}>
            <div className="init-quiz-container">
              <div className="init-quiz-create-title">
                <img src={require("./images/CreateQuiz.png")} alt="quiz-icon" />
                <p>Create a quiz </p>
              </div>
              <div className="init-quiz-create-body">
                <div className="init-quiz-name-quiz">
                  <p>1. Name the quiz </p>
                  <input
                    type="text"
                    name="title"
                    onChange={this.onChangeHandler}
                  />
                </div>
              </div>
              <div className="init-quiz-create-footer">
                <button
                  style={{
                    background: "#d9d9d9",
                    color: "black",
                    boxShadow: "none",
                    top: 0,
                  }}
                  onClick={() => this.props.history.push("/")}
                >
                  Cancel
                </button>
                <button type="submit">Create</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    createQuestionTable: (data) => {
      dispatch(actions.createQuestionTable(data));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    questionTable: state.questionTable,
    accessToPush: state.accessToPush,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)((QuizCreate));
