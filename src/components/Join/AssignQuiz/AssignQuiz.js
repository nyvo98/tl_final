import React from "react";
import "./AssignQuiz.css";
import JoinNav from "../Nav/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faUserTie } from "@fortawesome/free-solid-svg-icons";
//import InterviewControl from "../../HR/Campaign/Interview/Control/Control";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
//import { withRouter } from "react-router-dom";
import QuizThumbnail from "../../../utils/QuizThumbnail/QuizThumbnail";

class AssignQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign_id: this.props.match.params.campaign_id,
      isTop: true,
      data: {
        id: 0,
        title: "",
        subject_id: 0,
        level_id: 0,
        work_type_id: 0,
        salary: 0,
        user_id: 0,
        work_description: "",
        status: true,
        subjects: [
          {
            id: 0,
            title: "",
          },
        ],
        user: {
          name: "",
          email: "",
          phone: "",
        },
        level: {
          id: 0,
          name: "",
        },
        work_type: {
          id: 0,
          name: "",
        },
        question_table: {
          id: 0,
          code: 0,
          title: "",
          image: null,
          played: 0,
          user: { name: "" },
          questions: [],
        },
      },
      interviews: [
        {
          id: 0,
          name: "",
          date: "2020-01-01",
          time: "12:00:00",
          campaign_id: "",
          group_candidates: [
            {
              candidate_id: 0,
              cv: "",
              description: "",
              interview_time: "12:00:00",
              user: {
                id: 0,
                name: "",
                email: "",
                phone: "",
              },
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    document.addEventListener("scroll", this.shrinkHeaderHeight);
    //window.onscroll = this.shrinkHeaderHeight;
    let { campaign_id } = this.state;
    this.props.showCampaign(campaign_id);
    this.props.getInterviews(campaign_id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.campaign,
      interviews: nextProps.interview,
    });
  }
  componentWillUnmount() {
    document.removeEventListener("scroll", this.shrinkHeaderHeight);
    //document.removeEventListener('scroll', this.resizeHeaderOnScroll);
  }

  shrinkHeaderHeight = () => {
    //const isTop = document.body.scrollTop > 200 || document.documentElement.scrollTop > 200;
    if (window.scrollY < 440) {
      this.setState({
        isTop: true,
      });
    } else {
      this.setState({
        isTop: false,
      });
    }
  };
  onClickCreateQuizHandler = () => {
    let token = localStorage.getItem("token");
    let { history } = this.props;
    let { campaign_id } = this.state;
    localStorage.setItem("campaign_id", campaign_id);
    history.push(`/create/quiz/${token}`);
  };
  render() {
    let { data, isTop, interviews } = this.state;
    let quizThumbnailELM = () => {
      return <QuizThumbnail data={data.question_table} />;
    };
    return (
      <div className="assign-quiz-container d-flex flex-column">
        <JoinNav />

        {/* <div className="assign-quiz-cover-nav"
					style={isTop ? { display: 'none' } : { display: 'block' }}
				></div> */}
        <div className={isTop ? "assign-quiz-header" : "assign-quiz-header"}>
          <div className="row" style={{ height: "100%" }}>
            <div className="col-sm-2" style={{ height: "100%" }}></div>
            <div className="col-lg-8" style={{ height: "100%" }}>
              <div
                className="assign-quiz-cover-img-crop"
                style={isTop ? {} : { display: "none" }}
              >
                
              </div>

              <div className="assign-quiz-cover-info d-flex flex-row justify-content-center align-items-center">
                

                <div className="aq-campaign-title-and-apply flex-grow-1">
                  <h3>{data.title}</h3>
                  <p>{interviews.length} interview</p>
                  <div className="aq-campaign-position-and-subject d-flex flex-row">
                    <div className="aq-position">
                      <span>
                        <FontAwesomeIcon
                          icon={faUserTie}
                          color="#393A68"
                          className="mr-1"
                        />
                      </span>
                      {data.level.name}
                    </div>
                    <div className="aq-subjects d-flex flex-row">
                      {data.subjects.map((sub) => {
                        return (
                          <div key={sub.id} className="aq-subject">
                            {sub.title}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-2" style={{ height: "100%" }}></div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-lg-6">
            <div className="assign-quiz-editor">
              <div className="assign-quiz-interviews-container">
                <div className="assign-quiz-interviews-header">Interviews</div>
                
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className="assign-quiz-create-container"
              style={
                isTop ? {} : { position: "sticky", top: "60px", width: "280px" }
              }
            >
              <div className="assign-quiz-create-header">Campaign quiz</div>
              <div
                className="assign-quiz-create d-flex flex-column align-items-start"
                style={
                  data.question_table !== null
                    ? {
                        backgroundColor: "#f2f2f2",
                        boxShadow: "none",
                        padding: "0",
                        alignItems: "flex-start",
                      }
                    : {}
                }
              >
                {data.question_table !== null ? (
                  quizThumbnailELM()
                ) : (
                  <>
                    <b>No quiz for this recruitment yet</b>
                    
                    <button
                      className="assign-create-quiz-btn"
                      onClick={this.onClickCreateQuizHandler}
                    >
                      <span>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        Create quiz for Campaign
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    showCampaign: (campaign_id) => {
      dispatch(actions.showCampaign(campaign_id));
    },
    getInterviews: (campaign_id) => {
      dispatch(actions.getInterviews(campaign_id));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
    interview: state.interview,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)((AssignQuiz));
