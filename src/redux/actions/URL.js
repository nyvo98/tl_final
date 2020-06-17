const domain = "http://localhost:3000";
export const LOGIN_API_URL = `${domain}/api/login_user`;
export const USER_API = `${domain}/api/get_user`;
export const SIGN_UP_API_URL = `${domain}/api/signup_user`;

export const TELEPORT_QUESTION_API_URL = `${domain}/api/teleport`;
export const IMPORT_QUESTION_API_URL = `${domain}/api/import_question`;
export const QUESTION_API_URL = `${domain}/api/question`;
export const UPDATE_QUESTION_ANSWER_API_URL = `${domain}/api/question_answer_update`;
export const UPDATE_QUESTION_API_URL = `${domain}/api/question_update`;
export const UPDATE_TABLE_API_URL = `${domain}/api/table_update`;
export const UPDATE_TABLE_PLAYED_API_URL = `${domain}/api/table_update_played`;

//question table
export const ANSWER_API_URL = `${domain}/api/questionchoices`;
export const QUESTION_TABLE_API_URL = `${domain}/api/questiontable`;
export const SUBJECT_API_URL = `${domain}/api/subject`;
export const QUESTION_TABLE_BY_SUBJECT_API_URL = `${domain}/api/get_question_table_by_subject`;
export const ANSWER_RECORD_API_URL = `${domain}/api/user_answer`;
export const ATTEMPT_RECORD_API_URL = `${domain}/api/attempt_record`;
export const GENARATE_CODE_API_URL = `${domain}/api/genarate_code`;

//user

export const GET_REPORT_URL = `${domain}/api/report`;

export const UPDATE_USER_API = `${domain}/api/update_user`;
export const USER_QUESTION_TABLE_API_URL = `${domain}/api/get_user_question_table`;
export const QUESTION_TABLE_CODE_API_URL = `${domain}/api/get_question_table_code`;
export const USER_ATTEMPT_API_URL = `${domain}/api/quiz_attempt`;
export const CHECK_USER_DO_QUIZ_API_URL = `${domain}/api/is_user_did_table`;
export const GET_COMPLETED_TABLE = `${domain}/api/get_completed_table`;
// campaign - group_campaign

export const SEARCH_CAMPAIGN_API_URL = `${domain}/api/search_campaign`;
export const CREATE_CAMPAIGN_API_URL = `${domain}/api/create_campaign`;
export const CAMPAIGN_API_URL = `${domain}/api/campaign`;
export const INTERVIEWER_CAMPAIGN_API_URL = `${domain}/api/campaign_of_interviewer`;
export const AVAILABLE_CANDIDATES_API_URL = `${domain}/api/get_available_candidates`;
export const INTERVIEW_CANDIDATES_API_URL = `${domain}/api/get_interview_candidates`;
export const UPDATE_CANDIDATES_API_URL = `${domain}/api/update_group_candidates`;

// candidate
export const CANDIDATE_API_URL = `${domain}/api/candidate`;
export const CREATE_CANDIDATE_API_URL = `${domain}/api/create_candidate`;
// interview
export const GET_INTERVIEW_API_URL = `${domain}/api/get_interview`;
export const CREATE_INTERVIEW_API_URL = `${domain}/api/create_interview`;
export const GET_COMPLETED_INTERVIEW_API_URL = `${domain}/api/completed_interview`;

///
export const WORK_TYPE_API_URL = `${domain}/api/work_type`;
export const LEVEL_API_URL = `${domain}/api/level`;
