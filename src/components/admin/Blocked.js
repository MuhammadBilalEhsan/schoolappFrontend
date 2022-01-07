import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import MuiTable from "./MuiTable";

const Blocked = () => {
  const users = useSelector((state) => state.usersReducer.users);
  const blockedUsers = users?.filter((user) => user.blocked === true);
  return (
    <Box
      width="100%"
      minHeight="88vh"
      p={2}
      sx={{ backgroundColor: "#f6f6f6" }}
    >
      {blockedUsers?.length > 0 ? (
        <MuiTable tableBody={blockedUsers} />
      ) : (
        <Box
          width="100%"
          pb={0.1}
          pt={14}
          textAlign="center"
          sx={{
            boxShadow: 2,
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" color="#014201" mb={2}>
            Currently No User Blocked
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Blocked;
