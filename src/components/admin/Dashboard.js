import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FiMenu, FiMail, FiSettings } from "react-icons/fi";
import { FaUsers, FaUserEdit } from "react-icons/fa";
import { ImBlocked, ImBooks } from "react-icons/im";
import { GiClassicalKnowledge } from "react-icons/gi";
import {
  MdOutlineDashboardCustomize,
  MdOutlinePassword,
  MdBookmarkAdded,
} from "react-icons/md";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useHistory } from "react-router-dom";
import { CgLogOff } from "react-icons/cg";
import { logoutFunc } from "../../redux/actions";
import { useDispatch } from "react-redux";

const drawerWidth = 240;

const admin1stList = [
  //   {
  //     label: "dashboard",
  //     icon: <MdOutlineDashboardCustomize color="#fff" size="24px" />,
  //   },
  { label: "users", icon: <FaUsers color="inherit" size="24px" /> },
  {
    label: "classes",
    icon: <GiClassicalKnowledge color="inherit" size="24px" />,
  },
  { label: "courses", icon: <ImBooks color="inherit" size="24px" /> },
];
const teacher1stList = [
  {
    label: "dashboard",
    icon: <MdOutlineDashboardCustomize color="inherit" size="24px" />,
  },
  { label: "courses", icon: <ImBooks color="inherit" size="24px" /> },
];
const student1stList = [
  {
    label: "dashboard",
    icon: <MdOutlineDashboardCustomize color="inherit" size="24px" />,
  },
  {
    label: "courses",
    icon: <GiClassicalKnowledge color="inherit" size="24px" />,
    disabled: true,
  },
  { label: "availables", icon: <ImBooks color="inherit" size="24px" /> },
  { label: "enrolled", icon: <MdBookmarkAdded color="inherit" size="24px" /> },
];

const admin2ndList = [
  { label: "inbox", icon: <FiMail color="inherit" size="24px" /> },
  {
    label: "blocked users",
    path: "blocked",
    icon: <ImBlocked color="inherit" size="24px" />,
  },
];
const users2ndList = [
  { label: "inbox", icon: <FiMail color="inherit" size="24px" /> },
];
// const student2ndList = [
//   { label: "inbox", icon: <FiMail color="inherit" size="24px" /> },
// ];

const admin3rdList = [
  {
    label: "change password",
    path: "changepassword",
    icon: <MdOutlinePassword color="inherit" size="24px" />,
  },
];
const users3rdList = [
  {
    label: "edit profile",
    path: "editprofile",
    icon: <FaUserEdit color="inherit" size="24px" />,
  },
  {
    label: "change password",
    path: "changepassword",
    icon: <MdOutlinePassword color="inherit" size="24px" />,
  },
];

function Dashboard(props) {
  const { window } = props;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(props.Component?.key);
  //   const [firstList, setFirstList] = useState(
  const firstList = props.curUser?.isAdmin
    ? admin1stList
    : props.curUser?.roll === "teacher"
    ? teacher1stList
    : props.curUser?.roll === "student"
    ? student1stList
    : [];
  //   );
  //   const [secondList, setSecondList] = useState(
  const secondList = props.curUser?.isAdmin
    ? admin2ndList
    : props.curUser?.roll === "teacher" || props.curUser?.roll === "student"
    ? users2ndList
    : [];
  //   );
  //   const [thirdList, setThirdList] = useState(
  const thirdList = props.curUser?.isAdmin
    ? admin3rdList
    : props.curUser?.roll === "teacher" || props.curUser?.roll === "student"
    ? users3rdList
    : [];
  //   );
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const history = useHistory();
  const logoutFunction = () => {
    localStorage.clear();
    dispatch(logoutFunc());
    props.setNowLogin(false);
    props.setIsAdmin(false);
    props.setAuth(false);
    history.push("/");
  };
  useEffect(() => {
    setActiveComponent(props.Component?.key);
  });
  const drawer = (
    <div>
      <Toolbar sx={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          color="#fff"
          sx={{
            cursor: "pointer",
          }}
        >
          School App
        </Typography>
      </Toolbar>
      {/* <Divider sx={{ backgroundColor: "white" }} /> */}
      <List
        sx={{
          //   color: "#fff",
          textTransform: "capitalize",
          py: 0,
          px: 1,
        }}
      >
        {firstList.map((item, index) => (
          <ListItem
            button
            key={index}
            className={activeComponent === item.label ? "abc" : ""}
            disabled={item.disabled ? item.disabled : false}
            component={Link}
            to={`${item.path ? item.path : item.label}`}
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: 1.5,
              mb: 1,
              color: item.label === activeComponent ? "darkgreen" : "white",
              backgroundColor: item.label === activeComponent ? "white" : "",
              "&:hover": { color: "darkgreen", backgroundColor: "#ddd" },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      {/* <Divider sx={{ backgroundColor: "white" }} /> */}
      <List sx={{ color: "#fff", textTransform: "capitalize", p: 1 }}>
        {secondList.map((item, index) => (
          <ListItem
            button
            key={index}
            className={activeComponent === item.label ? "abc" : ""}
            disabled={item.disabled ? item.disabled : false}
            component={Link}
            to={`${item.path ? item.path : item.label}`}
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: 1.5,
              mb: 1,
              color: item.label === activeComponent ? "darkgreen" : "white",
              backgroundColor: item.label === activeComponent ? "white" : "",
              "&:hover": { color: "darkgreen", backgroundColor: "#ddd" },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ backgroundColor: "white" }} />
      <List sx={{ color: "#fff", textTransform: "capitalize", p: 1 }}>
        <ListItem
          button
          disabled={true}
          sx={{
            borderRadius: 1.5,
            mb: 1,
          }}
        >
          <ListItemIcon>
            <FiSettings color="#fff" size="24px" />
          </ListItemIcon>
          <ListItemText primary={`Settings`} />
        </ListItem>
        {thirdList.map((item, index) => (
          <ListItem
            button
            key={index}
            className={activeComponent === item.label ? "abc" : ""}
            disabled={item.disabled ? item.disabled : false}
            component={Link}
            to={`${item.path ? item.path : item.label}`}
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: 1.5,
              mb: 1,
              color: item.label === activeComponent ? "darkgreen" : "white",
              backgroundColor: item.label === activeComponent ? "white" : "",
              fontWeight: item.label === activeComponent ? "bold" : "",
              "&:hover": { color: "darkgreen", backgroundColor: "#ddd" },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        color="success"
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
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <FiMenu size="22px" color="white" />
          </IconButton>
          <Typography variant="h6" flexGrow={1} noWrap component="div">
            <strong>
              {props.curUser?.isAdmin
                ? "Admin "
                : props.curUser?.roll === "teacher"
                ? "Teacher "
                : props.curUser?.roll === "student"
                ? "Student "
                : ""}
              Dashboard
            </strong>
          </Typography>
          <Tooltip title="Log Out" arrow>
            <IconButton color="inherit" onClick={logoutFunction}>
              <CgLogOff size="24px" color="white" />
            </IconButton>
          </Tooltip>
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
          color="success"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#2e7d32",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#2e7d32",
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
          flexGrow: 1,
          mt: "40px",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {props.Component}
      </Box>
    </Box>
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
