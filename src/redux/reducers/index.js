// import login from './login';
// import profile from './profile';
import questionTable from "./QuestionTable";
import question from "./Question";
import subject from "./Subject";
import login from "./Login";
import user from "./User";
import attempt from "./Attempt";
import completed from "./CompletedQuiz";
import teleport from "./Teleport";
import report from "./Report";
import campaign from "./Campaign";
import campaigns from "./Campaigns";
import work_type from "./Work_Type";
import level from "./Level";
import availableCandidates from "./Available_Candidates";
import candidate from "./Candidate";
import accessToPush from "./Access_To_Push";
import interview from "./Interview";
import completedInterview from "./CompletedInterview";

import { combineReducers } from "redux";
const myReducer = combineReducers({
  question,
  questionTable,
  subject,
  login,
  user,
  attempt,
  completed,
  teleport,
  report,
  campaign,
  campaigns,
  availableCandidates,
  candidate,
  accessToPush,
  interview,
  completedInterview,
  work_type,
  level,
});
export default myReducer;
