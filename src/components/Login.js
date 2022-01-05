import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import LoadingButton from '@mui/lab/LoadingButton';
import { BiUser } from "react-icons/bi";
import { BsExclamationDiamond } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import "../css/login.css";
import appSetting from '../appSetting/appSetting'
import MuiSnacks from "./MuiSnacks"
import { useFormik } from "formik";
import * as yup from "yup"
import { curUserFun } from "../redux/actions";
import { useDispatch } from "react-redux";


const Login = ({ setAuth, setCurUser, setIsAdmin, setNowLogin }) => {
	const [loadBtn, setLoadBtn] = useState(false);

	const [openSnack, setOpenSnack] = useState("");
	const [severity, setSeverity] = useState("");

	const history = useHistory();
	const dispatch = useDispatch()

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: yup.object().shape({
			email: yup.string().email("Does not looks like an email")
				.required("Email is Required."),
			password: yup.string()
				.required("Pasword is Required.")
				.min(8, "password contains at least 8 characters.."),
		}),


		onSubmit: async (values) => {
			try {
				setLoadBtn(true);

				const res = await axios.post(`${appSetting.severHostedUrl}/login`, values, { withCredentials: true })
				if (res) {
					const user = res.data.user
					setCurUser(user)
					setLoadBtn(false);
					if (user.isAdmin) {
						dispatch(curUserFun(user));
						setAuth(true)
						setIsAdmin(true)
						setNowLogin(true)
					} else {
						dispatch(curUserFun(user));
						setAuth(true)
						setNowLogin(true)

						// history.push("/profile");
					}
					localStorage.setItem("me", JSON.stringify({ id: user._id, role: user.roll }))
					history.push("/dashboard");
				}

			} catch (error) {
				setLoadBtn(false);
				setOpenSnack(error?.response?.data?.error);
				setSeverity("error");
			}
		}
	});
	return (
		<Box className={`login_main`}
			display="flex"
			alignItems="center" justifyContent="center"
		>
			{openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}
			<Box textAlign="center" mx={2}>
				<IconButton
					sx={{
						width: "120px",
						height: "120px",
						backgroundColor: "#2e7d32",
						zIndex: 1,
						"&:hover": { backgroundColor: "#2e7d32" },
						borderTop: "1px solid #236826",
						position: "relative",
						top: "80px"
					}}
				>
					<BiUser color="#fff" size="100px" />
				</IconButton>
				<Box
					sx={{
						border: "20px solid transparent",
						maxWidth: { xs: "400px" }
					}}
					boxShadow={5}
				>
					<Box
						sx={{
							backgroundColor: "#fff",
						}}
						boxShadow={5}
						p={4}
					>
						<form method="POST" onSubmit={formik.handleSubmit}
							style={{ textAlign: "center" }}
						>
							<TextField
								autoFocus
								margin="dense"
								name="email"
								label="Email"
								type="email"
								variant="standard"
								value={formik.values.email}
								onChange={formik.handleChange("email")}
								autoComplete="off"
								fullWidth
								color={"success"}
								inputProps={{ maxLength: 32 }}
								sx={{ mt: 7 }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<FaUserCircle size="20px" />
										</InputAdornment>
									),
								}}
							/>
							{formik.errors.email && formik.touched.email && (
								<Typography variant="body2" sx={{ color: "red", marginLeft: "5px", display: "flex", alignItems: "center" }}>
									<BsExclamationDiamond color="red" size="16px" style={{ marginRight: "8px" }} /> {formik.errors.email}
								</Typography>
							)}
							<TextField
								margin="dense"
								name="password"
								label="Password"
								type="password"
								variant="standard"
								value={formik.values.password}
								onChange={formik.handleChange("password")}
								autoComplete="off"
								fullWidth
								color={"success"}
								inputProps={{ maxLength: 32 }}
								sx={{ mt: 2 }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<RiLockPasswordFill size="20px" />
										</InputAdornment>
									),
								}}
							/>
							{formik.errors.password && formik.touched.password && (
								<Typography variant="body2" sx={{ color: "red", marginLeft: "5px", display: "flex", alignItems: "center" }}>
									<BsExclamationDiamond color="red" size="16px" style={{ marginRight: "8px" }} /> {formik.errors.password}
								</Typography>
							)}
							<LoadingButton
								size="large"
								type="submit"
								mt={2}
								variant="contained"
								color="success"
								fullWidth
								loading={loadBtn}
								sx={{ py: loadBtn ? 2.7 : 1, mt: 4 }}
							>
								{loadBtn ? "" : "Login"}
							</LoadingButton>
						</form>
					</Box>
				</Box>
			</Box>
		</Box >
	);
};

export default Login;
