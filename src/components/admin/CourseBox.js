import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

const CourseBox = ({ course }) => {
  const { courseName, duration, teacherName, students, _id } = course || {};
  const history = useHistory();
  // console.log("_id", _id)
  return (
    <Box
      width="100%"
      onClick={() => history.push(`/${_id}`)}
      sx={{
        boxShadow: 2,
        backgroundColor: "#00000009",
        borderRadius: 2,
        cursor: "pointer",
        "&:hover": { backgroundColor: "#0cff0017" },
      }}
    >
      <Box p={2}>
        <Box mb={1} display="flex" justifyContent="space-between">
          <Typography variant="subtitle1" color="#014201">
            <strong>Teacher:</strong>
          </Typography>
          <Typography variant="subtitle1">{teacherName}</Typography>
        </Box>
        <Box mb={1} display="flex" justifyContent="space-between">
          <Typography variant="subtitle1" color="#014201">
            <strong>Course Name:</strong>
          </Typography>
          <Typography variant="subtitle1">{courseName}</Typography>
        </Box>
        <Box mb={1} display="flex" justifyContent="space-between">
          <Typography variant="subtitle1" color="#014201">
            <strong>Duration:</strong>
          </Typography>
          <Typography variant="subtitle1">{duration} Weeks</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1" color="#014201">
            <strong>Students:</strong>
          </Typography>
          <Typography variant="subtitle1">
            {students.length > 0 ? students.length : "0"}
          </Typography>
        </Box>
        {/* _________ */}
      </Box>
      <Button
        color="success"
        variant="contained"
        sx={{
          py: 1.5,
          // backgroundColor: "#014201",
          // "&:hover": { backgroundColor: "#021002" }
        }}
        fullWidth
      >
        View Course
      </Button>
    </Box>
  );
};

export default CourseBox;
