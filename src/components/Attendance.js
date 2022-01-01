import React, { useState, useEffect } from "react";

import { makeStyles } from "@mui/styles";

import { styled } from "@mui/material/styles";
import { Box, Typography, Button, } from "@mui/material";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import moment from "moment-business-days";
import Header from "./Header";
import axios from "axios";
import { useDispatch } from "react-redux";
import { curUserFun } from "../redux/actions";
import MuiSnacks from "./MuiSnacks";
import appSetting from '../appSetting/appSetting'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor:
			theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.mode === "light" ? "green" : "#30e833",
	},
}));
const useStyles = makeStyles((/*theme */) => ({
	attendance_top: {
		textAlign: "center",
	},
}));

const Attendance = ({ curUser, setAuth }) => {
	const classes = useStyles();

	const [todayAttend, setTodayAttend] = useState(true);
	const [holiday, setHoliday] = useState(null);
	const [newState, setNewState] = useState(false);
	const [firstDate, setFirstDate] = useState();
	const [curMonth, setCurMonth] = useState();
	const [curYear, setCurYear] = useState();
	const [attPercent, setAttPercent] = useState(0);
	const [lastMonthPercent, setLastMonthPercent] = useState(0);

	const [openSnack, setOpenSnack] = useState("");
	const [severity, setSeverity] = useState("");


	const _id = curUser?._id
	const dispatch = useDispatch()
	// ____________________________________________________________________________________________

	const checkTodayAtt = () => {
		// if (curUser.attendance && curUser.attendance.length > 0) {
		const attArr = curUser.attendance;
		const lastMonth = attArr[attArr?.length - 1];

		// check user have marked his/her attendance of today or not
		const checkTodayAtt = lastMonth?.days?.find(
			(curElem) => curElem.todayDate === moment().date(),
		);
		if (!checkTodayAtt && moment().date() === 1) {
			handleClick()
			setTodayAttend(true);
		}
		const checkHoliday = moment().day() === 0 || moment().day() === 6
		if (checkTodayAtt) {
			setTodayAttend(true);
		} else if (checkHoliday) {
			setHoliday(true)
		} else {
			setTodayAttend(false);
		}
		// }
		latestMonthAttCalc();
		overAllAttCalc();
	};

	// ____________________________________________________________________________________________
	const latestMonthAttCalc = () => {
		if (curUser.attendance && curUser.attendance.length > 0) {
			// getting total working/bussiness days (01-CurMonth-curYear - curr Date)
			if (
				moment(curUser.dateOfAddmission).date() === moment().date() &&
				moment(curUser.dateOfAddmission).month() === moment().month() &&
				moment(curUser.dateOfAddmission).year() === moment().year()
			) {
				// handleClick()
				setLastMonthPercent(100);
			} else if (
				moment(curUser.dateOfAddmission).month() === moment().month() &&
				moment(curUser.dateOfAddmission).year() === moment().year()
			) {
				setFirstDate(moment(curUser.dateOfAddmission).date());
				setCurMonth(moment(curUser.dateOfAddmission).month() + 1);
				setCurYear(moment(curUser.dateOfAddmission).year());

				const firstDateOfCurMonth = `${curMonth}-${firstDate}-${curYear}`;
				const overallTotalDays = moment(
					firstDateOfCurMonth,
					"MM-DD-YYYY",
				).businessDiff(moment(moment(), "MM-DD-YYYY"));
				// getting total days of current month in which user present
				const attArr = curUser.attendance;
				const lastMonth = attArr[attArr?.length - 1];
				const curMonthTotalPresent = lastMonth.days.length;

				const curMonthOpperation =
					(curMonthTotalPresent / overallTotalDays) * 100;
				setLastMonthPercent(curMonthOpperation);
			} else if (moment().date() === 1) {
				// handleClick()
				setLastMonthPercent(100);

			} else {
				// setFirstDate(1);
				setCurMonth(moment().month() + 1);
				setCurYear(moment().year());

				const firstDateOfCurMonth = `${curMonth}-01-${curYear}`;
				const overallTotalDays = moment(
					firstDateOfCurMonth,
					"MM-DD-YYYY",
				).businessDiff(moment(moment(), "MM-DD-YYYY"));
				// getting total days of current month in which user present
				const attArr = curUser?.attendance;
				const lastMonth = attArr[attArr?.length - 1];
				const curMonthTotalPresent = lastMonth.days?.length;

				const curMonthOpperation =
					(curMonthTotalPresent / overallTotalDays) * 100;
				setLastMonthPercent(curMonthOpperation);
			}
		}
	};

	// ____________________________________________________________________________________________
	const overAllAttCalc = () => {
		if (curUser.attendance && curUser.attendance.length > 0) {
			if (
				moment(curUser.dateOfAddmission).month() === moment().month() &&
				moment(curUser.dateOfAddmission).year() === moment().year()
			) {
				setAttPercent(lastMonthPercent);
			} else {
				// getting total working/bussiness days (dateOfAddmission- curr Date)

				const largeDOA = moment(curUser.dateOfAddmission);
				const monthDOA = largeDOA.month() + 1;
				const dateDOA = largeDOA.date();
				const yearDOA = largeDOA.year();
				const dateOfAddmission = `${monthDOA}-${dateDOA}-${yearDOA}`;
				let overallTotalDays = moment(
					dateOfAddmission,
					"MM-DD-YYYY",
				).businessDiff(moment(moment(), "MM-DD-YYYY"));
				// getting total days in which user present

				const abc = curUser.attendance.map((curElem) => {
					return curElem.days.length;
				});
				const overallPresentDays = abc?.reduce(myFunc);
				function myFunc(total, num) {
					return total + num;
				}
				const overAllOpperation = (overallPresentDays / overallTotalDays) * 100;
				// console.log(overallTotalDays,overallPresentDays);
				setAttPercent(overAllOpperation);
			}
		}
	};


	// ____________________________________________________________________________________________

	const handleClick = async () => {
		try {
			setNewState(true);
			// e.preventDefault();/
			const att = new Date();
			const year = att.getFullYear();
			const month = att.getMonth();
			const date = att.getDate();
			const hours = att.getHours();
			const mins = att.getMinutes();

			const time = `${hours}:${mins}`;

			const attObj = { _id, year, month, date, time };
			const res = await axios.post(`${appSetting.severHostedUrl}/user/attendance`, attObj, { withCredentials: true });
			if (res) {
				dispatch(curUserFun(res.data.updated))
				setOpenSnack(res.data.message);
				setSeverity("success")
			}
		} catch (err) {
			console.error(err);
			setOpenSnack("Your Attendance not marked");
			setSeverity("error")
		}
	};
	useEffect(() => {
		checkTodayAtt();
		latestMonthAttCalc();
		overAllAttCalc();
	});


	return (
		<Box className={`_main`}>
			<Header curUser={curUser} setAuth={setAuth} />
			<Box>
				{openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}

				<Box className={classes.attendance_top}>
					{
						holiday ? <Box mt={8} maxWidth="80%" mx="auto" py={2} textAlign="center">
							<Typography color="green" variant="h4">Today is Holiday</Typography>
						</Box> : <Box>
							<Typography mt={8} mb={2} variant="h4" display="inline-block">
								Mark Today's Attendance
							</Typography>

							<Box>
								<Button
									size="small"
									variant="contained"
									color="success"
									onClick={(e) => handleClick(e)}
									disabled={todayAttend || newState}
								>
									{todayAttend ? "Marked" : "Mark"}
								</Button>
							</Box>
						</Box>
					}

				</Box>
				<Box my={5} mx="auto" sx={{ width: "80%" }} display="block">
					<Typography variant="h6">This Month Attendance</Typography>
					<BorderLinearProgress
						thickness={2}
						color="success"
						variant="determinate"
						value={Math.round(lastMonthPercent)}
					/>
					<Typography variant="h6">
						{Math.round(lastMonthPercent)}%
					</Typography>
				</Box>{" "}
				<br />
				<br />
				<Box mx="auto" sx={{ width: "80%" }}>
					<Typography variant="h6">Overall Attendance</Typography>
					<BorderLinearProgress
						color="success"
						variant="determinate"
						value={Math.round(attPercent)}
					/>
					<Typography variant="h6">{Math.round(attPercent)}%</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default Attendance;