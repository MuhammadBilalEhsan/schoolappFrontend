import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { AiOutlineWechat } from 'react-icons/ai';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { GoPlus } from 'react-icons/go';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { allConversationsRedux } from '../redux/actions';
import appSetting from '../appSetting/appSetting';
import MuiModal from "./admin/MuiModal"
import PrivateConvers from './PrivateConvers';
import axios from "axios"
import defaultDP from "../images/defaultDP.jpg"

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        position: "relative",
        width: "100%",
        left: drawerWidth,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: 0,
            // width: "inherit",

        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({ curUser }) {
    const allConversations = useSelector(state => state.usersReducer.allConversations)
    const [allConversationsArray, setAllConversationsArray] = useState(allConversations)
    const [conversationID, setConversationID] = useState("")
    const [recieverObject, setRecieverObject] = useState(null)

    const [open, setOpen] = useState(true);

    const theme = useTheme();

    const dispatch = useDispatch()

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (curUser?._id && recieverObject?._id) {
            setConversationID(`${curUser?._id}_${recieverObject?._id}`)
        }
    }, [recieverObject])
    useEffect(() => {
        setAllConversationsArray(allConversations)
        // console.log("changedallConversations", allConversations)
    }, [allConversations])
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
        <Box sx={{ display: 'flex', flexDirection: "column" }} width="100%">
            <CssBaseline />
            <AppBar
                // position="relative" top="80px" 

                sx={{
                    position: 'relative',
                    zIndex: open ? -1 : 1,
                    top: { xs: "-16px", sm: 0 },
                }}
                open={open} color="inherit">
                <Toolbar flexGrow={1}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <FaChevronRight />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" >
                        {
                            recieverObject ?
                                <span style={{
                                    display: "flex", justifyContent: "flex-start",
                                    alignItems: "center"
                                }}>
                                    <Avatar
                                        alt={recieverObject.fname}
                                        src={recieverObject.dp ? recieverObject.dp : defaultDP}
                                        sx={{ border: "1px solid #014201", mr: 3 }}
                                    />
                                    <span style={{
                                        color: "#014201", fontWeight: "bold",
                                        textTransform: "capitalize"
                                    }}>
                                        {`${recieverObject.fname} ${recieverObject.lname}`}
                                    </span>
                                </span> : ""
                        }
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    zIndex: 1,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        position: 'absolute',
                        left: { xs: 0, sm: drawerWidth },
                        top: { xs: "48px", sm: "64px" },
                        // top: "64px"
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader >
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <FaChevronLeft /> : <FaChevronRight />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{ px: 1 }}>
                    <MuiModal
                        setRecieverObject={setRecieverObject}
                    />
                    {allConversationsArray?.length > 0 ?
                        allConversationsArray.map((user, index) => (
                            <ListItem button key={index} onClick={handleDrawerClose}>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary={`${user.fname} ${user.lname}`} />
                            </ListItem>
                        )) :
                        <ListItem sx={{ textAlign: "center", mt: 3, color: "#014201", fontWeight: "bold" }}>
                            <ListItemText primary="No Conversations" />
                        </ListItem>
                    }
                </List>
            </Drawer>
            <Main open={open} sx={{ display: "flex", justifyContent: "center" }}>
                <DrawerHeader />
                {conversationID ?
                    <PrivateConvers id={conversationID} allConversationsArray={allConversationsArray} curUser={curUser} /> :
                    <Box maxWidth="900px">

                        <Box width="100%" height="20vh"
                        >
                            <Typography variant='h6' color="#014201"
                                textAlign="center"
                            >
                                <AiOutlineWechat color="green" size="72px" />
                                <br />
                                {allConversationsArray?.length > 0 ?
                                    "Select Conversation To Start Chating" :
                                    " Add Conversation And Start Chating"
                                }
                            </Typography>
                        </Box>
                    </Box>
                }
            </Main>
        </Box>
    );
}
