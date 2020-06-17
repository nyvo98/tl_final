import * as types from "../actions/actionTypes";

let initialState = {
  campaign_id: 0,
  candidate_id: 0,
  cv: "",
  description: "",
  isSendCvBefore: false,
};
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_CV_SUCCESS:
      state = action.data;
      return { ...state };
    case types.CANDIDATE_SENT_CV:
      let tempt1 = { ...state };
      tempt1.isSendCvBefore = true;
      return { ...tempt1 };
    case types.CANDIDATE_NOT_SEND_CV:
      let tempt2 = { ...state };
      tempt2.isSendCvBefore = false;
      return { ...tempt2 };
    default:
      return state;
  }
};
export default myReducer;
