import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import defaultDP from "../../images/defaultDP.jpg"

const ProfileForAdmin = () => {
    const { search } = useLocation()
    const users = useSelector(state => state.usersReducer.users)
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
            width="100%" p={2}
            sx={{
                // backgroundColor: "blue" ,
                backgroundColor: "#00000009",
            }}
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
        </Box >
    )
}

const MyTypography = ({ text, title }) => {
    return (
        <Typography variant="subtitle1"
            sx={{
                width: "240px",
                backgroundColor: "white",
                py: 1,
                px: 2,
                boxShadow: 1,
                display: "flex",
                justifyContent: title ? "space-between" : "center",
                textAlign: "center",
                borderRadius: 1,
                cursor: "pointer",
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
