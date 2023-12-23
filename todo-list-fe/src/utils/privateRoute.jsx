import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { get_info_user } from "../redux/actions/user";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? <Outlet /> : <Navigate to="/" />;
};

PrivateRoute.propTypes = {};

export default PrivateRoute;
