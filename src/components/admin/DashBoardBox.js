import React, { useEffect } from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useSelector } from 'react-redux'
import { FaUsers, FaUsersSlash } from "react-icons/fa"
import { ImBooks } from "react-icons/im"
import { GiClassicalKnowledge } from "react-icons/gi"
import { Link } from "react-router-dom"

const DashBoardBox = ({ currentUser }) => {
    const allCourses = useSelector(state => state.usersReducer.allCourses)
    const users = useSelector(state => state.usersReducer.users)
    const blocked = users?.filter(user => user.blocked === true)
    useEffect(() => {

    }, [allCourses, users])
    return (
        <Box minWidth="400px" minHeight="100vh" px={2} sx={{ backgroundColor: "#185c1817" }}>
            <Box width="100%" display="flex" alignItems="center" justifyContent={"space-around"} flexWrap={"wrap"}>


                <Box
                    component={Link} to="/users" width="400px" mt="70px" p={3} textAlign="center" sx={{
                        boxShadow: 3, borderRadius: "2px", textDecoration: "none",
                        "&:hover": { cursor: "pointer", boxShadow: 2 }
                    }}>
                    <FaUsers size="72px" color="darkgreen" />
                    <Typography variant="h5" mt={1.5} color="darkgreen">
                        Users
                        ({users?.length > 0 ? users.length : "0"})
                    </Typography>
                </Box>
                <Box
                    component={Link} to="/classes" width="400px" mt="70px" p={3} textAlign="center" sx={{
                        boxShadow: 3, borderRadius: "2px", textDecoration: "none",
                        "&:hover": { cursor: "pointer", boxShadow: 2 }
                    }}>
                    <GiClassicalKnowledge size="72px" color="darkgreen" />
                    <Typography variant="h5" mt={1.5} color="darkgreen">
                        Classes ({currentUser?.classes?.length ? currentUser.classes.length : "0"})
                    </Typography>
                </Box>
            </Box >
            <Box width="100%" display="flex" alignItems="center" justifyContent={"space-around"} flexWrap={"wrap"}>
                <Box
                    component={Link} to="/courses" width="400px" mt="70px" p={3} textAlign="center" sx={{
                        boxShadow: 3, borderRadius: "2px", textDecoration: "none",
                        "&:hover": { cursor: "pointer", boxShadow: 2 }
                    }}>
                    <ImBooks size="72px" color="darkgreen" />
                    <Typography variant="h5" mt={1.5} color="darkgreen">
                        Courses
                        ({allCourses?.length > 0 ? allCourses.length : 0})
                    </Typography>
                </Box>
                <Box
                    component={Link} to="/blocked" width="400px" mt="70px" p={3} textAlign="center" sx={{
                        boxShadow: 3, borderRadius: "2px", textDecoration: "none",
                        "&:hover": { cursor: "pointer", boxShadow: 2 }
                    }}>
                    <FaUsersSlash size="72px" color="red" />
                    <Typography variant="h5" mt={1.5} color="red">
                        Blocked
                        ({blocked?.length > 0 ? blocked.length : 0})
                    </Typography>
                </Box >
            </Box >
        </Box >
    )
}

export default DashBoardBox