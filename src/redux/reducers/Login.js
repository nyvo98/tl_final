import * as types from "../actions/actionTypes";

let initialState = {
  id: 0,
  name: "",
  email: "",
  password: "",
  token: "",
  isLoading: false,
  role_id: 0,
  isDoneSignUp: false,
  isDoneLogin: false,
};
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      state = { ...action.data };
      state.isDoneLogin = true;
      state.isLoading = false;
      return {
        ...state,
      };
    case types.LOGIN_FAILED:
      state.isDoneLogin = true;
      state.isLoading = false;
      return {
        ...state,
      };
    case types.GET_USER_SUCCESS:
      state = { ...action.data };
      state.isDoneLogin = true;

      return {
        ...state,
      };
    case types.GET_USER_FAILED:
      state.isDoneLogin = true;

      return {
        ...state,
      };
    case types.SIGN_UP_SUCCESS:
      state = { ...action.data };
      state.isDoneLogin = true;
      state.isLoading = false;
      state.isDoneSignUp = true;
      return {
        ...state,
      };
    case types.SIGN_UP_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default myReducer;
