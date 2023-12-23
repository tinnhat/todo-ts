import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Error(props) {
  const navigate = useNavigate();
  return (
    <div className="bg-[#16213E]">
      <div className="container mx-auto  h-screen flex items-center justify-center flex-col">
        <p className="text-5xl my-4">Page not found</p>
        <button
          onClick={() => navigate("/todo")}
          className="uppercase font-medium  text-center p-2 text-gray-300 bg-emerald-600 rounded-md  hover:bg-emerald-500 hover:text-white transition-all"
        >
          Back
        </button>
      </div>
    </div>
  );
}

Error.propTypes = {};

export default Error;
