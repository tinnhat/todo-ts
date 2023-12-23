import { GET_POST } from "../types";

const initialValue = [];
const postReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_POST:
      return state;

    default:
      return state;
  }
};
export default postReducer;
