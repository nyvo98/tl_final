import React from "react";
import "./Editor.css";
import { connect } from "react-redux";
import * as actions from "./../../../redux/actions/index";
import { ExcelRenderer } from "react-excel-renderer";
//import { withRouter } from "react-router-dom";

class ShowImportPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  fileChangedHandler = (event) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        // this.setState({
        //   cols: resp.cols,
        //   rows: resp.rows
        // });
        let importArr = [];
        for (let i = 2; i < resp.rows.length; i++) {
          let ans = [];
          for (let j = 1; j < 6; j++) {
            if (resp.rows[i][j] !== undefined)
              ans.push({
                answer: resp.rows[i][j],
                is_right: resp.rows[i][6] === j ? true : false,
              });
          }
          if (resp.rows[i].length === 0) break;
          importArr.push({
            question: resp.rows[i][0],
            time: resp.rows[i][7] === undefined ? 30 : resp.rows[i][7],
            question_table_id: this.props.match.params.question_table_id,
            question_choices: [...ans],
          });
        }
        this.props.importQuestionAndAnswersAPI(importArr);
      }
    });
  };
  render() {
    return (
      <div className="import-popup-container">
        <div className="popup">
          <form>
            <div className="popup_inner">
              <div className="popup-header d-flex flex-row justify-content-start mb-2">
                <div>
                  <img
                    style={{
                      height: "64px",
                      width: "64px",
                      marginRight: "20px",
                    }}
                    src={require("./images/import.png")}
                    alt="import"
                  />
                </div>
                <div className="d-flex flex-row align-items-center">
                  <h3>Import from file</h3>
                </div>
              </div>
              <div className="popup-body mb-2">
                <p>
                  Make sure to upload an .xlsx or .xls file and adhere to our
                  format
                  <a
                    href="https://drive.google.com/file/d/1oS_NKrlngbTNoY8p4GmBNmdcTpYHxd7M/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    (download template)
                  </a>
                </p>
                <div className="input-file-container py-5 rounded border d-flex  justify-content-center">
                  <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={this.fileChangedHandler}
                    ref={(fileInput) => (this.fileInput = fileInput)}
                  />
                  <img
                    style={{ height: "70px", width: "100px" }}
                    src={require("./images/print.png")}
                    alt="print"
                    className=""
                    onClick={() => this.fileInput.click()}
                  />
                </div>
              </div>
              <div className="popup-footer">
                <button onClick={this.props.closePopup}>Close</button>
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
    importQuestionAndAnswersAPI: (data) => {
      dispatch(actions.importQuestionAndAnswersAPI(data));
    },
  };
};
export default connect(null, mapDispatchToProps)((ShowImportPopUp));
