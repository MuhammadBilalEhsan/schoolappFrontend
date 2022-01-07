import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import SendingMessageInputComp from "./SendingMessageInputComp"
import streamImg from "../images/stream.jpg"
import MessageBox from "./MessageBox"
import moment from 'moment'
import axios from 'axios'
import Spinner from './Spinner'
import MuiSnacks from "./MuiSnacks"
import { socket } from '../App'
import { currentCourseFunc } from '../redux/actions'
import { useDispatch } from 'react-redux'
import appSetting from '../appSetting/appSetting'


const Stream = ({ curUser, currentCourse, isAdmin }) => {
    const LS = JSON.parse(localStorage.getItem("me"))
    const [message, setMessage] = useState("")
    const [isMuted, setIsMuted] = useState(false)

    const [openSnack, setOpenSnack] = useState("");
    const [severity, setSeverity] = useState("");

    const dispatch = useDispatch()

    useEffect(() => {
        if (currentCourse && curUser) {
            const findStudentInCourse = currentCourse?.students?.find(student => student.id === curUser?._id)
            if (findStudentInCourse?.muted) {
                setIsMuted(true)
            } else {
                setIsMuted(false)
            }
        }
    })

    const { _id, fname, lname } = curUser || {}
    const submitFunc = async (e) => {
        try {
            const newMessage = message.trim()
            if (newMessage) {
                const name = `${fname} ${lname}`
                let time = moment().format('hh:mm A')
                const messageObj = {
                    id: _id, name, time, message: newMessage, courseID: currentCourse?._id
                }
                const res = await axios.post(`${appSetting.severHostedUrl}/course/sendmessage`, messageObj, { headers: { Authentication: `Bearer ${LS?.token}` } })
                if (res) {
                    setMessage("")
                    if (res.data.message) {
                        socket.emit("msgSentInStream", res.data.course)
                        dispatch(currentCourseFunc(res.data.course))
                        setOpenSnack(res.data.message)
                        setSeverity("success")
                    } else {
                        setOpenSnack(res.data.error)
                        setSeverity("error")
                    }
                }
            } else {
                setOpenSnack("Please write something")
                setSeverity("error")
            }
        } catch (error) {
            console.log(error)
        }
    }
    if (!currentCourse) { return <Spinner /> }

    return (
        <Box maxWidth="1100px" display="flex" flexDirection="column" justifyContent="center" sx={{ marginX: "auto" }}>
            {openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}
            <Box sx={{ width: "100%", height: "240px", borderRadius: "10px", marginTop: 3 }}>
                <img src={streamImg} width="100%" height="100%" style={{ borderRadius: "10px" }} alt="BackGround Image" />
            </Box>
            {
                currentCourse?.chat?.map((currentMessage, index) => {
                    return (
                        <MessageBox
                            color={curUser?._id === currentMessage?.id ? "green" : "#ba000d"}
                            timeColor={curUser?._id === currentMessage?.id ? "#2e7d32de" : "#ba000db8"}
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
            {
                !isAdmin ? (
                    !isMuted ? < SendingMessageInputComp
                        name="message"
                        autoFocus={true}
                        value={message}
                        setValue={setMessage}
                        placeholder="Add comment to All Students"
                        color="success"
                        submitFunc={submitFunc}
                        userName={curUser?.fname[0]}
                    />
                        : <Box mt={3} border="1px solid red" borderRadius={2} width="100%" py={3} textAlign="center">
                            <Typography variant="h6" color="red">You Can't send Message Because You're Muted...</Typography>
                        </Box>
                ) : ""
            }

        </Box >
    )
}

export default Stream
