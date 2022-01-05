import React, { useState } from 'react'
import { HiPlus } from "react-icons/hi"
import { BiAddToQueue } from "react-icons/bi"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import appSetting from '../../appSetting/appSetting'
import MuiSnacks from '../MuiSnacks'
// import { socket } from '../../App'
import { useDispatch } from 'react-redux'
import { curUserFun } from '../../redux/actions'


const AddBox = ({ setCurUser }) => {
    const [openInput, setOpenInput] = useState(false)
    const [classTitle, setClassTitle] = useState("")
    const [openSnack, setOpenSnack] = useState("");
    const [severity, setSeverity] = useState("");

    const dispatch = useDispatch()

    const toggleInput = () => {
        if (openInput) {
            setOpenInput(false)
        } else {
            setOpenInput(true)
        }
    }
    const addClass = async (e) => {
        e.preventDefault()
        const title = classTitle.trim().toLowerCase()
        if (!title) {
            setOpenSnack("Please write something")
            setSeverity("error")
        } else {
            try {
                const res = await axios.post(`${appSetting.severHostedUrl}/user/addclass`, { title }, { withCredentials: true })
                if (res) {
                    if (res.data.message) {
                        // socket.emit("changeInUser", res.data.user)
                        dispatch(curUserFun(res.data.user))
                        setCurUser(res.data.user)
                        setOpenSnack(res.data.message)
                        setSeverity("success")
                        setClassTitle("")
                        toggleInput()
                    }
                }
            } catch (error) {
                setOpenSnack(error?.response?.data?.error)
                setSeverity("error")
                setClassTitle("")
                toggleInput()
            }
        }

    }
    return (

        <Box>
            {openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}
            <Box
                // p="80px 50px"
                width="100%"
                display="flex"
                flexDirection={"column"}
                justifyContent="center"
                alignItems="center"
                onClick={toggleInput}
                sx={{
                    backgroundColor: "#f6f6f6",
                    cursor: "pointer",
                    boxShadow: 1, "&:hover": {
                        backgroundColor: "#efefef"
                    }
                }}
            >
                <HiPlus size="80px" color="#014201" style={{ margin: "32px 0px" }} />
                <Divider />
            </Box>
            {
                openInput ?
                    <form onSubmit={(e) => addClass(e)}>
                        <TextField
                            fullWidth autoFocus
                            placeholder='Add Class Name'
                            value={classTitle}
                            variant="standard"
                            color="success"

                            onChangeCapture={(e) => setClassTitle(e.target.value)}
                            sx={{ mt: "18px", }}
                            InputProps={{
                                maxLength: 16,
                                endAdornment: (<BiAddToQueue onClick={(e) => addClass(e)} size="26px" color="green" style={{ cursor: "pointer" }} />)
                            }}
                        />
                    </form>
                    : <Button
                        onClick={toggleInput}
                        variant="contained"
                        sx={{
                            py: "12px",
                            backgroundColor: "#014201",
                            "&:hover": { backgroundColor: "#021002" }
                        }}
                        fullWidth
                    >
                        Add Class
                    </Button>
            }
        </Box >
    )
}

export default AddBox