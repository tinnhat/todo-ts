import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";

function InputField(props) {
  const {
    label,
    type,
    name,
    defaultValue,
    readOnly,
    disabled = false,
    placeholder,
  } = props;
  return (
    <>
      <input
        {...name}
        type={type}
        defaultValue={defaultValue}
        readOnly={readOnly}
        disabled={disabled}
        id={label}
        placeholder={placeholder}
        className="w-full p-1 px-2 outline-none rounded-sm border-none text-black focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
      />
    </>
  );
}

InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  defaultValue: PropTypes.string,
  readOnly: PropTypes.bool,
};
InputField.defaultProps = {
  label: "",
  type: "text",
  name: "",
  required: false,
  defaultValue: "",
  readOnly: false,
};

export default React.memo(InputField);
