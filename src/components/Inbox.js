import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { BsArrowLeftRight, } from 'react-icons/bs';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { allConversationsRedux, currentConversationRedux } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import appSetting from '../appSetting/appSetting';
import MuiModal from './admin/MuiModal';
import { AiOutlineWechat } from 'react-icons/ai';
import PrivateConvers from './PrivateConvers';
import { useParams, useLocation } from 'react-router-dom';

const drawerWidth = 240;

function Inbox(props) {
    const allConversations = useSelector(state => state.usersReducer.allConversations)
    const { search } = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false);
    const { window } = props;
    const [allConversationsArray, setAllConversationsArray] = useState(allConversations)
    const [conversationID, setConversationID] = useState("")
    const [recieverID, setRecieverID] = useState("")
    const [recieverName, setRecieverName] = useState(null)

    const dispatch = useDispatch()
    // const params = useParams()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    // useEffect(() => {
    // if (props.curUser?._id && recieverID?._id) {
    //     setConversationID(`${props.curUser?._id}_${recieverID?._id}`)
    // }
    // console.log("recieverID", recieverID)
    // }, [recieverID])
    useEffect(() => {
        setAllConversationsArray(allConversations)
        // console.log("changedallConversations", allConversations)
    }, [allConversations])
    useEffect(async () => {
        try {
            // }
            const res = await axios.get(`${appSetting.severHostedUrl}/user/myallconversations/${props.curUser?._id}`, { withCredentials: true })
            if (res) {
                dispatch(allConversationsRedux(res.data.allConversations))
                setAllConversationsArray(res.data.allConversations)
            }
        } catch (error) {
        }
        // if{search}
        if (search) {
            const split1 = search.split("?")
            const split2 = split1[2].split("_")
            if (split1) {
                setRecieverID(split1[1])
            }
            if (split2) {
                setRecieverName(`${split2[0]} ${split2[1]}`)
            }
        }
    }, [])
    const drawer = (
        <div style={{ padding: "8px" }}>
            <MuiModal
                setRecieverID={setRecieverID}
                setRecieverName={setRecieverName}
                setConversationID={setConversationID}
                allConversationsArray={allConversationsArray}
                curUser={props.curUser}
            />
            <List sx={{ textTransform: "capitalize", py: 0, mt: 2 }}>
                {allConversationsArray?.length > 0 ?
                    allConversationsArray.map((chat, index) => (
                        <ListItem button key={index}
                            sx={{
                                mb: 1, boxShadow: 3, borderRadius: 2,
                                border: "3px solid #00640021",
                                "&:hover": { backgroundColor: "#0064001a" },
                            }}
                            onClick={() => {
                                setConversationID(chat._id)
                                setRecieverName(
                                    props.curUser?._id === chat?.user1ID ?
                                        chat?.user2Name : chat?.user1Name,
                                )
                                setRecieverID(
                                    props.curUser?._id === chat?.user1ID ?
                                        chat?.user2ID : chat?.user1ID,
                                )
                            }}
                        >
                            <ListItemIcon>
                                <Avatar sx={{
                                    backgroundColor: "darkgreen",
                                    width: "32px",
                                    height: "32px",
                                }}>{
                                        chat.user1ID === props.curUser?._id ? chat.user2Name[0] : chat.user1Name[0]
                                    } </Avatar>
                            </ListItemIcon>
                            <ListItemText primary={
                                chat.user1ID === props.curUser?._id ? chat.user2Name : chat.user1Name
                            }
                            />
                        </ListItem>
                    )) :
                    <ListItem sx={{ textAlign: "center", mt: 3, color: "#014201", fontWeight: "bold" }}>
                        <ListItemText primary="No Conversations" />
                    </ListItem>
                }
            </List>
            <Divider />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box>
            <CssBaseline />
            <Divider />
            <AppBar
                color='inherit'
                position="fixed"
                sx={{
                    width: {
                        sm: `calc(100% - ${drawerWidth}px)`,
                        md: `calc(100% - ${drawerWidth + drawerWidth}px)`
                    },
                    mt: { xs: "48px", sm: "64px" },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <BsArrowLeftRight size="22px" color="darkgreen" />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" >
                        {
                            recieverName ? <span style={{
                                display: "flex", justifyContent: "flex-start",
                                alignItems: "center"
                            }}>
                                <Avatar
                                    sx={{
                                        backgroundColor: "#014201",
                                        mr: 3, textTransform: "capitalize"
                                    }}
                                >
                                    {recieverName[0]}
                                </Avatar>
                                <span style={{
                                    color: "#014201", fontWeight: "bold",
                                    textTransform: "capitalize"
                                }}>
                                    {recieverName}
                                </span>
                            </span> : ""
                        }
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box', width: drawerWidth,
                            mt: "0px",
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box', width: drawerWidth,
                            ml: "240px", mt: "64px",
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1, mt: { xs: "32px", sm: "64px" },
                    ml: { xs: 0, md: "240px" },
                    display: "flex", justifyContent: "center",
                    alignItems: "center",
                    minHeight: "85vh",
                    backgroundColor: "#00000012"
                }}
            >
                {recieverID ?
                    <PrivateConvers id={conversationID}
                        allConversationsArray={allConversationsArray}
                        recieverID={recieverID}
                        recieverName={recieverName}
                        curUser={props.curUser}
                    /> :
                    <Typography variant='h6' color="#014201"
                        textAlign="center"
                    // sx={{ mt: 5 }}
                    >
                        <AiOutlineWechat color="green" size="72px" />
                        <br />
                        {allConversationsArray?.length > 0 ?
                            "Select Conversation To Start Chating" :
                            "Add Conversation And Start Chating"
                        }
                    </Typography>
                }
            </Box>
        </Box >
    );
}

Inbox.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Inbox;
