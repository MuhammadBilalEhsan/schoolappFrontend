import React, { useState, useEffect } from "react";
import {
	Tooltip, DialogTitle, DialogContent, DialogActions, Dialog, TextField, Menu,
	MenuItem, Button, Typography, Box
} from "@mui/material/";
import LoadingButton from "@mui/lab/LoadingButton";
import AddTopic from "./AddTopic";
// import CourseOutlineComp from "./CourseOutlineComp";
import { MdUpload, MdKeyboardArrowDown } from "react-icons/md";
// import { RiFileEditFill } from "react-icons/ri";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { socket } from "../App";
import appSetting from "../appSetting/appSetting";
import { getCourseFunc } from "../redux/actions";
import { useDispatch } from "react-redux";

const LS = JSON.parse(localStorage.getItem("me"))

const durationArr = ["1 Week", "2 Weeks", "3 Weeks", "4 Weeks"];

export default function AddCourse({ curUser, editCourse, course, setSeverity, setOpenSnack }) {
	const [open, setOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(null);
	const [loadBtn, setLoadBtn] = useState(null);
	const [selectDurInd, setSelectDurInd] = useState(course?.duration || null);
	const [courseDuration, setCourseDuration] = useState(editCourse ? course.duration : "Not Set")
	const [topicChips, setTopicChips] = useState([]);
	const [topicErr, setTopicErr] = useState(null);
	const [coOutErr, setCoOutErr] = useState(null);
	const [editEditCourse, setEditEditCourse] = useState(true);
	const [weekNotSelected, setWeekNotSelected] = useState(null);

	const [courseOutlineArr, setCourseOutlineArr] = useState([]);
	const dispatch = useDispatch()
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleMenuOpen = (e) => {
		setWeekNotSelected(false);
		setCoOutErr(false);
		setMenuOpen(e.currentTarget);
	};
	const handleMenuClose = () => {
		setMenuOpen(false);
	};
	// const handleSelect = (index) => {
	// 	setEditEditCourse(false)
	// 	const objsOfCOArr = [...Array(index + 1)].map(() => {
	// 		const obj = { week: "" }
	// 		return obj;
	// 	})
	// 	setCourseOutlineArr(objsOfCOArr)
	// 	// setSelectDurInd(String(index));
	// 	handleMenuClose();

	// };

	const formik = useFormik({
		initialValues: {
			teacher_id: curUser?._id,
			teacherName: `${curUser?.fname} ${curUser?.lname}`,
			teacherClass: curUser?.atClass,
			courseName: editCourse ? course?.courseName : "",
			courseDesc: editCourse ? course?.courseDesc : "",
			topics: null,
			duration: editCourse ? course?.duration : "",
			courseOutline: editCourse ? course?.courseOutline : "",
		},
		validationSchema: yup.object().shape({
			courseName: yup.string()
				.required("Course Name is Required Field."),
			courseDesc: yup.string()
				.required("Course Description is Required Field."),
			duration: yup.string()
				.required("Please Select Duration of Your Course"),
			courseOutline: yup.string()
				.required("Course Outline is Required Field."),
		}),


		onSubmit: async (values, actions) => {
			try {
				if (topicChips.length === 0) {
					setTopicErr(true);
				} else {
					values.topics = topicChips;
					if (editCourse) {
						handleClose();
						const res = await axios.post(`${appSetting.severHostedUrl}/course/editcourse`, values, { headers: { Authentication: `Bearer ${LS?.token}` } });
						if (res) {
							if (res.data.editted) {
								socket.emit("courseEditted", res.data.editted)
								dispatch(getCourseFunc(res.data.editted))
							} if (res.data.message) {
								setOpenSnack(res.data.message)
								setSeverity("success")
							}
						}
					} else {
						setLoadBtn(true)
						const res = await axios.post(`${appSetting.severHostedUrl}/course/add`, values, { headers: { Authentication: `Bearer ${LS?.token}` } });
						if (res) {
							socket.emit("newCoursesAdded", res.data.newCourse)
							dispatch(getCourseFunc(res.data.newCourse))
							if (res.data.message) {
								setOpenSnack(res.data.message)
								setSeverity("success")
							}
							actions.resetForm()
						}
						handleClose();
						setLoadBtn(false)
					}
					// }
					// }
				}
			} catch (error) {
				setOpenSnack(error?.response?.data?.error)
				setSeverity("error")
				handleClose();
			}
		}
	});
	useEffect(() => {
		if (editCourse) {
			setCourseOutlineArr(course?.courseOutline)
		} else {
			setCourseOutlineArr([])
		}
	}, [])
	return (
		<div>
			{editCourse ? (
				// <>
				<Tooltip title="Edit Course" arrow >
					<Button variant="outlined" color="success"
						onClick={handleClickOpen}
					>
						Edit Course
					</Button>
				</Tooltip>
				// 	<Tooltip title="Delete Course" arrow>
				// 		<Button
				// 			size="small"
				// 			onClick={(e) => delCourseFunc(e)}
				// 			sx={{ borderRadius: 5 }}
				// 		>
				// 			<FaRegTrashAlt color="red" size="22px" />
				// 		</Button>
				// 	</Tooltip>
				// </>
			) : (
				<Tooltip title="Add Course" arrow>
					<Button
						size="small"
						variant="contained" color="success"
						onClick={handleClickOpen}
						endIcon={<MdUpload size="20px" color="#fff" />}
					>
						Add Course
					</Button>
				</Tooltip>
			)}
			{/* Openning Dialouge Box */}
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle align="center" backgroundColor="white">
					{editCourse ? "Edit Course" : "Create Course"}
				</DialogTitle>
				<DialogContent>
					<form onSubmit={formik.handleSubmit}>
						<TextField
							autoFocus
							// margin="dense"
							sx={{ mt: 2 }}
							name="courseName"
							label="Course Name"
							type="text"
							variant="outlined"
							value={formik.values.courseName}
							onChange={formik.handleChange("courseName")}
							autoComplete="off"
							fullWidth
							color={"success"}
							inputProps={{ maxLength: 64 }}
						/>
						{formik.errors.courseName && formik.touched.courseName && (
							<Typography variant="body2" sx={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.courseName}
							</Typography>
						)}
						<TextField
							sx={{ mt: 2 }}
							name="courseDesc"
							label="Description"
							type="text"
							variant="outlined"
							value={formik.values.courseDesc}
							onChange={formik.handleChange("courseDesc")}
							autoComplete="off"
							fullWidth
							multiline
							// color={editCourse ? "warning" : "success"}
							color={"success"}
							inputProps={{ maxLength: 200 }}
						/>
						{formik.errors.courseDesc && formik.touched.courseDesc && (
							<Typography variant="body2" sx={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.courseDesc}
							</Typography>
						)}
						{/* add Topic field */}
						<AddTopic
							topicChips={topicChips}
							setTopicChips={setTopicChips}
							topicErr={topicErr}
							setTopicErr={setTopicErr}
							editCourse={editCourse}
							course={course}
							style={{ display: "flex", background: "orange" }}

						/>
						{/* add duration field */}
						<Box mt={2} width="100%" display="flex" justifyContent="flex-start" alignItems="center" >
							<Typography variant="subtitle1" color="darkgreen">
								Select Duration:
							</Typography>

							<Button
								onClick={(e) => {
									handleMenuOpen(e);
									setCourseOutlineArr([]);
								}}
								variant="outlined"
								sx={{ ml: 3 }}
								color={"success"}
								endIcon={<MdKeyboardArrowDown />}
							>
								<strong>
									{courseDuration}
								</strong>
							</Button>
						</Box>
						{formik.errors.duration && formik.touched.duration && (
							<Typography variant="body2" sx={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.duration}
							</Typography>
						)}
						<Menu
							open={Boolean(menuOpen)}
							anchorEl={menuOpen}
							onClose={handleMenuClose}
						>
							{durationArr.map((item, index) => (
								<MenuItem
									key={index}
									onClick={() => {
										formik.values.duration = item
										setCourseDuration(item)
										handleMenuClose()
									}}
									name="duration"
								>
									{item}
								</MenuItem>
							))}
						</Menu>

						<TextField
							// margin="dense"
							sx={{ mt: 2 }}
							name="courseOutline"
							label="Course Outline"
							type="text"
							variant="outlined"
							value={formik.values.courseOutline}
							onChange={formik.handleChange("courseOutline")}
							autoComplete="off"
							fullWidth
							multiline
							// color={editCourse ? "warning" : "success"}
							color={"success"}
							inputProps={{ maxLength: 200 }}
						/>
						{formik.errors.courseOutline && formik.touched.courseOutline && (
							<Typography variant="body2" sx={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.courseOutline}
							</Typography>
						)}

						{/* {
							selectDurInd || editCourse ? (
								<CourseOutlineComp
									courseOutlineArr={courseOutlineArr}
									editCourse={editCourse}
									coOutErr={coOutErr}
									onChange={(e, index) => {
										setCourseOutlineArr(prev => {
											let tempCourse = [...prev];
											tempCourse[index].week = e.target.value;
											return tempCourse;
										})
									}}
								/>
							) : (
								<></>
							)
						} */}
					</form>
				</DialogContent>
				<DialogActions>
					<LoadingButton
						size="small"
						type="submit"
						color={"success"}
						variant="contained"
						onClick={formik.handleSubmit}
						loading={loadBtn}
						sx={{ py: 0.7, px: 2 }}
					>
						{editCourse ? "Save Edit" : "Create Course"}
					</LoadingButton>
					<Button
						color={"success"}
						variant="outlined"
						onClick={handleClose}
					>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
