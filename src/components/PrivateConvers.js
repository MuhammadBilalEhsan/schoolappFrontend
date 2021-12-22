import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import SendingMessageInputComp from './SendingMessageInputComp';
import SubSpinner from './SubSpinner';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currentConversationRedux } from '../redux/actions';
import MessageBox from './MessageBox';
import { BiArrowBack } from "react-icons/bi";
import MuiSnacks from './MuiSnacks';
import axios from 'axios';
import appSetting from '../appSetting/appSetting';
import moment from 'moment';
import { socket } from '../App';



const PrivateConversation = ({ curUser, id, allConversationsArray }) => {
    const curConversation = useSelector(state => state.usersReducer.currentConversation)
    const [currentConversation, setCurrentConversation] = useState({})
    const [openSnack, setOpenSnack] = useState("");
    const [severity, setSeverity] = useState("");
    const [message, setMessage] = useState("")
    const [spinner, setSpinner] = useState(true)
    const history = useHistory()
    const dispatch = useDispatch()
    // ngrok


    const { _id, fname, lname } = curUser || {}
    const sendMsgFunc = async () => {
        try {
            const newMessage = message.trim()

            if (newMessage) {
                const name = `${fname} ${lname}`
                let time = moment().format('hh:mm:ss A')
                const messageObj = {
                    _id: currentConversation?._id, senderID: _id, name, time, message: newMessage, recieverID: curUser?._id === currentConversation?.user1ID ?
                        currentConversation?.user2ID : currentConversation?.user1ID
                }

                const res = await axios.post(`${appSetting.severHostedUrl}/user/sendmsg`, messageObj)
                if (res) {
                    if (res.data.message) {
                        setCurrentConversation(res.data.conversation)
                        socket.emit("changeInConversation", res.data.conversation)
                        setOpenSnack(res.data.message)
                        setSeverity("success")
                    } else {
                        setOpenSnack(res.data.error)
                        setSeverity("error")
                    }
                    setMessage("")
                }
            } else {
                setOpenSnack("write something")
                setSeverity("error")
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const findCurrentConversation = allConversationsArray?.find(convers => convers._id === id)
        dispatch(currentConversationRedux(findCurrentConversation))
        setCurrentConversation(findCurrentConversation)
        setSpinner(false)
    }, [])
    useEffect(() => {
        setCurrentConversation(curConversation)
    }, [curConversation])

    return (
        <Box mx="auto" maxHeight="80vh"
            sx={{ overflowY: "auto" }}

            maxWidth="900px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            // mt={5}
            sx={{ backgroundColor: "red" }}
        >
            {openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}

            <Box width="100%" display="flex" flexDirection={"column"}
                minHeight="71vh" px={1.5}
            >
                <Box width="100%" flexGrow={1}>
                    {spinner ?
                        <SubSpinner /> :
                        currentConversation?.chat.map((messageObj, ind) => {
                            return (
                                // {user1ID, user1Name, user2ID, user2Name}
                                <MessageBox key={ind}
                                    color={curUser?._id === messageObj?.senderID ? "green" : "#ba000d"
                                    }
                                    timeColor={curUser?._id === messageObj?.senderID ? "#2e7d32de" : "#ba000db8"}
                                    // curUser={curUser}
                                    nameFirestLetter={messageObj?.senderID === currentConversation.user1ID ?
                                        currentConversation.user1Name[0]
                                        : currentConversation.user2Name[0]
                                    }
                                    name={curUser?._id === messageObj?.senderID ? "Me" : messageObj?.senderID === currentConversation.user1ID ?
                                        currentConversation.user1Name
                                        : currentConversation.user2Name
                                    }
                                    time={messageObj.time}
                                    message={messageObj.message}
                                />
                            )
                        })
                    }
                </Box>
                <SendingMessageInputComp
                    name="message"
                    autoFocus={true}
                    value={message}
                    setValue={setMessage}
                    type="text"
                    placeholder={`Write Message...`}
                    color="success"
                    submitFunc={sendMsgFunc}
                    userName={curUser?.fname[0]}
                />
            </Box>
        </Box>
    )
}

export default PrivateConversation
