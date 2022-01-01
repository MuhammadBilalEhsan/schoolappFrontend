import React, { useEffect, useState } from "react";
import {
	DialogTitle,
	DialogContent,
	DialogActions,
	Dialog,
	TextField,
	Button,
	Tooltip,
	Box
} from "@mui/material/";
import { FaUserEdit } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { curUserFun } from "../redux/actions/index";
import appSetting from '../appSetting/appSetting'



export default function EditProfileFormik({ curUser, setOpenSnack, setSeverity, setCurrentUser }) {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const dispatch = useDispatch()

	const handleClose = () => {
		setOpen(false);
	};
	const formik = useFormik({
		initialValues: {
			id: curUser?._id,
			fname: curUser?.fname,
			lname: curUser?.lname,
			fatherName: curUser?.fatherName,
			atClass: curUser?.atClass,
			age: curUser?.age,
			phone: curUser?.phone,
		},
		validateOnChange: true,

		validationSchema: yup.object().shape({
			fname: yup.string()
				.max(12, "Plese Enter a Name less then 12 Characters")
				.required("Please Enter First Name"),
			lname: yup.string()
				.max(12, "Plese Enter a Name less then 12 Characters")
				.required("Please Enter Last Name"),
			fatherName: yup.string()
				.max(16, "Plese Enter a Name less then 16 Characters")
				.required("Please Enter Your Father's Name"),
			atClass: yup.number().required().positive().integer().min(6).max(10),
			age: yup.number().required("It is not a good habit to hide your age.")
				.positive("That doesn't look like a human's age.")
				.integer("Don't use decimal point")
				.min(10, "You are not egligible for this school, you are a baby,")
				.max(199, "A noble human cannot live so long"),
			phone: yup.number()
				.typeError("That doesn't look like a phone number")
				.positive("A phone number can't start with a minus")
				.integer("A phone number can't include a decimal point")
				.min(3000000000, "It doesn't looks like a phone number")
				.max(3499999999, "It doesn't looks like a phone number")
				.required('A phone number is required')
		}),
		onSubmit: async (values) => {
			try {
				handleClose();
				const res = await axios.post(`${appSetting.severHostedUrl}/user/edit-profile`, values, { withCredentials: true });
				if (res) {
					setCurrentUser(res.data.updated)
					dispatch(curUserFun(res.data.updated))
					setOpenSnack(res.data.message)
					setSeverity("success")
				} else {
					setOpenSnack("User not update!")
					setSeverity("error")
					handleClose();
				}
			} catch (error) {
				console.log(error);
				handleClose();
			}
		}

	})
	return (
		<Box>
			<Tooltip title="Edit Profile" arrow >
				<Button color="success" variant="contained" size="small" onClick={handleClickOpen}>
					<FaUserEdit color="inherit" size="16px" />
				</Button>
			</Tooltip>

			{/* Openning Dialouge Box */}
			<Dialog Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" >
				<DialogTitle align="center" backgroundColor="white">
					Edit Profile
				</DialogTitle>
				<DialogContent>
					<form onSubmit={formik.handleSubmit}>
						<TextField
							autoFocus
							margin="dense"
							name="fname"
							label="First Name"
							type="text"
							variant="outlined"
							value={formik.values.fname}
							onChange={formik.handleChange("fname")}
							autoComplete="off"
							fullWidth
							color="success"
						// required
						/>
						{formik.errors.fname && formik.touched.fname && (
							<p style={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.fname}
							</p>
						)}
						<TextField
							margin="dense"
							name="lname"
							label="Last Name"
							type="text"
							variant="outlined"
							value={formik.values.lname}
							onChange={formik.handleChange("lname")}
							autoComplete="off"
							fullWidth
							color="success"
						// required
						/>
						{formik.errors.lname && formik.touched.lname && (
							<p style={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.lname}
							</p>
						)}
						<TextField
							margin="dense"
							name="fatherName"
							label="Son of"
							type="text"
							variant="outlined"
							value={formik.values.fatherName}
							onChange={formik.handleChange("fatherName")}
							autoComplete="off"
							fullWidth
							color="success"
						// required
						/>
						{formik.errors.fatherName && formik.touched.fatherName && (
							<p style={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.fatherName}
							</p>
						)}
						<TextField
							margin="dense"
							name="atClass"
							label="In Class"
							type="number"
							variant="outlined"
							value={formik.values.atClass}
							onChange={formik.handleChange("atClass")}
							autoComplete="off"
							fullWidth
							color="success"
						/>
						{formik.errors.atClass && formik.touched.atClass && (
							<p style={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.atClass}
							</p>
						)}
						<TextField
							margin="dense"
							name="age"
							label="Age"
							type="number"
							variant="outlined"
							value={formik.values.age}
							onChange={formik.handleChange("age")}
							autoComplete="off"
							fullWidth
							color="success"
						// required
						/>
						{formik.errors.age && formik.touched.age && (
							<p style={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.age}
							</p>
						)}
						<Tooltip title="Enter Phone Number Escaped 0" arrow>
							<TextField
								margin="dense"
								name="phone"
								label="Contact No..."
								type="number"
								variant="outlined"
								value={formik.values.phone}
								onChange={formik.handleChange("phone")}
								autoComplete="off"
								fullWidth
								color="success"
							// required
							/>
						</Tooltip>
						{formik.errors.phone && formik.touched.phone && (
							<p style={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.phone}
							</p>
						)}
						{/* <Button variant="contained" type="submit">
							Save Edit
						</Button> */}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						color="success"
						variant="contained"
						onClick={formik.handleSubmit}
					>
						Save Edit
					</Button>

					<Button color="success" onClick={handleClose}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog >
		</Box >
	);
}
