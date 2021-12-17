import * as React from 'react';
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
import { FiMenu, FiMail } from 'react-icons/fi';
import { FaBookReader } from 'react-icons/fa';
import { ImBlocked, ImBooks } from 'react-icons/im';
import { GiTeacher } from 'react-icons/gi';
import { MdVerifiedUser } from 'react-icons/md';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import drawerBGimg from '../../images/abc1.jpg'
// import headerBGimg from '../../images/drawerBGimg5.jpg'
// import headerBGimg from '../../images/abc1.jpg'

// const drawerWidth = 240;
const drawerWidth = 232;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [component, setComponent] = React.useState("");

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };



    React.useEffect(() => {
        console.log("component", component)
    })
    const drawer = (
        <div>
            <Toolbar sx={{ textAlign: "center", backgroundColor: "#000" }}>
                <Typography variant="h6" color="#fff" sx={{
                    // textDecoration: "underline",
                    cursor: "pointer",
                }}>
                    {/* <strong> */}
                    School App
                    {/* </strong> */}
                </Typography>
            </Toolbar>
            <Divider sx={{ backgroundColor: "white" }} />
            <List sx={{ color: "#16c516", textTransform: "capitalize" }}>
                {[
                    { label: 'teachers', icon: <GiTeacher color='#fff' size="24px" /> },
                    { label: 'students', icon: <FaBookReader color='#fff' size="24px" /> },
                    { label: 'attendance', icon: <MdVerifiedUser color='#fff' size="24px" /> },
                    { label: 'courses', icon: <ImBooks color='#fff' size="24px" /> }
                ].map((item, index) => (
                    <ListItem button key={index} onClick={() => setComponent(item.label)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ backgroundColor: "white" }} />
            <List sx={{ color: "#16c516", textTransform: "capitalize" }}>
                {
                    [
                        { label: 'inbox', icon: <FiMail color='#fff' size="24px" /> },
                        { label: 'blocked', icon: <ImBlocked color='#fff' size="24px" /> }
                    ].map((item, index) => (
                        <ListItem button key={index} onClick={() => setComponent(item.label)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))}
            </List>
            <Divider sx={{ backgroundColor: "white" }} />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                color='success'
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    // backgroundColor: "black",
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <FiMenu size="22px" color="white" />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        <strong> Admin Dashboard</strong>
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
                    color='success'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box', width: drawerWidth,
                            // backgroundImage: `url(${drawerBGimg})`,
                            backgroundColor: "#2c482c"
                        },
                        // backgroundSize: "cover",
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box', width: drawerWidth,
                            // backgroundImage: `url(${drawerBGimg})`,
                            backgroundColor: "#2c482c"
                        },
                        // backgroundImage: `url(${drawerBGimg})`
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >

            </Box>
        </Box >
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;
