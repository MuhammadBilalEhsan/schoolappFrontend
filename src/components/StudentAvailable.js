import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useSelector } from 'react-redux';

import MuiSnacks from './MuiSnacks';
import CourseAcc from './CourseAcc';

const StudentAvailable = ({ curUser }) => {
    const courses = useSelector((state) => state.usersReducer.studentCourse);

    const [openSnack, setOpenSnack] = useState("");
    const [severity, setSeverity] = useState("");


    useEffect(() => {

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
                    Available Courses
                </Typography>

                <Divider />
                {
                    courses?.length > 0 ?
                        courses?.map((curElem, ind) => {
                            return <CourseAcc
                                setOpenSnack={setOpenSnack}
                                setSeverity={setSeverity}
                                key={ind}
                                curElem={curElem}
                                curUser={curUser}
                            />
                        })
                        : <Box pt={9} width="100%"
                            textAlign="center"
                        >
                            <Typography variant="h6" color="green">
                                Currently No Course Available...
                            </Typography>
                        </Box>
                }
            </Box >
        </Box >
    )
}

export default StudentAvailable
