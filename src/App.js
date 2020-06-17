import React from "react";
import "./App.css";
import QuizCreator from "./layouts/Quiz/QuizCreator/QuizCreator";
import QuizCreateModal from "./layouts/Quiz/QuizCreateModal/QuizCreateModal";

import DoQuiz from "./layouts/DoQuiz/DoQuiz";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Join from "./layouts/Join/Join";
import Home from "./layouts/Home/Home";
import PreGame from "./components/PreGame/PreGame";
import ReviewAttempt from "./components/PreGame/QuizAttempt/ReviewAttempt/ReviewAttempt";
import AdminLayout from "./layouts/Admin/Admin";
import QuizStart from "./components/Join/QuizStart/QuizStart";
import UserSettings from "./components/Join/UserSettings/Settings";
import ReportDetail from "./components/Admin/Page/Reports/ReportDetail/ReportDetail";
import HomeDiscover from "./components/Home/Discover/Discover";

class App extends React.Component {
  render() {
    return (
      <div className="page-container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            
            <Route path="/quiz/:question_table_id" component={QuizCreator} />}
            />
            <Route path="/join">
              <Join />
            </Route>
            <Route path="/create/quiz/:admin" component={QuizCreateModal} />
            <Route path="/admin">
              <AdminLayout />
            </Route>
            <Route path="/game/:question_table_id" component={DoQuiz} />
            <Route path="/start/:question_table_id" component={QuizStart} />
            <Route
              exact
              path="/pre-game/:question_table_id"
              component={PreGame}
            />
            <Route
              path="/pre-game/:question_table_id/review"
              component={ReviewAttempt}
            />
            <Route path="/settings" component={UserSettings} />
          
            <Route
              path="/admin/reports/report_detail"
              component={ReportDetail}
            />
            <Route path="/home/discover" component={HomeDiscover} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
