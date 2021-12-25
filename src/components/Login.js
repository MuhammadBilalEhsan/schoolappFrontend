import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box"
// import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import LoadingButton from '@mui/lab/LoadingButton';
import { FaUserAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
// import Spinner from "./Spinner";
import "../css/login.css";
import appSetting from '../appSetting/appSetting'
import MuiSnacks from "./MuiSnacks"


const Login = ({ setAuth }) => {
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});
	const [loadBtn, setLoadBtn] = useState(false);

	const [openSnack, setOpenSnack] = useState("");
	const [severity, setSeverity] = useState("");


	const history = useHistory();
	let name, value;
	const handleChange = (e) => {
		name = e.target.name;
		value = e.target.value;
		setLoginData({ ...loginData, [name]: value });
	};


	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			setLoadBtn(true);

			let { email, password } = loginData;
			if (!email) {
				setLoadBtn(false);
				setOpenSnack("Please write Valid Email!");
				setSeverity("error");
			} else if (!password || password.length < 8) {
				setOpenSnack("Password! contains at least 8 characters !");
				setSeverity("error");
				setLoadBtn(false);
			} else {
				const res = await axios.post(`${appSetting.severHostedUrl}/user/login`, loginData)
				if (res) {
					if (res.data.message) {
						localStorage.setItem("uid", res.data.user._id);
						setLoadBtn(false);
						setAuth(true)
						history.push("/profile");
					} else {
						setLoadBtn(false);
						setOpenSnack(res.data.error);
						setSeverity("error");
					}
				}
			}
		} catch (error) {
			setLoadBtn(false);
			console.log(error)
		}
	};
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
					{/* <Button
						size="large" type="submit"
						mt={2} variant="contained"
						color="success"
						startIcon={<FiLogIn size="22px" color="#fff" />}
						fullWidth
					>LOGIN</Button> */}
					<LoadingButton
						size="large"
						type="submit"
						mt={2}
						variant="contained"
						color="success"
						endIcon={loadBtn ? "" : <FiLogIn size="22px" color="#fff" />}
						fullWidth
						loading={loadBtn}
						loadingPosition="end"
						sx={{ py: loadBtn ? 2 : 1 }}

					>
						{loadBtn ? "" : "Login"}
					</LoadingButton>
				</form>
			</Box>
		</Box>
	);
};

export default Login;
