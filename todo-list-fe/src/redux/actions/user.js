import fetchDataAPI from "../../api/configApi";
import openNotificationWithIcon from "../../components/notification/notification";
import { LOGIN, LOGOUT, CLEAR_TOKEN } from "../types";

export const login = (data) => async (dispatch) => {
  const response = await fetchDataAPI("user/signin", "POST", data)
    .then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      dispatch({
        type: LOGIN,
        payload: res.data,
      });
      return true;
    })
    .catch((err) => {
      console.log(err.response);
      openNotificationWithIcon("error", err.response?.data?.message);
      return false;
    });
  return response;
};
export const get_info_user = (id) => async (dispatch) => {
  const response = await fetchDataAPI(`user/getOne/${id}`)
    .then((res) => {
      dispatch({
        type: LOGIN,
        payload: res.data.result,
      });
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      //xóa token
      dispatch({ type: CLEAR_TOKEN });
      localStorage.clear();
      // openNotificationWithIcon("error", err.response?.data?.message);
      return false;
    });
  return response;
};
export const logout = () => async (dispatch) => {
  localStorage.clear();
  dispatch({
    type: LOGOUT,
  });
};
export const registerUser = (data) => async (dispatch) => {
  console.log(data);
  const response = await fetchDataAPI("user/register", "POST", data)
    .then((res) => {
      return true;
    })
    .catch((err) => {
      console.log(err.response);
      openNotificationWithIcon("error", err.response?.data?.message);
      return false;
    });
  return response;
};
export const updateInfoUser = (data) => async (dispatch) => {
  console.log(data);
  const response = await fetchDataAPI(`user/update/${data._id}`, "PATCH", data)
    .then((res) => {
      return true;
    })
    .catch((err) => {
      console.log(err.response);
      openNotificationWithIcon("error", err.response?.data?.message);
      return false;
    });
  return response;
};
