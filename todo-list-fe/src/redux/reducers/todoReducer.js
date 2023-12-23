import { GET_TODO_BY_ID } from "../types";

const initialValue = [];
const todoReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_TODO_BY_ID:
      return state;

    default:
      return state;
  }
};
export default todoReducer;
