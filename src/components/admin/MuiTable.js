import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import { ImBlocked } from 'react-icons/im';
import { BsChatDotsFill } from 'react-icons/bs';
import { RiInformationLine } from 'react-icons/ri';
import { socket } from '../../App';
import moment from 'moment';
import axios from 'axios';
import appSetting from '../../appSetting/appSetting';
import MuiSnacks from '../MuiSnacks';
import SendingMessageInputComp from '../SendingMessageInputComp';
import { Box } from '@mui/system';
import { useHistory, Link } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#014201",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function MuiTable({ tableBody, curUser }) {

    const [recieverID, setRecieverID] = useState("")
    const [recieverName, setRecieverName] = useState("")
    const [message, setMessage] = useState("")
    const [openSnack, setOpenSnack] = useState("")
    const [severity, setSeverity] = useState("")

    const history = useHistory()
    const blockUser = async (e, userID) => {
        try {
            const res = await axios.get(`${appSetting.severHostedUrl}/user/block/${userID}`, { withCredentials: true })
            if (res) {
                if (res.data.message) {
                    socket.emit("changeInUser", res.data.user)
                    setOpenSnack(res.data.message)
                    setSeverity("success")
                } else {
                    setOpenSnack(res.data.error)
                    setSeverity("error")
                }
            }

        } catch (error) {
            console.log("errorr", error)
        }
    }
    const sendMsgFunc = async (e) => {
        try {
            const newMessage = message.trim()

            if (newMessage) {
                const senderName = `${curUser?.fname} ${curUser?.lname}`
                let time = moment().format('dd-mm-yyyy hh:mm:ss A')
                const messageObj = {
                    senderID: curUser?._id, senderName, time,
                    message: newMessage, recieverID,
                    recieverName
                }
                const res = await axios.post(`${appSetting.severHostedUrl}/user/sendmsg`, messageObj, { withCredentials: true })
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
                    setRecieverID("")
                    setRecieverName("")
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
            {recieverID ? <SendingMessageInputComp
                name="message"
                autoFocus={true}
                value={message}
                setValue={setMessage}
                type="text"
                placeholder={`Write Message here...`}
                color="success"
                submitFunc={sendMsgFunc}
                userName={curUser?.fname[0]}
            /> : ""
            }
            <TableContainer component={Paper}
            // sx={{ p: 2 }}
            >
                {openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}

                <Table
                    size='small'
                    // width="100%"
                    sx={{
                        // minWidth: 700,
                        maxWidth: {
                            sm: `calc(100% - ${272}px)`, xs: "100%"
                        },
                        position: "absolute", cursor: "pointer",
                        overflowX: "scroll", border: "1px solid #014201",
                    }}
                    aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell sx={{ width: "5%" }}>Sr. No.</StyledTableCell>
                            <StyledTableCell sx={{ width: "15%" }}>Full Name</StyledTableCell>
                            <StyledTableCell align="left" sx={{ width: "5%" }}>Age</StyledTableCell>
                            <StyledTableCell align="left" sx={{ width: "15%" }}>Son of</StyledTableCell>
                            <StyledTableCell align="left" sx={{ width: "10%" }}>Class</StyledTableCell>
                            <StyledTableCell align="center" colSpan={3} sx={{ width: "50%" }}>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tableBody?.map((user, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>
                                            {index + 1}.
                                        </StyledTableCell>
                                        <StyledTableCell >
                                            {`${user.fname} ${user.lname}`}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {user.age ? user.age : "-"}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {user.fatherName ? user.fatherName : "-"}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {user.atClass}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Tooltip title={`View ${user.fname} ${user.lname}`} arrow>
                                                <IconButton
                                                    component={Link}
                                                    to={`/user?${user._id}`}
                                                >
                                                    <RiInformationLine color="#014201" size="22px" />
                                                </IconButton>
                                            </Tooltip>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Tooltip title={`Message to ${user.fname} ${user.lname}`} arrow>
                                                <IconButton
                                                    component={Link}
                                                    to={`/inbox?${user._id}?${user.fname ? user.fname : user.email}_${user.fname && user.lname ? user.lname : ""}`}
                                                >
                                                    <BsChatDotsFill color="#014201" size="18px" />
                                                </IconButton>
                                            </Tooltip>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Tooltip title={user.blocked ? `Unblock ${user.fname} ${user.lname}` : `Block ${user.fname} ${user.lname}`} arrow>
                                                <IconButton onClick={(e) => blockUser(e, user._id)}>
                                                    <ImBlocked
                                                        size="18px"
                                                        color={user.blocked ? "red" : ""}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
