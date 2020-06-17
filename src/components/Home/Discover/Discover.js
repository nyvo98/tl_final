import React from "react";
import "./Discover.css";
import HomeNav from "../Nav/Nav";
import { Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import DiscoverOverview from "./Overview/Overview";
import location from "../../../utils/location.json";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
//import { withRouter } from "react-router-dom";
const { Option } = Select;
class Homediscover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      newSearch: "",
      data: [
        {
          id: 0,
          title: "",
          level_id: 0,
          work_type_id: 0,
          salary: 0,
          user_id: 0,
          work_description: "",
          user: {
            company: {
              name: "",
              address: "",
            },
          },
        },
      ],
    };
  }
  componentDidMount() {
    let query = new URLSearchParams(this.props.location.search);
    let search = query.get("search");
    this.props.searchCampaigns(search);

    this.setState({
      search,
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps.campaigns);
    this.setState({
      data: nextProps.campaigns,
    });
  }
  locationMenu = () => {
    let elm = location.map((local, index) => {
      return <Option key={index}>{local.name}</Option>;
    });

    return elm;
  };
  onChangeSearchHandler = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  onClickSearchHandler = () => {
    let { newSearch } = this.state;
    this.setState({
      search: newSearch,
    });
    this.props.searchCampaigns(newSearch);
  };
  render() {
    let { search, data } = this.state;
    let locationMenu = this.locationMenu();
    let campaignsElm = data.map((campaign, index) => {
      return (
        <DiscoverOverview
          key={campaign.id}
          index={index}
          data={campaign}
          image_index={index}
        />
      );
    });

    return (
      <div className="discover-page-container">
        <HomeNav />
        <div className="discover-main">
          <div className="candidate-job-search-container mb-4 ">
            <div className="candidate-job-search">
              <input
                className="search-ipt flex-fill"
                name="newSearch"
                onChange={this.onChangeSearchHandler}
                placeholder="Search jobs ..."
              />
              <div className="control-select-and-icon mx-2 ">
                <span className="insert-icon">
                  <FontAwesomeIcon icon={faMapMarkerAlt} color="#fd7e14" />
                </span>
                <Select
                  style={{ width: "100%", fontSize: "18px" }}
                  placeholder="Select location..."
                >
                  {locationMenu}
                </Select>
              </div>
              <button
                className="search-btn"
                onClick={this.onClickSearchHandler}
              >
                Search
              </button>
            </div>
          </div>

          <div className="search-result-header">
            <h5>
              Top results for
              <em>
                <strong>{search}</strong>
              </em>
            </h5>
          </div>

          <div className="search-result-list">{campaignsElm}</div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    searchCampaigns: (search) => {
      dispatch(actions.searchCampaigns(search));
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
)((Homediscover));
