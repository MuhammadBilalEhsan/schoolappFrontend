import React from "react"
import { Box, Avatar, Typography } from "@mui/material"

const MessageBox = ({ color, timeColor, nameFirestLetter, name, time, message }) => {

    return (
        <Box sx={{ width: "100%", borderRadius: "7.5px", marginTop: 3, padding: "1rem 1.5rem", border: "1.8px solid #00000033" }}>
            <Box width="100%">
                <Box display="flex" justifyContent="center">
                    <Box width="65px" >
                        <Avatar sx={{ bgcolor: color, textTransform: "capitalize" }}>{nameFirestLetter}</Avatar>
                    </Box>
                    <Box flexGrow={1}>
                        <Typography variant="subtitle1" color={color} sx={{ textTransform: "capitalize" }}><b>{name}</b></Typography>
                        <Typography variant="body2" color={timeColor}> {time}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box width="100%" mt={2} sx={{ wordWrap: "break-word", paddingLeft: 5 }}>
                <Typography variant="subtitle2">{message}</Typography>
            </Box>
        </Box>
    )
}

export default MessageBox