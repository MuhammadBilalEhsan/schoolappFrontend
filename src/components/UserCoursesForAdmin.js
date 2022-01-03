import React, { useEffect, useState } from 'react'
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import CourseBox from './admin/CourseBox'
import { useSelector } from 'react-redux'

const UserCoursesForAdmin = ({ allCourses, user }) => {

    const [userCourses, setUserCourses] = useState(null)

    useEffect(() => {
        const filterCoursesArray = [];
        if (user?.roll === "teacher") {
            let filtering = allCourses?.map(course => {
                if (course.teacher_id === user?._id) {
                    filterCoursesArray.push(course)
                }
            })
            setUserCourses(filterCoursesArray)
        }
        if (user?.roll === "student") {
            let filtering = allCourses?.map(course => {
                if (course.students.length) {
                    let nestedFiltering = course.students.filter(student => {
                        if (student.id === user?._id) {
                            filterCoursesArray.push(course)
                        }
                    })
                    setUserCourses(filterCoursesArray)
                }
            })
        }
    }, [allCourses, user])

    return (
        <>
            <Divider sx={{ width: "97%", mx: "auto", mt: 1 }} />
            <Box maxWidth="1024px"
            >
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        borderRadius: 1,
                        boxShadow: 1
                    }}
                    mt={2}
                    width="100%" p={2}
                    display="flex"
                    justifyContent="flex-start"
                    flexWrap="wrap" gap="12px"
                >
                    {

                        userCourses?.length > 0 ?
                            <Box>
                                <Typography variant="h5" color="#014201" mb={2}>
                                    {user?.roll === "teacher" ?
                                        `${user?.fname}'s Creation Courses...` :
                                        user?.roll === "student" ?
                                            `${user?.fname}'s enrolled courses...` : ""
                                    }
                                </Typography>
                                <Divider sx={{ mb: 1 }} />

                                {
                                    userCourses.map((course, index) => {
                                        return (
                                            <CourseBox course={course} key={index} />
                                        )
                                    })
                                }
                            </Box>
                            :
                            <Box width="100%" pt={3} textAlign="center">
                                <Typography variant="h5" color="#014201">
                                    {user?.roll === "teacher" ?
                                        `No Course Added By ${user?.fname}...` :
                                        user?.roll === "student" ?
                                            `${user?.fname} currently not enrolled in any course...` : ""
                                    }
                                </Typography>
                            </Box>

                    }

                </Box>
            </Box>
        </>
    )
}

export default UserCoursesForAdmin
