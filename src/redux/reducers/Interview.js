import * as types from "../actions/actionTypes";

let initialState = [
  {
    id: 0,
    name: "",
    date: "2020-01-01",
    time: "12:00:00",
    campaign_id: "",

    campaign: {
      question_table: { bench_mark: 70 },
    },
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
];
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INTERVIEWS:
      state = [...action.data];
      return [...state];
    case types.SHOW_INTERVIEWS:
      return [...state];
    case types.CREATE_INTERVIEW:
      let group_candidates = [];
      action.data.group_candidates = group_candidates;
      state.push(action.data);
      return [...state];
    case types.UPDATE_INTERVIEW_CANDIDATES:
      for (let i = 0; i < state.length; i++)
        if (state[i].id === action.data.interview_id)
          for (let j = 0; j < state[i].group_candidates.length; j++)
            if (
              state[i].group_candidates[j].candidate_id ===
              action.data.candidate_id
            ) {
              state[i].group_candidates[j] = { ...action.data };
              break;
            }

      return [...state];

    case types.INSERT_INTERVIEW_CANDIDATES:
      for (let i = 0; i < state.length; i++)
        if (state[i].id === action.data.interview_id) {
          state[i].group_candidates.push(action.data);
          break;
        }
      return [...state];
    case types.DELETE_INTERVIEW_CANDIDATES:
      for (let i = 0; i < state.length; i++)
        if (state[i].id === action.interview_id)
          for (let j = 0; j < state[i].group_candidates.length; j++)
            if (
              state[i].group_candidates[j].candidate_id ===
              action.data.candidate_id
            ) {
              state[i].group_candidates.splice(j, 1);
              break;
            }

      return [...state];
    default:
      return [...state];
  }
};
export default myReducer;
