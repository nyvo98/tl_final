import * as types from "../actions/actionTypes";
const initialState = [];

let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REPORT: {
      
      return [...action.data];
    }
       default:
      return [ ...state ];
  }
};
export default myReducer;
