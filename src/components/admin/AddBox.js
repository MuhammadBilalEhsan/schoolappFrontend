import React from 'react'
import { HiPlus } from "react-icons/hi"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Tooltip from "@mui/material/Tooltip"
import Button from '@mui/material/Button'

const AddBox = ({ title }) => {
    return (
        <Tooltip title={title || "Title"}>

            <Box
                // p="80px 50px"
                width="100%"
                display="flex"
                flexDirection={"column"}
                justifyContent="center"
                alignItems="center"
                sx={{
                    // backgroundColor: "red",
                    boxShadow: 1,
                }}
            >
                <HiPlus size="80px" color="#014201" style={{ margin: "32px 0px" }} />
                <Divider />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#014201",
                        "&:hover": { backgroundColor: "#021002" }
                    }}
                    fullWidth
                >
                    Add Class
                </Button>
            </Box>
        </Tooltip>
    )
}

export default AddBox
