import React from "react";
import { Select } from "antd";
import "antd/dist/reset.css";

const AntdSelect = ({ defaultValue, options, onChange }) => {
  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: "100%", height: "40px" }}
      onChange={onChange}
      options={options}
    />
  );
};

export default AntdSelect;
