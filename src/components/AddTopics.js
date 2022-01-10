import React from "react";
import Select, { StylesConfig } from "react-select";
import { alpha, useTheme } from "@mui/material/styles";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
const ReactSelect = ({ setNewTags, newTags, setOpenSnack, setSeverity }) => {
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
      "&:hover": {
        border: "1px solid #2e7d32",
      },
      "&:focus": {
        border: "1px solid #2e7d32",
      },
    }),
    option: (styles) => ({
      ...styles,
      color: "darkgreen",
      backgroundColor: "#fff",
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
    // console.log("newValue", newValue);
    // console.log("key", e.key);
  };
  return (
    <CreatableSelect
      autoFocus
      //   defaultValue={defaultVal.tags.map((itm) => itm)}
      options={newTags}
      styles={colourStyles}
      placeholder="Write topic and press enter"
      isMulti
      captureMenuScroll={false}
      onChange={(v) => {
        if (newTags.length < 10) {
          handleChange(v);
        } else {
          setOpenSnack("Max limit Reached.");
          setSeverity("error");
        }
      }}
      //   menuIsOpen={false}
    />
  );
};
export default ReactSelect;
