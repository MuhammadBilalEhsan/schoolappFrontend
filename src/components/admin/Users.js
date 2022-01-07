import React, { useEffect, useState } from "react";
import MuiTable from "./MuiTable";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";
// import Typography from '@mui/material/Typography'
import { useSelector } from "react-redux";
import AddUserDialog from "./AddUserDialog";
import SubSpinner from "../SubSpinner";

const Users = ({ currentUser }) => {
  const [tableBody, setTableBody] = useState(null);
  const [activeBtnValue, setActiveBtnValue] = useState("all");

  const users = useSelector((state) => state.usersReducer.users);
  const teachers = users?.filter((user) => user?.roll === "teacher");
  const students = users?.filter((user) => user?.roll === "student");

  const handleChange = (event, value) => {
    if (value === "teachers") {
      setTableBody(teachers);
    } else if (value === "students") {
      setTableBody(students);
    } else {
      setTableBody(users);
    }
  };
  useEffect(() => {
    setTableBody(users);
  }, [users]);
  return (
    <Box
      width="100%"
      p={2}
      minHeight="88vh"
      sx={{ backgroundColor: "#f6f6f6" }}
    >
      {users?.length > 0 ? (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <ToggleButtonGroup
            value={tableBody}
            exclusive
            onChange={handleChange}
            // sx={{ mb: 2 }}
          >
            <ToggleButton
              size="small"
              sx={{
                "&:hover": { color: "#014201" },
                backgroundColor: activeBtnValue === "all" ? "#2e7d32" : "#fff",
                color: activeBtnValue === "all" ? "#fff" : "#014201",
              }}
              value="all"
              onClick={() => setActiveBtnValue("all")}
            >
              All Users
            </ToggleButton>

            <ToggleButton
              size="small"
              sx={{
                //   "&:hover": { backgroundColor: "#014201", color: "#fff" },
                //   backgroundColor:
                //     activeBtnValue === "teachers" ? "#014201" : "white",
                //   color: activeBtnValue === "teachers" ? "#fff" : "#014201",
                "&:hover": { color: "#014201" },
                backgroundColor:
                  activeBtnValue === "teachers" ? "#2e7d32" : "#fff",
                color: activeBtnValue === "teachers" ? "#fff" : "#014201",
              }}
              value="teachers"
              onClick={() => setActiveBtnValue("teachers")}
            >
              Teachers
            </ToggleButton>

            <ToggleButton
              size="small"
              sx={{
                //   "&:hover": { backgroundColor: "#014201", color: "#fff" },
                //   backgroundColor:
                //     activeBtnValue === "students" ? "#014201" : "white",
                //   color: activeBtnValue === "students" ? "#fff" : "#014201",
                "&:hover": { color: "#014201" },
                backgroundColor:
                  activeBtnValue === "students" ? "#2e7d32" : "#fff",
                color: activeBtnValue === "students" ? "#fff" : "#014201",
              }}
              value="students"
              onClick={() => setActiveBtnValue("students")}
            >
              Students
            </ToggleButton>
          </ToggleButtonGroup>
          <AddUserDialog classesArray={currentUser?.classes} />
        </Box>
      ) : (
        ""
      )}
      {users?.length > 0 ? (
        <MuiTable tableBody={tableBody} curUser={currentUser} />
      ) : users.length === 0 ? (
        <Box
          width="100%"
          pb={0.1}
          pt={14}
          px={1}
          // textAlign="center"
          display="flex"
          justifyContent={"space-around"}
          sx={{
            boxShadow: 2,
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" color="#014201" mb={2}>
            Currently No User.
          </Typography>
          <AddUserDialog classesArray={currentUser?.classes} />
        </Box>
      ) : (
        <SubSpinner />
      )}
    </Box>
  );
};
export default Users;
