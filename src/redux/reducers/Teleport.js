import * as types from "../actions/actionTypes";
const initialState = [];
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TELEPORT_QUESTION_ANSWERS:
      return [...action.data];
    default:
      return [...state];
  }
};
export default myReducer;
