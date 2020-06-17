import React from "react";
import "./Join.css";
import { Route, Switch } from "react-router-dom";
import JoinNav from "../../components/Join/Nav/Nav";
import Activity from "../../components/Join/Activity/Activity";
import Join from "../../components/Join/Join";
import LoadingPage from "../../utils/LoadingPage/LoadingPage";
import AssignQuiz from "../../components/Join/AssignQuiz/AssignQuiz";

class JoinLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadDataDone: false,
    };
  }
  componentDidMount() {
    document.title = "Join a quiz";
  }
  doneLoading = () => {
    this.setState({
      isLoadDataDone: true,
    });
  };
  render() {
    let { match } = this.props;
    let { isLoadDataDone } = this.state;
    if (!localStorage.getItem("token")) this.props.history.push("/");
    if (!isLoadDataDone) return <LoadingPage doneLoading={this.doneLoading} />;
    else
      return (
        <div className="join-layout-container">
          <JoinNav />
          <br></br>
          <Switch>
            <Route exact path={`${match.path}`}>
              <Join />
            </Route>
            <Route path={`${match.path}/assign/:campaign_id`}>
              <AssignQuiz />
            </Route>
            <Route path={`${match.path}/activity`}>
              <Activity />
            </Route>
          </Switch>
        </div>
      );
  }
}

export default (JoinLayout);
