import React from "react";
import TextField from "@mui/material/TextField";

const MuiTextField = ({
  label,
  autoFocus,
  inputProps,
  type,
  color,
  variant,
  mt,
}) => {
  return (
    <TextField
      autoFocus={autoFocus ? autoFocus : false}
      sx={{ mt: mt ? mt : 2 }}
      type={type ? type : "text"}
      color={color ? color : "success"}
      label={label}
      variant={variant ? variant : "outlined"}
      inputProps={inputProps}
      fullWidth
    />
  );
};

export default MuiTextField;
