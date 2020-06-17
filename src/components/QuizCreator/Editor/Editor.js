import React from "react";
import "./Editor.css";
//import ToggleBox from '../ToggleBox/ToggleBox';
import QuizCreatorQuestionDetail from "../QuestionDetail/QuestionDetail";

import "font-awesome/css/font-awesome.min.css";
//import ToggleBox from '../ToggleBox/ToggleBox';
import { connect } from "react-redux";
import * as actions from "./../../../redux/actions/index";
//import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faEye,
  faEyeSlash,
  faGraduationCap,
  faBook,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import CreatePopUp from "./CreatePopUp";
import ShowPreviewPopUp from "./ShowPreviewPopUp";
import ShowImportPopUp from "./ShowImportPopUp";
import Teleport from "./Teleport/ShowTeleport";

class QuizCreatorEditor extends React.Component {
  constructor() {
    super();
    this.editInputRef = React.createRef();

    this.state = {
      accessToPush: false,
      showPopupCreate: false,
      showPopupEdit: false,
      showPopupPreview: false,
      showPopUpImport: false,
      showTeleport: false,
      disabledIfFinished: false,
      dataEdit: {},
      question_table_id: 1,
      //questions: [],
      defaultContent: "",
      table: {
        title: "",
        questions: [],
        is_finish: false,
        image: null,
        is_public: true,
        campaign: {
          id: 0,
          subjects: [
            {
              id: 0,
              title: "",
            },
          ],
        },
        grade_begin: null,
        grade_end: null,
      },
    };
  }
  togglePopup = () => {
    let { showPopupCreate, showPopupEdit } = this.state;

    if (showPopupEdit === true) {
      this.setState({
        showPopupEdit: !showPopupEdit,
        dataEdit: {},
      });
    }
    if (showPopupCreate === true) {
      this.setState({
        showPopupCreate: !showPopupCreate,
      });
    }
  };

  togglePopupPreview = () => {
    let { showPopupPreview } = this.state;

    if (showPopupPreview === true) {
      this.setState({
        showPopupPreview: !showPopupPreview,
      });
    }
  };

  togglePopupImport = () => {
    let { showPopUpImport } = this.state;

    if (showPopUpImport === true) {
      this.setState({
        showPopUpImport: !showPopUpImport,
      });
    }
  };

  togglePopupTeleport = () => {
    let { showTeleport } = this.state;

    if (showTeleport === true) {
      this.setState({
        showTeleport: !showTeleport,
      });
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    // use data take from step 3(storage), this is step 4
    this.setState({
      accessToPush: nextProps.accessToPush.push,
    });
    if (nextProps.question === null) {
      if (nextProps.questionTable.is_finish)
        this.setState({ disabledIfFinished: true });
      this.setState({
        table: nextProps.questionTable,
      });
    } else {
      let newTable = { ...this.state.table };
      for (let i = 0; i < nextProps.question.length; i++)
        newTable.questions.push({ ...nextProps.question[i] });
    }
  }
  componentDidMount() {
    // take data via param on URL, run first, this is step 1
    let { question_table_id } = this.props.match.params;
    this.setState({
      question_table_id: question_table_id,
    });
    this.props.showListQuestionAnswer(question_table_id);
  }
  onClickDeleteHandler = (index) => {
    let question_id = this.state.table.questions[index].id;
    this.props.deleteQuestionAndAnswersAPI(question_id, index);
  };
  onClickEditHandler = (index, data) => {
    this.setState({
      showPopupEdit: true,
      dataEdit: {
        index: index,
        ...data,
      },
    });
  };
  onClickFinishQuizHandler = () => {
    let { question_table_id } = this.props.match.params;
    this.props.finishQuestionTable(question_table_id);
  };
  gradeTitlePart = (grade) => {
    if (grade === null) return null;
    if (grade === 1) return "Internship";
    if (grade === 2) return "Fresher";
    if (grade === 3) return "Junior";
    if (grade === 4) return "Senior";
  };
  gradeTitle = () => {
    let { grade_begin, grade_end } = this.state.table;
    let gradeBeginTitle = this.gradeTitlePart(grade_begin);
    let gradeEndTitle = this.gradeTitlePart(grade_end);
    let gradeTitle = "";
    if (grade_begin === null) gradeTitle = "Add grade";
    else if (grade_begin === grade_end) {
      gradeTitle = gradeBeginTitle;
    } else gradeTitle = `${gradeBeginTitle} - ${gradeEndTitle}`;
    return gradeTitle;
  };
  onClickChangePublic = () => {
    let { id, is_public } = this.state.table;
    let check = !is_public;
    this.setState({
      table: {
        ...this.state.table,
        is_public: check,
      },
    });
    this.props.updateTable({ id, is_public: check });
  };
  onClickTeleportHandler = () => {
    this.setState({
      showTeleport: !this.state.showTeleport,
    });
    this.togglePopupTeleport();
  };

  handleCompClick = (e) => {
    if (!this.editRef.contains(e.target)) {
      //outside
      this.editInputRef.current.style.border = "none";
      return;
    } else {
      //inside
      this.editInputRef.current.focus();
      //this.editInputRef.current.select();
      this.editInputRef.current.style.border = "2px solid #1092f4";
    }
  };
  UNSAFE_componentWillMount() {
    document.addEventListener("click", this.handleCompClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleCompClick, false);
  }

  handleFocus = (e) => {
    e.target.select();
    //set state to compare data and defaultContent, if the same, do not send update campaign
    this.setState({
      defaultContent: this.state.table.title,
    });
  };
  onBlurHandler = () => {
    let { table, defaultContent } = this.state;
    let { id, title } = table;
    if (title !== defaultContent) {
      this.props.updateTable({ id, title });
    }
  };
  onChangeTitleHandler = (e) => {
    this.setState({
      table: { ...this.state.table, title: e.target.value },
    });
  };
  render() {
    let { image, campaign, title, is_public } = this.state.table;
    let { disabledIfFinished, accessToPush } = this.state;
    //after finish the quiz, then push to join page
    if (accessToPush) this.props.history.push("/join/activity");

    let gradeTitle = this.gradeTitle();
    let element = this.state.table.questions.map((data, index) => {
      return (
        <QuizCreatorQuestionDetail
          key={index}
          data={data}
          index={index}
          onClickDeleteHandler={this.onClickDeleteHandler}
          onClickEditHandler={this.onClickEditHandler}
          disabledIfFinished={this.state.disabledIfFinished}
        />
      );
    });
    return (
      <div className="page-container">
        <div className="quiz-creator-nav">
          <div className="logo">
            <img src={require("./images/logo.png")} alt="quiz-icon" />
          </div>

          <div className="button-group">
            <button
              className="b-exit button"
              onClick={() => this.props.history.push("/join")}
            >
              EXIT
            </button>
            <button
              className="b-finish button"
              onClick={this.onClickFinishQuizHandler}
              disabled={disabledIfFinished}
              style={disabledIfFinished ? { opacity: "0.6" } : null}
            >
              FINISH
            </button>
          </div>
        </div>
        <div className="editor">
          <div className="question-editor">
            <div className="button-group">
              <button
                onClick={() => {
                  this.setState({
                    showPopupCreate: !this.state.showPopupCreate,
                  });
                  this.togglePopup();
                }}
                disabled={disabledIfFinished}
                style={disabledIfFinished ? { opacity: "0.6" } : null}
                className="button b-create"
              >
                <FontAwesomeIcon icon={faPlusCircle} />
                Create a new question
              </button>
              <p>Or</p>
              <button
                className="button b-teleport"
                disabled={disabledIfFinished}
                style={disabledIfFinished ? { opacity: "0.6" } : null}
                onClick={this.onClickTeleportHandler}
              >
                Teleport
              </button>
            </div>
            {element}
            {this.state.table.questions.length === 0 ? (
              <img
                className="no-question-created"
                alt="no-questions-created"
                src={require("./images/no-question-created.png")}
              />
            ) : null}
          </div>
          <div className="quiz-info-container">
            <div className="quiz-info-edit-container">
              <div
                className="quiz-image-choice-overlay"
                onClick={() => {
                  this.setState({
                    showPopupPreview: !this.state.showPopupPreview,
                  });
                  this.togglePopupPreview();
                }}
              >
                <div className="crop-quiz-img-choice">
                  <img
                    className="quiz-image-choice"
                    src={image !== null ? image : require("./images/none.png")}
                    alt="quizImageChoice"
                  />
                </div>

                <div className="overlay-edit">
                  <div className="overlay-text">Edit image</div>
                </div>
              </div>

              {/* ////////////////////////// */}
              <div className="quiz-info-edit-quiz-name">
                {/* <div className="quiz-name">{title}</div>
                <button>
                  <span>
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      color="#FD7E14"
                      size="lg"
                      onClick={() => {
                        this.setState({
                          showPopupSubject: !this.state.showPopupSubject,
                        });
                        this.togglePopupSubject();
                      }}
                    />
                  </span>
                </button> */}
                <div
                  className="quiz-name "
                  ref={(node) => (this.editRef = node)}
                  onClick={this.handleCompClick}
                >
                  <input
                    defaultValue={title}
                    type="text"
                    name="title"
                    onChange={this.onChangeTitleHandler}
                    ref={this.editInputRef}
                    onFocus={this.handleFocus}
                    onBlur={this.onBlurHandler}
                  />
                </div>
              </div>
              {/* /////////////////////// */}
              <div className="quiz-scope-data">
                <div className="scope-public">
                  <button onClick={this.onClickChangePublic}>
                    <span>
                      <FontAwesomeIcon icon={is_public ? faEye : faEyeSlash} />
                      {/*change to faEyeSlash if private */}
                    </span>
                    {is_public ? "Public" : "Private"}{" "}
                    {/** change to "private" if private */}
                  </button>
                </div>
              </div>
              <hr />
              <div className="quiz-grade">
                <div className="quiz-sm-icon">
                  <FontAwesomeIcon icon={faGraduationCap} color="#6B6C77" />
                </div>
                <button
                  onClick={() => {
                    this.setState({
                      showPopupPreview: !this.state.showPopupPreview,
                    });
                    this.togglePopupPreview();
                  }}
                >
                  {gradeTitle}
                </button>
              </div>
              {campaign === null ? null : (
                <div className="quiz-subject">
                  <div className="quiz-sm-icon">
                    <FontAwesomeIcon icon={faBook} color="#6B6C77" />
                  </div>
                  <button>
                    {campaign.subjects.map((sub) => {
                      return `${sub.title} `;
                    })}
                  </button>
                </div>
              )}

              <div className="quiz-import">
                <div className="quiz-sm-icon">
                  <FontAwesomeIcon icon={faUpload} color="#6B6C77" />
                </div>
                <button
                  onClick={() => {
                    this.setState({
                      showPopUpImport: !this.state.showPopUpImport,
                    });
                    this.togglePopupImport();
                  }}
                >
                  Import from file
                </button>
              </div>
            </div>
          </div>
          {this.state.showPopupCreate ? (
            <CreatePopUp
              index={this.state.table.questions.length + 1}
              closePopup={this.togglePopup}
              match={this.props.match}
            />
          ) : null}
          {this.state.showPopupEdit ? (
            <CreatePopUp
              index={this.state.dataEdit.index}
              closePopup={this.togglePopup}
              match={this.props.match}
              data={this.state.dataEdit}
            />
          ) : null}

          {this.state.showPopupPreview ? (
            <ShowPreviewPopUp
              closePopup={this.togglePopupPreview}
              data={this.state.table}
            />
          ) : null}

          {this.state.showPopUpImport ? (
            <ShowImportPopUp
              closePopup={this.togglePopupImport}
              match={this.props.match}
            />
          ) : null}

          {this.state.showTeleport ? (
            <Teleport
              match={this.props.match}
              closePopup={this.togglePopupTeleport}
              title={title}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  // connect to redux by function, load data from data base, this is step 2
  return {
    showListQuestionAnswer: (question_table_id) => {
      dispatch(actions.showListQuestionAnswer(question_table_id));
    },
    deleteQuestionAndAnswersAPI: (id, index) => {
      dispatch(actions.deleteQuestionAndAnswersAPI(id, index));
    },
    finishQuestionTable: (id) => {
      dispatch(actions.finishQuestionTable(id));
    },
    updateTable: (data) => {
      dispatch(actions.updateTable(data));
    },
  };
};
const mapStateToProps = (state) => {
  //connect to redux by props, loadded data store here, this is step 3
  return {
    questionTable: state.questionTable,
    question: state.question,
    accessToPush: state.accessToPush,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)((QuizCreatorEditor));
