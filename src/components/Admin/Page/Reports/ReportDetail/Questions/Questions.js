import React from "react";
import "./Questions.css";
//import { withRouter } from "react-router-dom";

class ReportQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accuracy: 30,
    };
  }
  render() {
    let { accuracy } = this.state;
    let accuracyColor = () => {
      if (accuracy > 85) return "#7AD18E";
      if (accuracy > 50) return "#FDC954";
      return "#EC0B43";
    };

    let calcWidthBar = (accur) => {
      return accur.toString() + "%";
    };
    return (
      <div className="report-detail-questions-container ">
        <div className="rdq-question-stat shadow-sm mb-3">
          {/** for render 1 question contain atleast 2 choices */}
          <div className="rdq-question-content">
            This is content of questions
          </div>
          <hr />
          <div className="rdq-question-calc container-fluid">
            <div className="row">
              {" "}
              {/**For each choice of a single question, each question has atleast 2 choices */}
              <div className="col-4 px-0">
                <div className="question-col-1 d-flex flex-row py-2 ">
                  <div className="question-key text-center">a</div>
                  <p>this is content of choice</p>
                </div>
                {/* <div className="question-col-1 d-flex flex-row py-2 "> 
                                    <div className="question-key text-center" style={{ backgroundColor: '#CAD2DC' }}>a</div>
                                    <p>Unattempted</p>
                                </div>  for unattempted*/}
              </div>
              <div className="col-2 text-center py-2"> players number</div>
              <div className="col-2 text-center py-2">%</div>
              <div className="col-4 p-2 ">
                <div
                  className="question-accuracy-bar rounded "
                  style={{
                    backgroundColor: accuracyColor(),
                    width: calcWidthBar(accuracy),
                  }}
                ></div>
                {/**de tam, 1 question co 4 accuracy rieng cho tung choice */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default (ReportQuestions);
