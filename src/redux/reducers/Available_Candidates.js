import * as types from "../actions/actionTypes";

let initialState = [];
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_AVAILABLE_CANDIDATES:
      if (action.data !== undefined) state = [...action.data];
      return [...state];
    case types.INSERT_AVAILABLE_CANDIDATES:
      state.push(action.data);
      return [...state];
    case types.DELETE_AVAILABLE_CANDIDATES:
      for (let i = 0; i < state.length; i++)
        if (action.data.user.id === state[i].user.id) {
          state.splice(i, 1);
          break;
        }
      return [...state];
    default:
      return state;
  }
};
export default myReducer;
