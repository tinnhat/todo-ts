import { Button, Input, Upload } from "antd";
import React, { useEffect, useState } from "react";
import openNotificationWithIcon from "../notification/notification";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../Input";
import fetchDataAPI from "../../api/configApi";
import { useDispatch } from "react-redux";
import { registerUser, uploadAvatar } from "../../redux/actions/user";
import { useNavigate } from "react-router-dom";
const schema = yup
  .object({
    fullname: yup.string().required(),
    username: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().email("Must be a valid email").max(255).required(),
    password: yup.string().min(8, "Password is too short").required(),
    repassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();
function FormRegister(props) {
  const { setForgotPass } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const result = await dispatch(registerUser(data));
    if (result) {
      openNotificationWithIcon("success", "Register successfully");
      setTimeout(() => {
        navigate(0);
      }, 1000);
    }
  };
  return (
    <div className="bg-[#4C6793] p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <p className="error-label">{errors.fullname?.message}</p>
          <InputField
            control={control}
            placeholder="Fullname"
            name={register("fullname", { required: true })}
            required={true}
          />
        </div>
        <div className="mb-4">
          <p className="error-label">{errors.username?.message}</p>
          <InputField
            placeholder="Username"
            control={control}
            name={register("username", { required: true })}
            required={true}
          />
        </div>
        <div className="mb-4">
          <p className="error-label">{errors.email?.message}</p>
          <InputField
            placeholder="Email"
            control={control}
            name={register("email", { required: true })}
            required={true}
          />
        </div>
        <div className="mb-4">
          <p className="error-label">{errors.phone?.message}</p>
          <InputField
            placeholder="Phone"
            control={control}
            name={register("phone", { required: true })}
            required={true}
          />
        </div>
        <div className="mb-4">
          <p className="error-label">{errors.password?.message}</p>
          <InputField
            placeholder="Password"
            type="password"
            control={control}
            name={register("password", { required: true })}
            required={true}
          />
        </div>
        <div className="mb-4">
          <p className="error-label">{errors.repassword?.message}</p>
          <InputField
            placeholder="RePassword"
            type="password"
            control={control}
            name={register("repassword", { required: true })}
            required={true}
          />
        </div>
        <a
          className="text-sm text-gray-300 hover:text-gray-100"
          onClick={() => setForgotPass(true)}
        >
          Forgot Password ?
        </a>
        <div className="h-px w-full bg-slate-400 my-4"></div>

        <button className="uppercase font-medium w-full text-center p-2 text-gray-300 bg-emerald-600 rounded-md  hover:bg-emerald-500 hover:text-white transition-all">
          Register
        </button>
      </form>
    </div>
  );
}

FormRegister.propTypes = {};

export default React.memo(FormRegister);
