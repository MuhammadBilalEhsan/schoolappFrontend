import React from "react"
import { Box, Avatar, TextField } from "@mui/material"
import { AiOutlineSend } from "react-icons/ai"

const SendingMessageInputComp = ({ userName, autoFocus, placeholder, value, setValue, name, color, submitFunc, type }) => {
    return (
        <Box sx={{ width: "100%", borderRadius: "7.5px", marginTop: 1, marginBottom: 2, justifySelf: "flex-end", padding: "1rem 1.5rem", border: "1.8px solid #00000033" }}>
            <Box width="100%">
                <Box display="flex" justifyContent="center">
                    <Box width="65px" >
                        <Avatar sx={{ bgcolor: "green", textTransform: "capitalize" }}>{userName}</Avatar>
                    </Box>
                    <Box flexGrow={1}>
                        <TextField
                            autoFocus={autoFocus}
                            name={name}
                            type={type}
                            placeholder={placeholder}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            autoComplete="off"
                            fullWidth
                            multiline
                            color={color}
                            InputProps={{
                                endAdornment: (<AiOutlineSend onClick={(e) => submitFunc(e)} size="26px" color="green" style={{ margin: "auto 1 0 0" }} />)
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SendingMessageInputComp