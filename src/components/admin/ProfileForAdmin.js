import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import defaultDP from "../../images/defaultDP.jpg"
import MarkAttendance from '../MarkAttendance'
import BarChart from '../BarChart'
import UserCoursesForAdmin from '../UserCoursesForAdmin'
import ChangeProfilePic from '../ChangeProfilePic'
import MuiSnacks from '../MuiSnacks'


const ProfileForAdmin = ({ curUser }) => {
    const { search } = useLocation()
    const users = useSelector(state => state.usersReducer.users)
    const allCourses = useSelector(state => state.usersReducer.allCourses)
    const [openSnack, setOpenSnack] = useState("");
    const [severity, setSeverity] = useState("");
    const [user, setUser] = useState({})
    const [imgURL, setImgURL] = useState()
    useEffect(() => {
        let findUser;
        if (search) {
            const userID = search.split("?")[1]
            findUser = users?.find(user => user._id === userID)
            if (findUser) {
                setUser(findUser)
                setImgURL(findUser?.dp)
            }
        }
        if (!curUser?.isAdmin) {
            setUser(curUser)
            setImgURL(curUser?.dp)
        }
    }, [])
    return (
        <Box
            sx={{
                backgroundColor: "#00000009",
            }}
            width="100%"
            // p={"16px 16px 16px 32px"}
            p={4}
        >
            {openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}
            <Grid
                // component={Grid}
                container
                // width="100%"
                // display="flex"
                // justifyContent="center"
                spacing={{ md: 2 }}
            // pl={0}
            // gap={2}
            >
                <Grid
                    //  width="280px"
                    // component={Grid}
                    item
                    xs={12} md={5}
                    sx={{
                        backgroundColor: "#fff",
                        borderRadius: 1,
                        boxShadow: 1,
                        pl: "0!important"
                    }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    // py={3}
                    // pl="0px"
                    my={2}
                >
                    <Avatar
                        src={imgURL || defaultDP}
                        alt={user?.fname}
                        sx={{ width: "200px", height: "200px", border: "1px solid green", mb: 2 }}
                    />
                    {
                        !curUser?.isAdmin ?
                            <Box
                                // width="100%"
                                display="flex"
                                justifyContent="center"
                                position="relative"
                                bottom="27px"
                                zIndex={1}
                            >
                                <ChangeProfilePic
                                    curUser={curUser}
                                    setImgURL={setImgURL}
                                    setSeverity={setSeverity}
                                    setOpenSnack={setOpenSnack}
                                />
                            </Box>
                            : ""
                    }
                    <MyTypography text={user?.email} />
                    <MyTypography title="Name:" text={`${user?.fname} ${user?.lname || "-"}`} />
                    <MyTypography title="Age:" text={user?.age || "-"} />
                    <MyTypography title="Class:" text={user?.atClass || "-"} />
                    <MyTypography title="Son Of:" text={user?.fatherName || "-"} />
                    <MyTypography title="Phone" text={user?.phone || "-"} />
                    <MyTypography title="Role:" text={user?.roll || "-"} />
                </Grid>
                <Grid
                    // component={Grid}
                    item
                    // flexGrow={1}
                    xs={12} md={7}
                >
                    {
                        !curUser?.isAdmin ?
                            <Box width="100%">
                                <MarkAttendance curUser={curUser} />
                            </Box> : ""
                    }
                    <Box width="100%">
                        <BarChart attendance={user?.attendance} />
                    </Box>
                </Grid>
            </Grid >
            {
                curUser?.isAdmin ?
                    <UserCoursesForAdmin user={user} allCourses={allCourses} /> : ""
            }
        </Box >
    )
}

const MyTypography = ({ text, title }) => {
    return (
        <Typography variant="subtitle1"
            sx={{
                width: "80%",
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
