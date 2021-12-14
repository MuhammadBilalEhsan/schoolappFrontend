import React, { useEffect, useState } from 'react'
import { Box, Avatar, Typography, Button } from "@mui/material"
import SendingMessageInputComp from "./SendingMessageInputComp"
import MessageBox from "./MessageBox"
import { GrAnnounce } from "react-icons/gr"
import moment from "moment"
import axios from "axios"
import MuiSnacks from './MuiSnacks';
import appSetting from '../appSetting/appSetting'
import { socket } from '../App'


const Announcement = ({ currentCourse, curUser }) => {
    const [courseAnnouncments, setCourseAnnouncments] = useState(null)
    const [showInput, setShowInput] = useState(false)
    const [message, setMessage] = useState("")

    const [openSnack, setOpenSnack] = useState("");
    const [severity, setSeverity] = useState("");

    const toggle = () => {
        if (showInput) {
            setShowInput(false)
        } else {
            setShowInput(true)
        }
    }
    const { _id, fname, lname } = curUser || {}
    const submitFunc = async (e) => {
        try {
            const newMessage = message.trim()

            if (newMessage) {
                const name = `${fname} ${lname}`
                let time = moment().format('hh:mm A')
                const announcementObj = {
                    id: _id, name, time, message: newMessage, courseID: currentCourse?._id
                }
                const res = await axios.post(`${appSetting.severHostedUrl}/course/announcement`, announcementObj)
                if (res) {
                    setMessage("")
                    toggle()
                    if (res.data.message) {
                        setOpenSnack(res.data.message)
                        setSeverity("success")
                        socket.emit("changeInCourse", res.data.course)
                        setCourseAnnouncments(res.data.course.announcement)
                    } else {
                        setOpenSnack(res.data.error)
                        setSeverity("error")
                    }
                }
            } else {
                setOpenSnack("Write something")
                setSeverity("error")
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setCourseAnnouncments(currentCourse?.announcement)
    }, [currentCourse])
    return (
        <Box
            maxWidth="1100px" minHeight="77vh"
            display="flex" flexDirection="column"
            sx={{ marginX: "auto" }}
        >
            {openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}

            {curUser?.roll === "teacher" ? (
                <div>
                    {showInput ? <SendingMessageInputComp
                        name="announce"
                        autoFocus={true}
                        value={message}
                        setValue={setMessage}
                        type="text"
                        placeholder="Write Announcement"
                        color="success"
                        submitFunc={submitFunc}
                        userName={curUser?.fname[0]}
                    /> : ""
                    }
                    {/* Announce SomeThing to Your Class */}
                    <Box onClick={toggle} sx={{ width: "100%", "&:hover": { color: "green", cursor: "pointer" }, borderRadius: "12px", backgroundColor: "#00710012", padding: "1rem 1.5rem", boxShadow: 4 }}>
                        <Box width="100%">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Box width="65px" >
                                    <Avatar sx={{ bgcolor: "green", textTransform: "capitalize" }}>r</Avatar>
                                </Box>
                                <Box flexGrow={1} >
                                    <Typography color="#0000009c" sx={{ fontSize: "14px", "&:hover": { color: "green", cursor: "pointer", textDecoration: "underline" } }}>Announce Something to Your Students</Typography>
                                </Box>
                                <Box >
                                    <Button
                                        sx={{ borderRadius: 5 }}
                                        size="small"
                                    >
                                        <GrAnnounce size="23px" />
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </div>
            ) : (<Box borderBottom="1px solid #00800059" display="flex" justifyContent="flex-start" pb={2} px={2} width="100%" >
                <Typography variant="h4" color="green">
                    Announcements
                </Typography>
            </Box>)

            }




            {/* Announces */}
            {
                courseAnnouncments?.map((currentMessage, index) => {
                    return (

                        <MessageBox
                            color={"green"}
                            timeColor={"#2e7d32de"}
                            curUser={curUser}
                            key={index}
                            nameFirestLetter={currentMessage.name[0]}
                            name={curUser?._id === currentMessage?.id ? "Me" : currentMessage.name}
                            time={currentMessage.time}
                            message={currentMessage.message}
                        />
                    )
                })
            }

            {/* <MessageBox
                    nameFirestLetter="A"
                    name="Teacher"
                    time="09:45pm"
                    message="Bilal Ehsasn Is the Best Teacher wohooooo"
                /> */}
        </Box >
    )
}


export default Announcement

