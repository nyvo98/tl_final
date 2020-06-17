import * as types from "../actions/actionTypes";

let initialState = [
  {
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
      code: 0,
      title: "",
      image: null,
      played: 0,
      user: { name: "" },
      questions: [],
    },
    company: {
      name: "",
      address: "",
    },
    created_at: "12:00:00",
    updated_at: "12:00:00",
  },
];
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CAMPAIGNS:
      state = [...action.data];

      return [...state];
    case types.SHOW_CAMPAIGNS:
      return [...state];
    case types.CREATE_CAMPAIGN:
      state.push({ ...action.data });

      return [...state];

    default:
      return state;
  }
};
export default myReducer;
