import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../redux/types";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/user";
function Header(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logout());
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="bg-[#293462] ">
      <div className="w-full lg:w-10/12 xl:w-10/12 2xl:w-10/12 mx-auto flex items-center justify-between">
        <div>
          <ul className="flex">
            <li>
              <a
                href="todo"
                className="p-4 block hover:bg-slate-500 hover:text-white transition-all"
              >
                To do
              </a>
            </li>
            <li className="ml-4">
              <a
                href="post"
                className="p-4 block hover:bg-slate-500 hover:text-white transition-all"
              >
                Post
              </a>
            </li>
          </ul>
        </div>
        <div
          className="relative flex cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <p className="pr-2">{user?.fullname}</p>
          <Avatar size="small" icon={<UserOutlined />} />
          {user && show ? (
            <div className="absolute w-40 right-0 bg-[#30475E] mt-8">
              <p
                className="p-3 cursor-pointer hover:bg-[#1C3879] transition-all"
                onClick={() => navigate("/profile")}
              >
                Profile
              </p>
              <p
                className="p-3 cursor-pointer hover:bg-[#1C3879] transition-all"
                onClick={handleLogOut}
              >
                Logout
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {};

export default Header;
