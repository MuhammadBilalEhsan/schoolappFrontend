import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const CourseBox = ({ course }) => {
    const { courseName, duration, assignments, students } = course || {}
    return (
        <Box
            width="100%"
            sx={{
                boxShadow: 2,
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#0cff0017" }
            }}
            pt={2}
        >
            <Typography variant="subtitle1" color="#041d04"
                pl={4}>
                <strong>
                    Name:
                </strong>
                <br />
                <span style={{ marginLeft: "16px" }}
                >
                    {courseName}
                </span>
            </Typography>
            <Typography variant="subtitle1" color="#041d04"
                pl={4}>
                <strong>
                    Duration:
                </strong>
                <br />
                <span style={{ marginLeft: "16px" }}
                >
                    {duration} Week/Weeks
                </span>
            </Typography>
            <Typography variant="subtitle1" color="#041d04"
                pl={4}>
                <strong>
                    Assignments:
                </strong>
                <br />
                <span style={{ marginLeft: "16px" }}
                >
                    {assignments.length > 0 ? assignments.length : "0"}
                </span>
            </Typography>
            <Typography variant="subtitle1" color="#041d04"
                pl={4}>
                <strong>
                    Students:
                </strong>
                <br />
                <span style={{ marginLeft: "16px" }}
                >
                    {students.length > 0 ? students.length : "0"}
                </span>
            </Typography>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "#041d04",
                    "&:hover": { backgroundColor: "#021002" }
                }}
                fullWidth
            >
                View Course
            </Button>
        </Box>
    )
}

export default CourseBox
