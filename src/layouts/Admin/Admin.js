import React from "react";
import "./Admin.css";
import AdminNav from "../../components/Admin/Nav/Nav";
import AdminPage from "../../components/Admin/Page/Page";
//import { withRouter } from "react-router-dom";
class AdminLayOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="admin-layout-container">
        <AdminNav />
        <br />
        <AdminPage />
      </div>
    );
  }
}

export default (AdminLayOut);
