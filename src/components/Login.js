import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography, Divider } from "@mui/material"
import { FaUserAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import Spinner from "./Spinner";
import "../css/login.css";
import appSetting from '../appSetting/appSetting'
import MuiSnacks from "./MuiSnacks"

const Login = ({ setAuth }) => {
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});
	const [loader, setLoader] = useState(false);

	const [openSnack, setOpenSnack] = useState("");
	const [severity, setSeverity] = useState("");


	const history = useHistory();
	let name, value;
	const handleChange = (e) => {
		name = e.target.name;
		value = e.target.value;
		setLoginData({ ...loginData, [name]: value });
	};


	const handleSubmit = (e) => {
		e.preventDefault();
		setLoader(true);

		let { email, password } = loginData;
		if (!email) {
			setLoader(false);
			setOpenSnack("Please write Valid Email!");
			setSeverity("error");
		} else if (!password || password.length < 8) {
			setOpenSnack("Password! contains at least 8 characters !");
			setSeverity("error");
			setLoader(false);
		} else {
			axios
				.post(`${appSetting.severHostedUrl}/user/login`, loginData)
				.then((res) => {
					localStorage.setItem("uid", res.data.curUser._id);
					setLoader(false);
					setAuth(true)
					history.push("/profile");
				})
				.catch((err) => {
					setLoader(false);
					setOpenSnack("Invalid Credentials");
					setSeverity("error");
				});
		}
	};

	if (loader) return <Spinner />;
	return (
		<Box className={`_main`} display="flex" alignItems="center">
			{openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}

			<Box sx={{ backgroundColor: "#fff" }} maxWidth="400px" borderRadius={1} boxShadow={3} mx="auto" p={4} pt={2} display="flex" justifyContent="center" alignItems="center">
				<form method="POST" onSubmit={(e) => handleSubmit(e)} style={{ textAlign: "center" }}>
					<Typography variant="h6" textAlign="center"> CY School App
						<Divider sx={{ marginBottom: 2 }} />
					</Typography>
					<FaUserAlt className="large-icon" color="green" size="50%" />
					<TextField
						autoFocus
						margin="dense"
						name="email"
						label="Your Email"
						type="email"
						variant="outlined"
						value={loginData.email}
						onChange={(e) => handleChange(e)}
						autoComplete="off"
						fullWidth
						color={"success"}
						inputProps={{ maxLength: 32 }}
					/>
					<TextField
						margin="dense"
						name="password"
						label="Your Password"
						type="password"
						variant="outlined"
						value={loginData.password}
						onChange={(e) => handleChange(e)}
						autoComplete="off"
						fullWidth
						color={"success"}
						inputProps={{ maxLength: 32 }}
						sx={{ marginBottom: 2 }}
					/>
					<Button size="large" type="submit" mt={2} variant="contained" color="success" startIcon={<FiLogIn size="22px" color="#fff" />} fullWidth>LOGIN</Button>
				</form>
			</Box>
		</Box>
	);
};

export default Login;
