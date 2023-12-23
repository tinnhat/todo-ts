import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Checkbox, Input } from "antd";
import { useState } from "react";
import Item from "./item";
import fetchDataAPI from "../../api/configApi";
import openNotificationWithIcon from "../../components/notification/notification";
function Todo(props) {
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(false);
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchData = () => {
    fetchDataAPI(`todo/getOne/${user._id}`).then((res) => {
      setTodos(res.data.result);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleAddTodo = async () => {
    if (value) {
      await fetchDataAPI("todo/create", "POST", {
        name: value,
        status: false,
        userid: user._id,
      }).then((res) => {
        console.log(res);
      });
      fetchData();
      setValue("");
      return;
    }
    openNotificationWithIcon("error", "Please enter name of your todo ");
  };
  const handleUpdateTodo = async () => {
    if (value) {
      await fetchDataAPI(`todo/update/${id}`, "PATCH", {
        name: value,
      }).then((res) => {
        console.log(res);
        openNotificationWithIcon("success", "Todo updated successfully");
      });
      fetchData();
      setValue("");
      return;
    }
    openNotificationWithIcon(
      "error",
      "Please enter name of your todo need update"
    );
  };
  return (
    <div className="bg-[#16213E] h-screen">
      <div className="container mx-auto">
        <div className="flex items-center justify-center flex-col">
          <p className="pt-20 text-4xl uppercase font-medium ">List to do</p>
          <div className="flex items-center justify-between mt-10 w-2/5 ">
            <Input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {edit ? (
              <>
                <EditOutlined
                  className="p-2 cursor-pointer"
                  onClick={handleUpdateTodo}
                />
                <RollbackOutlined
                  className="p-2 cursor-pointer ml-1"
                  onClick={() => {
                    setValue("");
                    setEdit(false);
                  }}
                />
              </>
            ) : (
              <PlusOutlined
                className="p-2 cursor-pointer"
                onClick={handleAddTodo}
              />
            )}
          </div>
          <div className="flex flex-col mt-4 w-2/5 overflow-x-hidden max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300">
            {todos ? (
              todos.map((item) => (
                <Item
                  item={item}
                  setValue={setValue}
                  setEdit={setEdit}
                  key={item._id}
                  setId={setId}
                  fetchData={fetchData}
                />
              ))
            ) : (
              <p className="text-center">No todo</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Todo.propTypes = {};

export default Todo;
