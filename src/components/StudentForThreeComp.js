import React from 'react'
import { Box, Avatar, Typography } from "@mui/material"
const StudentForThreeComp = ({ submitted }) => {

    return (
        <Box width="100%" mx={1} mb={1} sx={{ backgroundColor: "#fff", boxShadow: 2, "&:hover": { cursor: "pointer", boxShadow: 4, backgroundColor: "#0080000c" }, borderRadius: "12px", padding: "1rem 0px 1rem 1.5rem" }}>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Box width="65px" >
                    <Avatar sx={{ bgcolor: "green", textTransform: "capitalize" }}>{submitted?.name[0]}</Avatar>
                </Box>
                <Box flexGrow={1}>
                    <Typography variant="h6" color="#0000009c" sx={{ color: "green", cursor: "pointer" }}>{submitted?.name}</Typography>
                </Box>

                <Typography mr={2} variant="body1">{Math.round(submitted?.marks)} Marks</Typography>

            </Box>
        </Box>
    )
}

export default StudentForThreeComp
