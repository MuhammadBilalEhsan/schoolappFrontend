import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function SubSpinner() {
  return (
    <div>
      <Box
        sx={{
          color: "green",
          backgroundColor: "#fff",
          width: "100%",
          height: "100%",
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        open={true}
      >
        <CircularProgress color="inherit" />
      </Box>
    </div>
  );
}

export default SubSpinner;
