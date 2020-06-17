import React from "react";
import "./Editor.css";
import { connect } from "react-redux";
import * as actions from "./../../../redux/actions/index";
import { Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import "antd/dist/antd.css";
//import { withRouter } from "react-router-dom";

class ShowPreviewPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      grade_begin: null,
      grade_end: null,
    };
  }
  componentDidMount() {
    this.setState({
      ...this.props.data,
    });
  }
  fileChangedHandler = (event) => {
    let fileReader = new FileReader();
    if (event.target.files[0]) {
      fileReader.readAsDataURL(event.target.files[0]); // fileReader.result -> URL.
      fileReader.onload = (progressEvent) => {
        let url = fileReader.result;
        //console.log("url", url);
        // Something like: data:image/png;base64,iVBORw...Ym57Ad6m6uHj96js
        this.setState({ image: url });
      };
    }
  };
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.updateTable(this.state);
    this.props.closePopup();
  };
  handleChangeSelected = (value, type) => {
    let { grade_begin, grade_end } = this.state;
    let state = this.state;
    if (type === "begin") {
      state.grade_begin = parseInt(value);
      this.setState({
        grade_begin: parseInt(value),
      });
      if (grade_end === null || parseInt(value) > grade_end) {
        state.grade_end = parseInt(value);
        this.setState({
          grade_end: parseInt(value),
        });
      }
    }
    if (type === "end") {
      state.grade_end = parseInt(value);
      this.setState({
        grade_end: parseInt(value),
      });
      if (grade_begin === null || parseInt(value) < grade_begin) {
        state.grade_begin = parseInt(value);
        this.setState({
          grade_begin: parseInt(value),
        });
      }
    }
  };
  menu = () => {
    let { Option } = Select;
    return [
      <Option key="1">Internship</Option>,
      <Option key="2">Fresher</Option>,
      <Option key="3">Junior</Option>,
      <Option key="4">Senior</Option>,
    ];
  };

  gradeTitle = (grade) => {
    if (grade === null) return null;
    if (grade === 1) return "Internship";
    if (grade === 2) return "Fresher";
    if (grade === 3) return "Junior";
    if (grade === 4) return "Senior";
  };
  render() {
    let { image, grade_begin, grade_end } = this.state;
    let menu = this.menu();
    let beginSuffix = this.gradeTitle(grade_begin);
    let endSuffix = this.gradeTitle(grade_end);

    return (
      <div className="grade-popup-container">
        <div className="popup">
          <form onSubmit={this.onSubmitHandler}>
            <div className="popup_inner">
              <div className="popup-header">
                <p>
                  <img src={require("./images/grade.png")} alt="grade" />
                  Preview Quiz
                </p>
                <hr />
              </div>
              <div className="popup-body">
                <div className="add-title-image-section">
                  <div className="section-name">1. Add title image</div>
                  <div className="title-image-picker">
                    <input
                      style={{ display: "none" }}
                      type="file"
                      onChange={this.fileChangedHandler}
                      ref={(fileInput) => (this.fileInput = fileInput)}
                    />
                    <div className="crop-quiz-title-img">
                      <img
                        className="default-title-image"
                        src={
                          image !== null ? image : require("./images/none.png")
                        }
                        alt="defaul title "
                        onClick={() => this.fileInput.click()}
                      />
                    </div>

                    <div
                      className="delete-title-image"
                      onClick={() => this.setState({ image: null })}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} color="white" />
                    </div>
                  </div>
                </div>

                <div className="select-grade-section">
                  <div className="section-name">2. Select grades</div>
                  <div className="grade-start-end">
                    <Select
                      value={
                        beginSuffix !== null ? `${beginSuffix}` : "--From--"
                      }
                      onChange={(value) =>
                        this.handleChangeSelected(value, "begin")
                      }
                      style={{ width: 200 }}
                    >
                      {menu}
                    </Select>

                    <Select
                      value={endSuffix !== null ? `${endSuffix}` : "--To--"}
                      onChange={(value) =>
                        this.handleChangeSelected(value, "end")
                      }
                      style={{ width: 200 }}
                    >
                      {menu}
                    </Select>
                  </div>
                </div>
                <hr />
              </div>
              <div className="popup-footer">
                <button
                  className="b-cancel"
                  type="button"
                  onClick={this.props.closePopup}
                >
                  CANCEL
                </button>

                <button className="b-save" type="submit">
                  <FontAwesomeIcon size="1x" icon={faSave} color="white" />
                  <span>SAVE</span>
                </button>
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
    updateTable: (data) => {
      dispatch(actions.updateTable(data));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    questionTable: state.questionTable,
    question: state.question,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)((ShowPreviewPopUp));
