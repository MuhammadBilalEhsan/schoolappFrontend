import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Tooltip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { CgMoreVertical, CgLogOff } from "react-icons/cg";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logoutFunc } from "../redux/actions/index"
import axios from "axios";
import appSetting from "../appSetting/appSetting";

const BtnBox = styled("div")(({ theme }) => ({
	padding: theme.spacing(1),
	display: "none",
	[theme.breakpoints.up("md")]: {
		display: "flex",
	},
}));
const MobMenuComp = styled("div")(({ theme }) => ({
	display: "none",
	[theme.breakpoints.down("md")]: {
		display: "flex",
	},
}));
const Header = ({ setAuth, curUser }) => {
	const [mobMenuAnchor, setMobMenuAnchor] = useState(null);
	const isMobMenuOpen = Boolean(mobMenuAnchor);

	const history = useHistory();
	const dispatch = useDispatch()

	const openMobMenu = (e) => {
		setMobMenuAnchor(e.currentTarget);
	};
	const closeMobMenu = () => {
		setMobMenuAnchor(null);
	};
	const logoutFunction = async () => {
		try {
			const res = await axios.get(`${appSetting.severHostedUrl}/user/logout`, { withCredentials: true })
			if (res) {
				dispatch(logoutFunc())
				setAuth(false)
				history.push("/");
			}
		} catch (error) {
			console.log(error?.response?.data.error)
		}
	}
	const mobileMenu = (
		<Menu
			anchorEl={mobMenuAnchor}
			id="mob_menu"
			keepMounted
			open={isMobMenuOpen}
			onClose={closeMobMenu}
		>
			<MenuItem
				component={Link}
				onClick={closeMobMenu}
				to="/profile"
				sx={{
					backgroundColor: "#fff",
					color: "green",
					width: "100%",
					paddingBottom: 2,
				}}
			>
				Profile
			</MenuItem>
			<MenuItem
				component={Link}
				onClick={closeMobMenu}
				to="/attendance"
				sx={{
					backgroundColor: "#fff",
					color: "green",
					width: "100%",
					paddingBottom: 2,
				}}
			>
				Attendance
			</MenuItem>
			<MenuItem
				component={Link}
				onClick={closeMobMenu}
				to="/coursedetails"
				sx={{
					backgroundColor: "#fff",
					color: "green",
					width: "100%",
					paddingBottom: 2,
				}}
			>
				Course Details
			</MenuItem>
			<MenuItem
				component={Link}
				onClick={closeMobMenu}
				to="/messages"
				sx={{
					backgroundColor: "#fff",
					color: "green",
					width: "100%",
					paddingBottom: 2,
				}}
			>
				Messages
			</MenuItem>

			<MenuItem
				component={Button}
				onClick={logoutFunction}
				// to="/logout"
				sx={{
					backgroundColor: "#fff",
					color: "red",
					width: "100%",
					paddingBottom: 2,
				}}
			>
				Log Out
			</MenuItem>
		</Menu >
	);
	return (
		<>
			<AppBar color="success" position="static">
				<Toolbar>
					<Typography component={Link} color="inherit" to="/profile" variant="h5" sx={{ flexGrow: 1, textDecoration: "none" }}>
						School App
					</Typography>
					<BtnBox>
						<Button component={Link} to="/profile" size="small" color="inherit">
							Profile
						</Button>
						<Button
							component={Link}
							to="/attendance"
							size="small"
							color="inherit"
							sx={{ marginLeft: 3 }}
						>
							Attendance
						</Button>
						<Button
							component={Link}
							to="/coursedetails"
							size="small"
							color="inherit"
							sx={{ marginLeft: 3 }}
						>
							Course Details
						</Button>
						<Button
							component={Link}
							to="/messages"
							size="small"
							color="inherit"
							sx={{ marginLeft: 3 }}
						>
							Messages
						</Button>
						<Tooltip title="Log Out" arrow>
							<Button
								component={Link}
								to="/logout"
								sx={{ marginLeft: 3 }}
								onClick={logoutFunction}
							>
								<CgLogOff color="#fff" size="25px" />
							</Button>
						</Tooltip>
					</BtnBox>
					<MobMenuComp>
						<IconButton color="inherit" onClick={openMobMenu}>
							<CgMoreVertical />
						</IconButton>
					</MobMenuComp>
				</Toolbar>
			</AppBar>
			{mobileMenu}
		</>
	);
};

export default Header;
