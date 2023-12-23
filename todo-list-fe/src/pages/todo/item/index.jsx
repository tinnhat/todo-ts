import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import fetchDataAPI from "../../../api/configApi";
import openNotificationWithIcon from "../../../components/notification/notification";
function Item(props) {
  const { fetchData, item, setValue, setId, setEdit } = props;

  const handleSetValue = () => {
    setId(item._id);
    setValue(item.name);
    setEdit(true);
  };
  const handleDelete = async () => {
    await fetchDataAPI(`todo/delete/${item._id}`, "DELETE")
      .then((res) => {
        console.log(res);
        openNotificationWithIcon("success", "Delete item successfully");
      })
      .catch((err) => console.log(err));
    fetchData();
  };
  const handleUpdateComplete = async (e) => {
    await fetchDataAPI(`todo/update/${item._id}`, "PATCH", {
      status: e.target.checked,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    fetchData();
  };

  return (
    <p
      className={`flex items-center mb-2 ${
        item.status ? "bg-green-600" : "bg-[#25316D]"
      }  p-2 rounded-sm justify-between
      `}
    >
      <Checkbox checked={item.status} onClick={handleUpdateComplete} />
      <span className="block mx-1">{item.name}</span>
      <div>
        {!item.status && (
          <EditOutlined
            className="pl-2 cursor-pointer"
            onClick={handleSetValue}
          />
        )}
        <DeleteOutlined
          className="pl-2 cursor-pointer mx-2"
          onClick={handleDelete}
        />
      </div>
    </p>
  );
}

Item.propTypes = {};

export default Item;
