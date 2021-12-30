
import React from 'react'
import { useSelector } from 'react-redux'
import CourseBox from './CourseBox'
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

const Courses = () => {
    const allCourses = useSelector(state => state.usersReducer.allCourses)
    return (
        <Box width="100%" minHeight="100vh" p={2}
            sx={{ backgroundColor: "#f6f6f6" }}
        >
            <Grid
                container width="100%"
                m="0px" direction="row" spacing={2}
                sx={{ backgroundColor: "#fff", boxShadow: 2 }}
                pr={2} pb={2}
            >
                {
                    allCourses?.length > 0 ?
                        allCourses.map((course, index) => {
                            return (
                                <Grid key={index}
                                    item xs={12} md={6} lg={4}
                                >
                                    <CourseBox course={course} />
                                </Grid>
                            )
                        }) :
                        <Box width="100%" pt={14} textAlign="center">
                            <Typography variant="h5" color="#014201">
                                Currently No Course Available
                            </Typography>
                        </Box>
                }
            </Grid>
        </Box >

    )
}

export default Courses