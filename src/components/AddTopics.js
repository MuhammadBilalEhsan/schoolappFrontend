import React from "react";
import Select, { StylesConfig } from "react-select";
import { alpha, useTheme } from "@mui/material/styles";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
import { useFormik } from "formik";
const ReactSelect = ({
  setNewTags,
  newTags,
  formik,
  editCourse,
  defaultVal,
}) => {
  const theme = useTheme();
  const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",
    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#fff",
      marginTop: "16px",
      border: "1px solid black",
      boxShadow: "none",
      "&:focus": {
        border: "1px solid #2e7d32",
      },
      "&:hover": {
        border: "1px solid #2e7d32",
      },
    }),
    option: (styles) => ({
      ...styles,
      // color: "darkgreen",
      // backgroundColor: "#fff",
      display: "none",
    }),
    // input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot("#fff") }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "#fff",
      color: "red",
    }),
    multiValueLabel: (styles) => ({ ...styles, color: "#000" }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "#fff",
    }),
    menuList: (base) => ({
      ...base,
      "::-webkit-scrollbar": {
        width: "9px",
      },
      "::-webkit-scrollbar-track": {
        background: "black",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#fff",
      },
    }),
    input: (styles) => ({ ...styles, color: "#000" }),
  };

  const handleChange = (newValue, actionMeta) => {
    setNewTags(newValue);
  };
  return (
    <CreatableSelect
      menuIsOpen={newTags?.length <= 9 ? true : false}
      components={{
        Menu: () => null,
      }}
      // autoFocus
      defaultValue={editCourse ? defaultVal.map((itm) => itm) : []}
      // captureMenuScroll={false}
      options={newTags}
      styles={colourStyles}
      placeholder="Write a topic and press enter"
      isMulti
      // onKeyPress
      onKeyDown={() => formik.setFieldTouched("topics")}
      onChange={(v) => {
        handleChange(v);
      }}
      // formatCreateLabel={() => undefined}
      //   menuIsOpen={false}
    />
  );
};
export default ReactSelect;
