import React from "react";
import Typography from "@mui/material/Typography";
import { BsExclamationCircle } from "react-icons/bs";

const ValidationComp = ({ error }) => {
  return (
    <Typography
      variant="body2"
      sx={{
        color: "red",
        marginLeft: "5px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <BsExclamationCircle
        color="red"
        size="12px"
        style={{ marginRight: "4px" }}
      />
      {error}
    </Typography>
  );
};

export default ValidationComp;
