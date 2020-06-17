import React from "react";
import "./ReportDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faClock } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import ProgressCircle from "./ProgressCircle/ProgressCircle";
import ReportPlayers from "./Player/Players";
import ReportQuestions from "./Questions/Questions";
//import { withRouter } from "react-router-dom";
import { Tabs, Panel } from '../../../../../utils/Tab/Tabs'

class ReportDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: "",
      tableReport: {
        id: 0,
        title: "",
        questions: [],
      },
      players: [
        {
          id: 0,
          name: "",
          answer_records: [],
        },
      ],
      accuracyArr: [],
      totalAccuracy: 0,
    };
  }
  componentDidMount() {
    let playersList = JSON.parse(localStorage.getItem("report_player"));
    let data = JSON.parse(localStorage.getItem("report_detail"));
    this.setState({
      tableReport: data,
      players: playersList,
      totalAccuracy: data.accuracy,
    });
  }
  accuracyForPlayers = (accuracy) => {
    let { accuracyArr } = this.state;
    this.setState({
      accuracyArr: [...accuracyArr, accuracy],
    });
  };
  render() {
    let { tableReport, players, totalAccuracy } = this.state;
    let playerElm = players.map((player) => {
      return (
        <ReportPlayers
          key={player.id}
          data={player}
          accuracyForPlayers={this.accuracyForPlayers}
        />
      );
    });
    return (
      <div className="report-detail-container">
        <div className="report-detail-overview shadow-sm">
          <div className="row">
            <div className="rd-text-info col-6 d-flex flex-column">
              <div className="rd-quiz-name">{tableReport.title}</div>
              <div className="rd-quiz-time">
                <FontAwesomeIcon icon={faClock} className="mb-0 mr-1" />2019-24-12, 9:00 AM(5 months ago)
              </div>
              <button className="rd-viewquiz" >
                View quiz
              </button>
            </div>
            <div className="chart-info col-6 d-flex flex-row justify-content-between">
              <div className="chart-display text-center">
                <div className="circle-accuracy d-flex flex-column justify-content-center">
                  <ProgressCircle progress={totalAccuracy} />{" "}
                  {/*Cai nay` lam animation sau */}
                </div>
                <p>Accuracy</p>
              </div>
              <div className="chart-display text-center">
                <div className="circle d-flex flex-column justify-content-center">
                  <FontAwesomeIcon
                    className="align-self-center"
                    icon={faQuestionCircle}
                  />
                  <p className="align-self-center">
                    {tableReport.questions.length}
                  </p>
                </div>
                <p>Questions</p>
              </div>
              <div className="chart-display text-center">
                <div className="circle d-flex flex-column justify-content-center">
                  <FontAwesomeIcon
                    className="align-self-center"
                    icon={faUsers}
                  />
                  <p className="align-self-center">{players.length}</p>
                </div>
                <p>Player</p> <p>Attempts</p>
              </div>
            </div>
          </div>
        </div>
        <div className="report-detail-tabs ">
          <Tabs>
            <Panel
              title="Players"
            >
              {playerElm}
            </Panel>
            <Panel
              title="Questions"
            >
              <ReportQuestions />
            </Panel>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default (ReportDetail);
