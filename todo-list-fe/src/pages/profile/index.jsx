import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Image, Upload } from "antd";
import openNotificationWithIcon from "../../components/notification/notification";
import { useForm } from "react-hook-form";
import InputField from "../../components/Input";
import fetchDataAPI from "../../api/configApi";
import { useDispatch } from "react-redux";
import { logout, updateInfoUser, uploadAvatar } from "../../redux/actions/user";
const Profile = (props) => {
  const dispatch = useDispatch();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [id, setId] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const callData = () => {
    fetchDataAPI("user/profile", "POST")
      .then((res) => {
        setId(res.data.message._id);
        setValue("email", res.data.message?.email);
        setValue("fullname", res.data.message?.fullname);
        setValue("phone", res.data.message?.phone);
        setValue("oldpassword", res.data.message?.password);
      })
      .catch((err) => console.log(err.response));
  };
  useEffect(() => {
    callData();
  }, []);

  const onSubmit = async (data) => {
    //có change password
    if (showChangePassword) {
      if (watch().password === "" || watch().renewpass === "") {
        openNotificationWithIcon(
          "warning",
          "Please enter your new password or Retype new password",
          "New password and Retype new password must be same"
        );
        return;
      }
      if (watch().password !== watch().renewpass) {
        openNotificationWithIcon(
          "error",
          "New password and Retype new password must be same"
        );
        return;
      }
      //khoông thay đổi avatar
      const updateInfo = await dispatch(
        updateInfoUser({
          phone: data.phone,
          fullname: data.fullname,
          password: data.password,
          _id: id,
        })
      );
      if (updateInfo) {
        setTimeout(() => {
          openNotificationWithIcon(
            "success",
            "Update Info Successfully",
            "Please login again to update infomation"
          );
          dispatch(logout());
          window.location.href = "/";
        }, 2500);
      }
    } else {
      //cập nhật ko change pass

      //khoông thay đổi avatar
      const updateInfo = await dispatch(
        updateInfoUser({
          phone: data.phone,
          fullname: data.fullname,
          _id: id,
        })
      );
      if (updateInfo) {
        setTimeout(() => {
          openNotificationWithIcon(
            "success",
            "Update Info Successfully",
            "Please login again to update infomation"
          );
          dispatch(logout());
          window.location.href = "/";
        }, 2500);
      }
    }
  };
  return (
    <div className="app bg-[#16213E] h-screen">
      <div className="container mx-auto flex-col items-center  flex  ">
        <div className="mt-[20px] text-center"></div>
        <form
          className="w-full lg:w-3/5 xl:w-3/5 2xl:w-2/5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-left ">
            <div className="flex mt-10 items-center ">
              <p className="text-sm min-w-[180px] font-medium uppercase mr-4">
                Fullname:
              </p>
              <InputField
                type="text"
                control={control}
                name={register("fullname")}
              />
            </div>
            <div className="flex mt-10 items-center ">
              <p className="text-sm min-w-[180px] font-medium uppercase mr-4">
                Email:
              </p>
              <InputField
                type="text"
                control={control}
                name={register("email")}
                disabled
              />
            </div>
            <div className="flex mt-10 items-center ">
              <p className="text-sm min-w-[180px] font-medium uppercase mr-4">
                Phone:
              </p>
              <InputField
                type="text"
                control={control}
                name={register("phone")}
              />
            </div>
            <div className="flex mt-10 items-center ">
              <p className="text-sm min-w-[180px] font-medium uppercase mr-4">
                Password:
              </p>
              <InputField
                type="password"
                value="Nguyễn Nhật Tín"
                control={control}
                name={register("oldpassword")}
                disabled
              />
            </div>
            {!showChangePassword && (
              <button
                onClick={() => setShowChangePassword(true)}
                className="uppercase font-medium w-full text-center p-2 text-gray-300 bg-emerald-600 rounded-md  hover:bg-emerald-500 hover:text-white transition-all mt-4"
              >
                Change Password
              </button>
            )}

            {showChangePassword && (
              <div>
                <div className="flex mt-10 items-center ">
                  <p className="text-sm min-w-[180px]  font-medium uppercase mr-4">
                    New Password:
                  </p>
                  <InputField
                    type="password"
                    control={control}
                    name={register("password")}
                  />
                </div>
                <div className="flex mt-10 items-center ">
                  <p className="text-sm min-w-[180px] font-medium uppercase mr-4">
                    Retype new password:
                  </p>
                  <InputField
                    type="password"
                    control={control}
                    name={register("renewpass")}
                  />
                </div>
              </div>
            )}
            {showChangePassword && (
              <button
                onClick={() => setShowChangePassword(false)}
                className="uppercase font-medium w-full text-center p-2 text-gray-300 bg-emerald-600 rounded-md  hover:bg-emerald-500 hover:text-white transition-all mt-4"
              >
                Hide change password
              </button>
            )}
            <button className="uppercase font-medium w-full text-center p-2 text-gray-300 bg-emerald-600 rounded-md  hover:bg-emerald-500 hover:text-white transition-all mt-4">
              Upadte Infomation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Profile.propTypes = {};

export default Profile;
