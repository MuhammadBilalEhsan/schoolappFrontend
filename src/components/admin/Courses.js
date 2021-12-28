import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CourseBox from './CourseBox'
// import AddBox from './AddBox'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const Courses = () => {
    const allCourses = useSelector(state => state.usersReducer.allCourses)
    return (
        <Box width="100%"
        >
            <Box maxWidth="1000px" mx="auto"
                pt={2} pl={1} display="flex"
                justifyContent="flex-start"
                flexWrap="wrap" gap="12px"
            >
                {/* <Grid container spacing={2} */}
                {/* {
                    allCourses?.length > 0 ?
                        allCourses.map((course, index) => {
                            return (
                                <CourseBox course={course} key={index} />
                            )
                        }) :
                        <Box width="100%" pt={14} textAlign="center">
                            <Typography variant="h5" color="#014201">
                                Currently No Course Available
                            </Typography>
                        </Box>
                } */}
                {/* </Grid> */}

            </Box>
        </Box>
    )
}

export default Courses