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
        >
            <Box p={2}>
                <Typography variant="subtitle1" color="#014201"
                    pl={4}>
                    <strong>
                        Name:
                    </strong>
                    <br />
                    <span style={{ marginLeft: "32px" }}
                    >
                        {courseName}
                    </span>
                </Typography>
                <Typography variant="subtitle1" color="#014201"
                    pl={4}>
                    <strong>
                        Duration:
                    </strong>
                    <br />
                    <span style={{ marginLeft: "32px" }}
                    >
                        {duration} Week/Weeks
                    </span>
                </Typography>
                <Typography variant="subtitle1" color="#014201"
                    pl={4}>
                    <strong>
                        Assignments:
                    </strong>
                    <span style={{ marginLeft: "16px" }}
                    >
                        {assignments.length > 0 ? assignments.length : "0"}
                    </span>
                    {/* <br />
                <span style={{ marginLeft: "52px" }}
                >
                {assignments.length > 0 ? assignments.length : "0"}
                </span> */}
                </Typography>
                <Typography variant="subtitle1" color="#014201"
                    pl={4}>
                    <strong>
                        Students:
                    </strong>
                    <span style={{ marginLeft: "16px" }}
                    >
                        {students.length > 0 ? students.length : "0"}
                    </span>
                </Typography>
            </Box>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "#014201", py: 1.5,
                    "&:hover": { backgroundColor: "#021002" }
                }}
                fullWidth
            >
                View Course
            </Button>
        </Box >
    )
}

export default CourseBox
