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
  const [role, setRole] = useState("");
  const [activeBtnValue, setActiveBtnValue] = useState("all");

  const users = useSelector((state) => state.usersReducer.users);
  const teachers = users?.filter((user) => user?.roll === "teacher");
  const students = users?.filter((user) => user?.roll === "student");

  const handleChange = (event, value) => {
    if (value === "teachers") {
      setTableBody(teachers);
      setRole("teacher");
    } else if (value === "students") {
      setTableBody(students);
      setRole("student");
    } else {
      setRole("");
      setTableBody(users);
    }
  };
  useEffect(() => {
    setTableBody(users);
    if (activeBtnValue === "teachers") {
      setTableBody(teachers);
      // setRole("teacher");
    } else if (activeBtnValue === "students") {
      setTableBody(students);
      // setRole("student");
    }
  }, [users]);
  // useEffect(() => {}, [activeBtnValue]);
  return (
    <Box
      width="100%"
      p={2}
      minHeight="88vh"
      sx={{ backgroundColor: users?.length > 0 ? "#fff" : "#f6f6f6" }}
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
                "&:hover": { color: "#fff", backgroundColor: "#1b5e20" },
                backgroundColor: activeBtnValue === "all" ? "#2e7d32" : "#fff",
                color: activeBtnValue === "all" ? "#fff" : "#014201",
              }}
              value="all"
              onClick={() => {
                setActiveBtnValue("all");
                // setRole("");
              }}
            >
              All Users
            </ToggleButton>

            <ToggleButton
              size="small"
              sx={{
                "&:hover": { color: "#fff", backgroundColor: "#1b5e20" },
                backgroundColor:
                  activeBtnValue === "teachers" ? "#2e7d32" : "#fff",
                color: activeBtnValue === "teachers" ? "#fff" : "#014201",
              }}
              value="teachers"
              onClick={() => {
                setActiveBtnValue("teachers");
                // setRole("teacher");
              }}
            >
              Teachers
            </ToggleButton>

            <ToggleButton
              size="small"
              sx={{
                "&:hover": { color: "#fff", backgroundColor: "#1b5e20" },
                backgroundColor:
                  activeBtnValue === "students" ? "#2e7d32" : "#fff",
                color: activeBtnValue === "students" ? "#fff" : "#014201",
              }}
              value="students"
              onClick={() => {
                setActiveBtnValue("students");
                // setRole("student");
              }}
            >
              Students
            </ToggleButton>
          </ToggleButtonGroup>
          <AddUserDialog classesArray={currentUser?.classes} role={role} />
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
