import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Avatar, Box, Typography } from "@mui/material"
// import SendingMessageInputComp from './SendingMessageInputComp'
// import MessageBox from './MessageBox'
import PrivateConversation from './PrivateConversation.js'
// import moment from 'moment'
import axios from 'axios'
// import { socket } from '../App'
import { useHistory } from 'react-router-dom'
import appSetting from '../appSetting/appSetting'
import { allConversationsRedux } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
// import MuiSnacks from './MuiSnacks'
// import PrivateConversation from './PrivateConversation'

const MessagesComp = ({ curUser, setAuth }) => {
    const allConversations = useSelector(state => state.usersReducer.allConversations)
    const [allConversationsArray, setAllConversationsArray] = useState(allConversations)
    const [conversationID, setConversationID] = useState("")
    // const [openSnack, setOpenSnack] = useState("");
    // const [severity, setSeverity] = useState("");
    // const [message, setMessage] = useState("")
    const [recieverID, setRecieverID] = useState("")
    const [recieverName, setRecieverName] = useState("")
    const history = useHistory()
    const dispatch = useDispatch()
    const setIDfun = (id, name) => {
        if (recieverID) {
            setRecieverID("")
            setRecieverName("")
        } else {
            setRecieverID(id)
            setRecieverName(name)
        }
    }
    const { _id, fname, lname } = curUser || {}

    // useEffect(() => {
    // socket.on()
    // })
    useEffect(async () => {
        try {
            const res = await axios.get(`${appSetting.severHostedUrl}/user/myallconversations/${curUser?._id}`)
            if (res) {
                dispatch(allConversationsRedux(res.data.allConversations))
                setAllConversationsArray(res.data.allConversations)
            }
        } catch (error) {

        }
    }, [])
    return (
        <Box className={`msgs`}>
            {/* {openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""} */}

            <Header curUser={curUser} setAuth={setAuth} />
            {
                conversationID ?
                    <PrivateConversation id={conversationID} allConversationsArray={allConversationsArray} curUser={curUser} /> :
                    <Box mx="auto" px={2} maxHeight="85vh" sx={{ overflowY: "auto" }} maxWidth="900px" display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
                        <Box mt={5} display="flex" borderBottom="1px solid #00800085" justifyContent="flex-start" pb={1} px={2} width="100%" >
                            <Typography variant="h5" color="green">
                                All Conversation
                            </Typography>
                        </Box>
                        <Box width="100%">
                            {
                                allConversationsArray?.length > 0 ?
                                    allConversationsArray.map((conversation, ind) => {
                                        const isUser1 = curUser?._id === conversation.user1ID
                                        return (
                                            <Box onClick={() => setConversationID(conversation._id)} mt={2} key={ind} width="100%" display="flex" justifyContent="space-between" alignItems="center">
                                                <Box display="flex" justifyContent="center" alignItems="center">
                                                    <Box minWidth="65px" >
                                                        <Avatar sizes="50px" sx={{ bgcolor: "green", textTransform: "capitalize" }}>{isUser1 ? conversation.user2Name[0] : conversation.user1Name[0]}</Avatar>
                                                    </Box>
                                                    <Box>
                                                        <Typography sx={{ fontSize: "16px", textTransform: "capitalize" }}>{isUser1 ? conversation.user2Name : conversation.user1Name}</Typography>
                                                    </Box>
                                                </Box>
                                                <Box mt={1}>
                                                    <Typography sx={{ fontSize: '12px' }} color="green">
                                                        {conversation.chat.length} Messages
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )
                                    })
                                    : <Box pt={9} borderTop="1px solid green" width="100%"
                                        textAlign="center"
                                    >
                                        <Typography variant="h6" color="green">
                                            Currently You Have No Conversation
                                        </Typography>
                                    </Box>
                            }
                        </Box>
                    </Box>
            }


            {/* {curUser?.messages?.length > 0 ?
                    curUser?.messages.map((msg, index) => {
                        return (
                            <Box width="100%" key={index} onClick={() => setIDfun(msg.senderID, msg.name)}>
                                <MessageBox
                                    color={curUser?._id === msg?.id ? "#ba000d" : "green"}
                                    timeColor={curUser?._id === msg?.id ? "#ba000db8" : "#2e7d32de"}
                                    curUser={curUser}
                                    nameFirestLetter={msg.name[0]}
                                    name={curUser?._id === msg?.id ? "Me" : msg.name}
                                    time={msg.time}
                                    message={msg.message}
                                />
                            </Box>
                        )
                    }) : <Box pt={9} borderTop="1px solid green" width="100%"
                        textAlign="center"
                    >
                        <Typography variant="h6" color="green">
                            Currently You Have No Messages
                        </Typography>
                    </Box>
                }
                {
                    recieverID ? <SendingMessageInputComp
                        name="message"
                        autoFocus={true}
                        value={message}
                        setValue={setMessage}
                        type="text"
                        placeholder={`Write Message for ${recieverName}`}
                        color="success"
                        submitFunc={sendMsgFunc}
                        userName={curUser?.fname[0]}
                    /> : ""
                } */}

        </Box>
    )
}

export default MessagesComp
