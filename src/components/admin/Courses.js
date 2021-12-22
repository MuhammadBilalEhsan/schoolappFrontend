import React from 'react'
import { useSelector } from 'react-redux'
import CourseBox from './CourseBox'
import AddBox from './AddBox'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"

const Courses = () => {
    const allCourses = useSelector(state => state.usersReducer.allCourses)

    return (
        <Box width="100%"
        >
            <Box maxWidth="1000px" mx="auto"
                p={2}
            >
                <Grid container spacing={2}>
                    {
                        allCourses?.length > 0 ?
                            allCourses.map((course, index) => {
                                return (
                                    <Grid
                                        key={index}
                                        item xs={12} sm={6} lg={4}
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
            </Box>
        </Box>
    )
}

export default Courses