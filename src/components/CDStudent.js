import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Box, Typography, } from "@mui/material"
import CourseAcc from './CourseAcc'
import TabsComp from './TabsComp'
import StudentTab2 from './StudentTab2'
import axios from 'axios'
import MuiSnacks from './MuiSnacks'
import appSetting from '../appSetting/appSetting'

const CDStudent = ({ curUser, courses, setAuth }) => {
    const [removedByTeacherState, setRemovedByTeacherState] = useState(true)

    const [openSnack, setOpenSnack] = useState("");
    const [severity, setSeverity] = useState("");

    const CDstudentStartFunction = async () => {
        try {
            const deleteCoursesIDsArr = curUser?.courses?.filter(course =>
                course.removedByTeacher === true)
            // .map(course => course.id)

            if (deleteCoursesIDsArr) {
                await axios.post(`${appSetting.severHostedUrl}/course/delcoursefromstudent`, { id: curUser?._id })
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
    }, [])
    return (
        <Box className="_main" >
            <Header curUser={curUser} setAuth={setAuth} />
            <Box width="100%">
                {openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}
                <Box mx="auto" mt={2} maxWidth="800px" display="flex" flexDirection="column" justifyContent="center" >
                    <TabsComp
                        tab1Label="Available Courses"
                        panel1={<Box width="100%" mt={4.2}>
                            <Box mb={2} display="flex" justifyContent="space-between" pb={1} px={2} borderBottom="1.5px solid #009c0052" width="100%" >
                                <Typography variant="h4" color="green">
                                    Available Courses
                                </Typography>
                            </Box>
                            {
                                courses?.length > 0 && curUser?.atClass ?
                                    courses?.map((curElem, ind) => {
                                        return <CourseAcc
                                            setOpenSnack={setOpenSnack}
                                            setSeverity={setSeverity}
                                            key={ind}
                                            curElem={curElem}
                                            curUser={curUser}
                                        />
                                    }) : !curUser?.atClass ? <Box pt={9} width="100%"
                                        textAlign="center"
                                    >
                                        <Typography variant="h6" color="green">
                                            Please Set Your class to get Available Courses..
                                        </Typography>
                                    </Box>
                                        : <Box pt={9} width="100%"
                                            textAlign="center"
                                        >
                                            <Typography variant="h6" color="green">
                                                Currently No Course Available...
                                            </Typography>
                                        </Box>
                            }
                        </Box>}

                        tab2Label="Enrolled Courses"
                        panel2={
                            <Box width="100%" mt={3}>
                                <Box mb={2} display="flex" justifyContent="space-between" pb={1} px={2} borderBottom="1.5px solid #009c0052" width="100%" >
                                    <Typography variant="h4" color="green">
                                        Enrolled Courses
                                    </Typography>
                                </Box>
                                <Box>
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
                                </Box>
                            </Box>
                        }
                    />
                </Box>
            </Box>
        </Box>
    )
}
export default CDStudent
