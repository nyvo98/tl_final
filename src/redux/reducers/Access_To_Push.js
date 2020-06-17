import * as types from "../actions/actionTypes";

let initialState = {
  push: false,
};
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ACCESS_TO_PUSH:
      return { push: true };
    case types.ACCESS_TO_PUSH_QUIZ:
      return { push: true, question_table_id: action.id };
    default:
      return { push: false };
  }
};
export default myReducer;
