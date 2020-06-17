import React from "react";
import "./Overview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
//import { withRouter } from "react-router-dom";

class DiscoverOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onClickPushHanlder = () => {
    let { id } = this.props.data;
    this.props.history.push(`/detail_recruit/${id}`);
  };
  parseTwitterDate = (tdate) => {
    var K = () => {
      var a = navigator.userAgent;
      return {
        ie: a.match(/MSIE\s([^;]*)/),
      };
    };
    var system_date = new Date(Date.parse(tdate));
    var user_date = new Date();
    if (K.ie) {
      system_date = Date.parse(tdate.replace(/( \+)/, " UTC$1"));
    }
    var diff = Math.floor((user_date - system_date) / 1000);
    if (diff <= 1) {
      return "just now";
    }
    if (diff < 20) {
      return diff + " seconds ago";
    }
    if (diff < 40) {
      return "half a minute ago";
    }
    if (diff < 60) {
      return "less than a minute ago";
    }
    if (diff <= 90) {
      return "one minute ago";
    }
    if (diff <= 3540) {
      return Math.round(diff / 60) + " minutes ago";
    }
    if (diff <= 5400) {
      return "1 hour ago";
    }
    if (diff <= 86400) {
      return Math.round(diff / 3600) + " hours ago";
    }
    if (diff <= 129600) {
      return "1 day ago";
    }
    if (diff < 604800) {
      return Math.round(diff / 86400) + " days ago";
    }
    if (diff <= 777600) {
      return "1 week ago";
    }
    return "on " + system_date;
  };
  render() {
    
    

    return (
      <div className="do-container d-flex flex-row">
        <div className="do-recruit-cover-crop">
          
        </div>
        <div
          className="do-recruit-info-container d-flex flex-column flex-fill"
          onClick={this.onClickPushHanlder}
        >
          
          
          <div className="do-recruit-detail d-flex flex-row justify-content-between flex-fill align-items-center">
            <div className="do-salary">
              <span className="mr-1">
                <FontAwesomeIcon icon={faDollarSign} />
              </span>
              
            </div>
            <div className="do-location">
              <span className="mr-1">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </span>
              
            </div>
            <div className="do-post-time">
              <span className="mr-1">
                <FontAwesomeIcon icon={faClock} size="lg" />
              </span>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default (DiscoverOverview);
