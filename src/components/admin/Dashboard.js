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
import { FaUsers } from 'react-icons/fa';
import { ImBlocked, ImBooks } from 'react-icons/im';
import { GiClassicalKnowledge, } from "react-icons/gi"
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useHistory } from "react-router-dom"
import { CgLogOff } from 'react-icons/cg';

const drawerWidth = 240;
// const drawerWidth = 232;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [activeComponent, setActiveComponent] = React.useState(props.Component?.key);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const history = useHistory()
    const logoutFunction = () => {
        localStorage.removeItem("uid");
        props.setAuth(false)
        window.location.reload(false);
        history.push("/");
    }
    React.useEffect(() => { setActiveComponent(props.Component?.key) })
    const drawer = (
        <div>
            <Toolbar sx={{ textAlign: "center" }}>
                <Typography variant="h6" color="#fff" sx={{
                    // textDecoration: "underline",
                    cursor: "pointer",
                }}>
                    {/* <strong> */}
                    School App
                    {/* </strong> */}
                </Typography>
            </Toolbar>
            {/* <Divider sx={{ backgroundColor: "white" }} /> */}
            <List sx={{ color: "#fff", textTransform: "capitalize", py: 0, px: 1 }}>
                {[
                    { label: 'dashboard', icon: <MdOutlineDashboardCustomize color='#fff' size="24px" /> },
                    { label: 'users', icon: <FaUsers color='#fff' size="24px" /> },
                    { label: 'classes', icon: <GiClassicalKnowledge color='#fff' size="24px" /> },
                    // { label: 'attendances', icon: <MdVerifiedUser color='#fff' size="24px" /> },
                    { label: 'courses', icon: <ImBooks color='#fff' size="24px" /> }
                ].map((item, index) => (
                    <ListItem button key={index}
                        component={Link} to={`${item.label}`}
                        onClick={() => setMobileOpen(false)}
                        sx={{
                            borderRadius: 1.5, mb: 1,
                            backgroundColor: item.label === activeComponent ? "darkgreen" : "",
                            boxShadow: item.label === activeComponent ? 5 : 0,
                            "&:hover": { backgroundColor: "darkgreen" }
                        }}
                    >
                        {/* {console.log("check", item.label, item.label === activeComponent)} */}
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ backgroundColor: "white" }} />
            <List sx={{ color: "#fff", textTransform: "capitalize", p: 1 }}>
                {
                    [
                        { label: 'inbox', icon: <FiMail color='#fff' size="24px" /> },
                        { label: 'blocked', icon: <ImBlocked color='#fff' size="24px" /> }
                    ].map((item, index) => (
                        <ListItem button key={index}
                            component={Link} to={`${item.label}`}
                            onClick={() => {
                                setActiveComponent(item.label);
                                setMobileOpen(false)
                            }}
                            sx={{
                                borderRadius: 1.5, mb: 1,
                                backgroundColor: item.label === activeComponent ? "darkgreen" : "",
                                boxShadow: item.label === activeComponent ? 5 : 0,
                                "&:hover": { backgroundColor: "darkgreen" }
                            }}
                        >
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
                    <Typography variant="h6" flexGrow={1} noWrap component="div">
                        <strong> Admin Dashboard</strong>
                    </Typography>

                    <IconButton
                        color="inherit"
                        onClick={logoutFunction}
                    >
                        <CgLogOff size="24px" color="white" />
                    </IconButton>
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
                            backgroundColor: "#2e7d32",
                        },
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
                            backgroundColor: "#2e7d32"
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, mt: "40px", width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                {props.Component}
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
