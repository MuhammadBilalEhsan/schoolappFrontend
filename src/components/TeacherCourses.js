import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import MuiSnacks from './MuiSnacks';
import { useSelector } from 'react-redux';
import AddCourse from './AddCourse';
import { useHistory } from 'react-router-dom';

const TeacherCourses = ({ currentUser }) => {
    const course = useSelector((state) => state.usersReducer.course);

    // const [loadBtn, setLoadBtn] = useState(false);
    const [openSnack, setOpenSnack] = useState("");
    const [severity, setSeverity] = useState("");

    const history = useHistory()
    // dispatch(getCourseFunc(myCourse.data.course))
    useEffect(() => {
    }, [currentUser, course])
    return (
        <Box width="100%" minHeight="90vh"
            sx={{ backgroundColor: "#f6f6f6" }}
            display="flex" justifyContent="center" alignItems="flex-start"
        >
            {openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}
            {
                Object.values(course).length ?
                    <Box
                        width={{ xs: "90%", sm: "600px" }}
                        mx={2} mt={4} px={3} pt={"50px"} pb={2}
                        sx={{ backgroundColor: "#fff", boxShadow: 2 }}
                    >
                        <Typography color="darkgreen" variant="h4" mb={1}>
                            {course?.courseName}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <ShowField title="Course Name" value={course?.courseName} />
                        <ShowField title="Course Description" value={course?.courseDesc} />
                        <ShowField title="Topics" value=
                            {
                                course?.topics.map(topic => {
                                    return (
                                        <Tooltip key={topic.key} title={topic.label}
                                            arrow
                                        >
                                            <Chip
                                                sx={{
                                                    ml: 1, cursor: "pointer", mb: 1,
                                                    "&:hover": { backgroundColor: "#2e7d32", color: "#fff" }
                                                }}
                                                color='success'
                                                label={topic.label.length < 22 ? topic.label :
                                                    `${topic.label.substr(0, 21)}...`
                                                }
                                                variant="outlined" />
                                        </Tooltip>
                                    )
                                })
                            }
                        />
                        <ShowField title="Class" value={course?.teacherClass} />
                        <ShowField title="Duration" value={course?.duration} />
                        <ShowField title="Course Outline" value={course?.courseOutline} />
                        <ShowField title="Students" value={course?.students?.length > 0 ? course.students.length : "0"} />
                        <ShowField title="Assignments" value={course?.assignments?.length > 0 ? course.assignments.length : "0"} />
                        <Box width="100%" mt={2} display="flex" justifyContent="flex-end">
                            <AddCourse
                                curUser={currentUser}
                                editCourse={true}
                                course={course}
                                setSeverity={setSeverity}
                                setOpenSnack={setOpenSnack}
                            />
                            <Button
                                onClick={() => history.push(`/${course?._id}`)}
                                sx={{ ml: 2 }}
                                variant="contained"
                                color="success"
                            >
                                Go to Course
                            </Button>
                        </Box>
                    </Box>
                    :
                    <Box
                        width={{ xs: "90%", sm: "600px" }}
                        mx={2} mt={4} px={3} pt={"50px"} pb={2}
                        sx={{ backgroundColor: "#fff", boxShadow: 2 }}
                        display="flex" justifyContent={{ xs: "center", md: "space-between" }}
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems="center"
                    >
                        <Typography variant="h6" color="darkgreen" textAlign="center" sx={{ mb: 2 }}>
                            Currently You Have No Course.
                        </Typography>
                        <AddCourse
                            curUser={currentUser}
                            editCourse={false}
                            course={course}
                            setSeverity={setSeverity}
                            setOpenSnack={setOpenSnack}
                        />
                    </Box>
            }
        </Box >
    )
}

const ShowField = ({ title, value }) => {
    return (
        <Box width="100%" display="flex" flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            sx={{
                backgroundColor: "#f6f6f6", boxShadow: 1, borderRadius: 1,
                cursor: "pointer", "&:hover": { backgroundColor: "#dfdddd" }
            }}
            py={1} px={3} mt={2}
        >
            <Typography color="#000" width={{ xs: "100%", sm: "30%" }}
            >{title}:</Typography>

            <Typography color="darkgreen" width={{ xs: "100%", sm: "60%" }}
                variant="subtitle1"
                sx={{
                    display: "flex", justifyContent: "flex-start",
                    flexWrap: "wrap", ml: { xs: 2, sm: 1 },
                    // wordBreak: "break-all"
                }}
            >
                <b>{value}</b>
            </Typography>
        </Box >
    )
}

export default TeacherCourses
