import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem"
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { HiDotsHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
import AddUserDialog from "./AddUserDialog";

const ClassBox = ({ title, currentUser }) => {
  const users = useSelector((state) => state.usersReducer.users);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [teachers, setTeachers] = useState(null);
  const [students, setStudents] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let classUsers = users?.filter((user) => user.atClass === title);
    let allTeachers = classUsers?.filter((user) => user.roll === "teacher");
    let allStudents = classUsers?.filter((user) => user.roll === "student");
    setTeachers(allTeachers);
    setStudents(allStudents);
  }, [title]);
  return (
    <Box
      width="100%"
      textAlign="center"
      sx={{
        backgroundColor: "#f6f6f6",
        cursor: "pointer",
        borderRadius: 1,
        boxShadow: 1,
        "&:hover": {
          backgroundColor: "#efefef",
        },
      }}
    >
      <Box p="28px 40px 10px">
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="subtitle1" color="#021002">
            <strong>Class Name:</strong>
          </Typography>
          <Typography variant="subtitle1" color="#2e7d32">
            <strong>{title}</strong>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="subtitle1" color="#021002">
            <strong>Teachers:</strong>
          </Typography>
          <Typography variant="subtitle1" color="#2e7d32">
            <strong>{teachers?.length > 0 ? teachers.length : 0}</strong>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="subtitle1" color="#021002">
            <strong>Students:</strong>
          </Typography>
          <Typography variant="subtitle1" color="#2e7d32">
            <strong>{students?.length > 0 ? students.length : 0}</strong>
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" p="8px 35px">
        <Tooltip title="Actions" arrow>
          <IconButton
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <HiDotsHorizontal size="18px" color="black" />
          </IconButton>
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {/* <MenuItem>View Users</MenuItem> */}
          <AddUserDialog title={title} classesArray={currentUser?.classes} />
        </Menu>
      </Box>
    </Box>
  );
};

export default ClassBox;
