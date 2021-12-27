import React, { useState } from 'react';
import { Box, Typography, Avatar, Menu, MenuItem, Button } from '@mui/material';
import { FiMoreVertical } from "react-icons/fi";
import SendingMessageInputComp from "./SendingMessageInputComp";
import moment from "moment";
import axios from "axios";
import { socket } from '../App';
import MuiSnacks from './MuiSnacks';
import appSetting from '../appSetting/appSetting';


const CourseStudentsComp = ({ currentCourse, curUser, isAdmin }) => {
    const [courseStudents, setCourseStudents] = useState(currentCourse?.students);
    const [anchorEl, setAnchorEl] = useState(null);
    const [message, setMessage] = useState("");
    const [studentID, setStudentID] = useState("");
    const [studentName, setStudentName] = useState("");

    const [openSnack, setOpenSnack] = useState("");
    const [severity, setSeverity] = useState("");
    const open = Boolean(anchorEl);

    const { _id, fname, lname } = curUser || {}

    const handleClick = (event) => {
        setStudentID("")
        setMessage("")
        setStudentName("")
        setAnchorEl(event.currentTarget);
    };
    const removeStudentFunc = async (id) => {
        try {
            const reqObj = { studentID: id, courseID: currentCourse?._id }
            const res = await axios.post(`${appSetting.severHostedUrl}/course/delspecificstudent`, reqObj)
            if (res) {
                if (res.data.message) {
                    socket.emit("changeInCourse", res.data.course)
                    setCourseStudents(res.data.course.students)
                    setOpenSnack(res.data.message)
                    setSeverity("success")
                } else {
                    setOpenSnack(res.data.error)
                    setSeverity("error")
                }
            }
            handleClose()
        } catch (error) {
            console.log(error)
            handleClose()
        }
    }
    const muteStudentFunc = async (id) => {
        try {
            handleClose()
            const res = await axios.post(`${appSetting.severHostedUrl}/course/mutestudent`, { courseID: currentCourse?._id, studentID: id })
            if (res) {
                socket.emit("changeInCourse", res.data.course)
                setCourseStudents(res.data.course.students)
                if (res.data.message) {
                    setOpenSnack(res.data.message)
                    setSeverity("success")
                } else {
                    setOpenSnack(res.data.error)
                    setSeverity("error")
                }
            }
        } catch (error) {
            console.log(error)
            handleClose()
        }
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    const sendMsgFunc = async (e) => {
        try {
            const newMessage = message.trim()

            if (newMessage) {
                const name = `${fname} ${lname}`
                let time = moment().format('hh:mm:ss A')
                const messageObj = {
                    senderID: _id, senderName: name, time,
                    message: newMessage, recieverID: studentID,
                    recieverName: studentName
                }
                const res = await axios.post(`${appSetting.severHostedUrl}/user/sendmsg`, messageObj)
                if (res) {
                    if (res.data.message) {
                        socket.emit("changeInConversation", res.data.conversation)
                        setOpenSnack(res.data.message)
                        setSeverity("success")
                    } else {
                        setOpenSnack(res.data.error)
                        setSeverity("error")
                    }
                    setMessage("")
                    setStudentID("")
                    setStudentName("")
                }
            } else {
                setOpenSnack("write something")
                setSeverity("error")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box>
            <Box sx={{ maxWidth: "760px", margin: "0 auto" }}>
                {openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}

                <Box display="flex" justifyContent="space-between" pb={1} px={2} borderBottom="1.5px solid #009c0052" width="100%" >
                    <Typography variant="h4" color="green">
                        Students
                    </Typography>
                    <Typography variant="body1" mt={3} color="green">
                        {currentCourse?.students?.length > 0 ? courseStudents.length : "No"} students
                    </Typography>
                </Box>

                {currentCourse?.students?.length > 0 ?
                    courseStudents.map((currentStudent, index) => {
                        return (
                            <Box key={index}>
                                <Box p="10px 20px" mt={1} width="85%" display="flex" justifyContent="space-between" sx={{ borderRadius: "10px", "&:hover": { backgroundColor: "#009c0026", boxShadow: 3, cursor: "pointer" } }} width="100%" >
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <Box minWidth="65px" >
                                            <Avatar sizes="50px" sx={{ bgcolor: "green", textTransform: "capitalize" }}>{currentStudent.name[0]}</Avatar>
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontSize: "16px", }}>{currentStudent.name}</Typography>
                                        </Box>
                                    </Box>
                                    {/* 3 dots */}
                                    <Button
                                        id="basic-button"
                                        sx={{ color: "black", borderRadius: 5 }}
                                        aria-controls="basic-menu"
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                        size="small"
                                    >
                                        <FiMoreVertical size="23px" style={{ margin: "auto 0px" }} />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={() => {
                                            setStudentID(currentStudent.id);
                                            setStudentName(currentStudent.name)
                                            handleClose()
                                        }}>
                                            Send Message to {currentStudent?.name}</MenuItem>
                                        <MenuItem onClick={() => removeStudentFunc(currentStudent.id)}>Remove</MenuItem>
                                        <MenuItem onClick={() => muteStudentFunc(currentStudent.id)}>{currentStudent.muted ? "Unmute" : "Mute"}</MenuItem>
                                    </Menu>
                                </Box>
                                {studentID ? <SendingMessageInputComp
                                    name="message"
                                    autoFocus={true}
                                    value={message}
                                    setValue={setMessage}
                                    type="text"
                                    placeholder={`Write Message for this student`}
                                    color="success"
                                    submitFunc={sendMsgFunc}
                                    userName={curUser?.fname[0]}
                                /> : ""
                                }
                            </Box>
                        )
                    }) : <Box pt={9} width="100%"
                        textAlign="center"
                    >
                        <Typography variant="h6" color="green">
                            Currently No Students...
                        </Typography>
                    </Box>
                }

            </Box>
        </Box>
    )
}

export default CourseStudentsComp

