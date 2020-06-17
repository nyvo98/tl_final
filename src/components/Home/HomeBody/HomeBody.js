import React from "react";
import "./HomeBody.css";
//import RecruitThumbnail from "../../../utils/RecruitThumbnail/RecruitThumbnail";
import { Panel } from "../../../utils/Tab/Tabs";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
//import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";

class HomeBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotTabsCount: 4,
      search: "",
      data: [
        {
          title: "",
          level_id: 0,
          work_type_id: 0,
          salary: 0,
          user_id: 0,
          work_description: "",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.showListCampaign();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.campaigns,
    });
  }
  
  onChangeInputHandler = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    let { data, search } = this.state;

    let panel = [];
    let campaignEml = [];
    for (let i = 0; i < data.length; i++) {
      campaignEml.push(
        
      );
      if ((i + 1) % 9 === 0) {
        panel.push(<Panel key={i}>{campaignEml}</Panel>);
        campaignEml = [];
      }
    }
    return (
      <div className="home-body-container container-fluid">
        {/* <video className="video-intro" src={require("../images/outlanders_header.webm")} autoPlay={true} loop={true}></video> */}
        <div className="row">
          <div className="col-2"></div>
          <div className="col-lg-8 py-3 px-0">
            <div className="candidate-job-search-container mx-3 mb-5">
              <div className="candidate-job-search">
                <input
                  name="search"
                  value={search}
                  onChange={this.onChangeInputHandler}
                  className="search-ipt"
                  placeholder="Search test..."
                />
                <button
                  className="search-btn"
                  onClick={this.onClickSearchCampaignHandler}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="candidate-job-seek container-fluid">
              <div className="candidate-job-seek-header p-2 d-flex flex-row">
                <div className="candidate-post-icon align-self-center">
                  <FontAwesomeIcon
                    icon={faNewspaper}
                    size="2x"
                    color="white"
                    className="align-self-center"
                  />
                </div>
                
                  <img
                    alt="step"
                    src={require("../images/step1.png")}
                    className="step-img"
                  />
                 
                </div>
                <div className="hire-step">
                  <h4>
                  
                  </h4>
                  <img
                    alt="step"
                    src={require("../images/step2.png")}
                    className="step-img"
                  />
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    showListCampaign: () => {
      dispatch(actions.showListCampaign());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    campaigns: state.campaigns,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((HomeBody));
