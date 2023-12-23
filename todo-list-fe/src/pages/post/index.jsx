import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextArea from "antd/lib/input/TextArea";
import { Button } from "antd";
import ItemPost from "./item";
import fetchDataAPI from "../../api/configApi";
import { useForm } from "react-hook-form";
import openNotificationWithIcon from "../../components/notification/notification";

function Post(props) {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [value, setValue] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();
  const fetchData = () => {
    fetchDataAPI(`api/getAll`).then((res) => {
      setPosts(res.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onSubmit = async () => {
    if (value) {
      await fetchDataAPI(`api/post`, "POST", {
        content: value,
        userid: user._id,
        author: user.username,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response));
      setValue("");
      fetchData();
      return;
    }
    openNotificationWithIcon("error", "Please enter your post");
  };
  return (
    <div className="bg-[#16213E] min-h-screen">
      <div className="w-3/4 mx-auto">
        <div className="pt-20 text-center">
          <p className=" text-4xl uppercase font-medium">Share your post</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 text-right">
            <textarea
              value={value}
              className="w-full outline-none p-2 text-black"
              rows={4}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              type="submit"
              className="mt-2 bg-red-400 text-slate-300 uppercase w-24 hover:bg-red-500 border-none hover:text-white transition-all py-2 px-1"
            >
              Send
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center flex-col mt-10">
          {posts.length > 0 ? (
            posts.map((item) => (
              <ItemPost key={item._id} fetchData={fetchData} item={item} />
            ))
          ) : (
            <p>No Post</p>
          )}
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {};

export default Post;
