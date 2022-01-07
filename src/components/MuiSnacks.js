import React from "react";
import { Alert, Snackbar } from "@mui/material";

const MuiSnacks = ({ openSnack, severity, text, setOpenSnack }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack("");
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: severity === "success" ? "center" : "right",
      }}
      open={Boolean(openSnack)}
      autoHideDuration={2500}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        variant="filled"
        severity={severity || "success"}
        sx={{ width: "100%", border: "2px solid #fff" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default MuiSnacks;
