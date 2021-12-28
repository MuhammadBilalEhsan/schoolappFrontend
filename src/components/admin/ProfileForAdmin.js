import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import defaultDP from "../../images/defaultDP.jpg"
import MarkAttendance from '../MarkAttendance'
import BarChart from '../BarChart'
import CourseBox from './CourseBox'


const ProfileForAdmin = () => {
    const { search } = useLocation()
    const users = useSelector(state => state.usersReducer.users)
    const allCourses = useSelector(state => state.usersReducer.allCourses)
    const [user, setUser] = useState({})
    useEffect(() => {
        if (search) {
            const userID = search.split("?")[1]
            const findUser = users?.find(user => user._id === userID)
            if (findUser) {
                setUser(findUser)
            }
        }
    }, [])
    return (
        <Box
            sx={{
                backgroundColor: "#00000009",
            }}
            p={2}
        >
            <Box
                width="100%"
                display="flex"
                justifyContent="center"
                gap={2}
            >
                <Box width="280px"
                    sx={{
                        backgroundColor: "#fff",
                        borderRadius: 1,
                        boxShadow: 1,

                    }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    py={3}
                >
                    <Avatar
                        src={user?.dp ? user?.dp : defaultDP}
                        alt={user?.fname}
                        sx={{ width: "200px", height: "200px", border: "1px solid green", mb: 2 }}
                    />
                    <MyTypography text={user?.email} />
                    <MyTypography title="Name:" text={`${user?.fname} ${user?.lname || "-"}`} />
                    <MyTypography title="Age:" text={user?.age || "-"} />
                    <MyTypography title="Class:" text={user?.atClass || "-"} />
                    <MyTypography title="Son Of:" text={user?.fatherName || "-"} />
                    <MyTypography title="Phone" text={user?.phone || "-"} />
                    <MyTypography title="Role:" text={user?.roll || "-"} />
                </Box>
                <Box flexGrow={1}>
                    <Box width="100%">
                        <MarkAttendance />
                    </Box>
                    <Box width="100%">
                        <BarChart attendance={user?.attendance} />
                    </Box>
                </Box>
            </Box >
            <Divider sx={{ width: "97%", mx: "auto" }} />
            <Box maxWidth="1024px"
            >
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        borderRadius: 1,
                    }}
                    mt={2}
                    width="100%"
                    pt={2} pl={1} display="flex"
                    justifyContent="flex-start"
                    flexWrap="wrap" gap="12px"
                >
                    {
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
                    }

                </Box>
            </Box>
        </Box >
    )
}

const MyTypography = ({ text, title }) => {
    return (
        <Typography variant="subtitle1"
            sx={{
                width: "240px",
                py: 1,
                px: 2,
                boxShadow: 1,
                display: "flex",
                justifyContent: title ? "space-between" : "center",
                textAlign: "center",
                borderRadius: 1,
                cursor: "pointer",
                backgroundColor: "#00000009",
                mb: 1
            }}
        >
            {
                title ?
                    <>
                        <span><b>{title}</b></span>
                        <span style={{ color: "#2e7d32" }}><b>{text}</b></span>
                    </> : <span style={{ color: "#2e7d32" }}><b>{text}</b></span>
            }
        </Typography>
    )
}

export default ProfileForAdmin
