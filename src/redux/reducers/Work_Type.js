import * as types from "../actions/actionTypes";
const initialState = [
  {
    id: 0,
    name: "",
  },
];

let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_WORK_TYPE: {
      state = action.data;
      return state;
    }

    default:
      return state;
  }
};
export default myReducer;
