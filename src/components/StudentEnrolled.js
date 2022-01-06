import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useSelector } from 'react-redux';

import MuiSnacks from './MuiSnacks';
import StudentTab2 from './StudentTab2';

import axios from 'axios';
import appSetting from '../appSetting/appSetting';

const LS = JSON.parse(localStorage.getItem("me"))

const StudentEnrolled = ({ curUser }) => {
    const courses = useSelector((state) => state.usersReducer.studentCourse);

    const [removedByTeacherState, setRemovedByTeacherState] = useState(true)
    const [openSnack, setOpenSnack] = useState("");
    const [severity, setSeverity] = useState("");


    const CDstudentStartFunction = async () => {
        try {
            const deleteCoursesIDsArr = curUser?.courses?.filter(course =>
                course.removedByTeacher === true)
            // .map(course => course.id)

            if (deleteCoursesIDsArr) {
                await axios.post(`${appSetting.severHostedUrl}/course/delcoursefromstudent`, { id: curUser?._id }, { headers: { Authentication: `Bearer ${LS?.token}` } })
                setTimeout(() => {
                    setRemovedByTeacherState(false)
                }, 60000);
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        CDstudentStartFunction()
    }, [courses])
    return (
        <Box width="100%">
            {openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}

            <Box maxWidth="900px"
                m="32px auto 16px"
            >
                <Typography variant="h4" color="darkgreen"
                    mb={2}
                >
                    Enrolled Courses
                </Typography>

                <Divider />
                {
                    curUser?.courses?.length > 0 ?
                        curUser?.courses.map((curCor, ind) => {
                            return (
                                curCor.removedByTeacher &&
                                    removedByTeacherState ? <Box
                                        key={ind}
                                        width="100%"
                                        textAlign="center"
                                        mt={1} py={2}
                                        sx={{
                                            borderRadius: 1,
                                            backgroundColor: "#ff0000d1",
                                            "&:hover": { boxShadow: 3, cursor: "pointer" }
                                        }}
                                    >
                                    <Typography variant="body1" color="white">
                                        You Were Removed from "{curCor.name}"
                                    </Typography>
                                </Box>
                                    : <StudentTab2
                                        curCor={curCor}
                                        key={ind}
                                        ind={ind}
                                    />
                            )
                        }) : <Box pt={9} width="100%"
                            textAlign="center"
                        >
                            <Typography variant="h6" color="green">
                                Currently Not Enrolled In Any Course...
                            </Typography>
                        </Box>
                }
            </Box >
        </Box >
    )
}

export default StudentEnrolled
