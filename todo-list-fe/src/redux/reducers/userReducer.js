import { LOGOUT, REGISTER, LOGIN, GET_USER, CLEAR_TOKEN } from "../types";

const initialUser = {
  user: null,
};
const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload?.user,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload.result,
      };
    case LOGOUT:
      return { ...state, user: null };
    case CLEAR_TOKEN:
      return { ...state, user: null };
    default:
      return state;
  }
};
export default userReducer;
