import socketIO from 'socket.io-client';
import React, { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Attendance from "./components/Attendance";
import CourseDetails from "./components/CourseDetails";
import ClassMaterials from "./components/ClassMaterials";
import MessagesComp from "./components/MessagesComp";
import appSetting from "./appSetting/appSetting"
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import {
	curUserFun, getUsers, getCourseFunc, getStudentCourseFunc, updateCourses,
	updateCurrentCourse, updateAllAssignments, editAvailAbleCourses, UpdatecurrentConversation
} from "./redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./App.css";

import PrivateRoute from "./PrivateRoute";
import AdminRoutes from './redux/AdminRoutes';
import Dashboard from './components/admin/Dashboard';

const ENDPOINT = appSetting.severHostedUrl
export const socket = socketIO(ENDPOINT, { transports: ["websocket"] })
const App = () => {
	const [isAdmin, setIsAdmin] = useState(false)
	const [auth, setAuth] = useState(null)
	const _id = localStorage.getItem("uid");

	const curUser = useSelector((state) => state.usersReducer.curUser);
	const [uid, setUid] = useState(_id || curUser._id);
	const [spinner, setSpinner] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!auth && !uid) {
			setSpinner(false)
		}
		if (uid || auth) {
			setSpinner(true)
			setAuth(true)
			var currentUser;
			axios
				.get(`${appSetting.severHostedUrl}/user/getdata`)
				.then((response) => {
					const data = response.data;
					// console.log("data", response)
					currentUser = data.find((user) => user._id === _id);
					if (!currentUser) {
						setSpinner(false);
						setUid(false);
					} else {
						dispatch(curUserFun(currentUser));
						if (currentUser?.isAdmin) {
							setIsAdmin(true)
							dispatch(getUsers(data));
						} else {
							if (currentUser.roll === "teacher") {
								axios.post(`${appSetting.severHostedUrl}/course/mycourse`, { teacher_id: currentUser._id })
									.then((resp) => {
										const course = resp.data.course;
										dispatch(getCourseFunc(course))
									}).catch(err => console.log(err))
							}
							if (currentUser.roll === "student" && currentUser.atClass) {
								axios.post(`${appSetting.severHostedUrl}/course/forstudent`, { studentClass: currentUser.atClass, studentID: _id })
									.then((resp) => {
										const courses = resp.data.courses;
										dispatch(getStudentCourseFunc(courses))
									}).catch(err => console.log(err))
							}
						}
					}
					setUid(true);
					setSpinner(false);
				})
				.catch((error) => console.log(error));
			socket.on("connect", () => {
				// console.log("Backend Connected..!!")
			})
			socket.on("courseADDEDByTeacher", (newCourse) => {
				if (currentUser?.roll === "student" && currentUser?.atClass == newCourse?.teacherClass) {
					dispatch(editAvailAbleCourses(newCourse))
				}
			})
			socket.on("courseEditedByTeacher", (course) => {
				if (currentUser?.roll === "student" && currentUser?.atClass == course?.teacherClass) {
					dispatch(updateCourses(course))
				}
			})
			socket.on("messageAddedStream", (course) => {
				dispatch(updateCurrentCourse(course))
			})
			socket.on("CHANGE_IN_CONVERSATION", (conversation) => {
				// console.log("App.js con", conversation)
				if (currentUser?._id === conversation.user1ID || conversation.user2ID) {
					dispatch(UpdatecurrentConversation(conversation))
				}
			})
			socket.on("ASSIGNMENT_ADDED", (allAssignment) => {
				dispatch(updateAllAssignments(allAssignment))
			})
		}
	}, [auth, ENDPOINT]);

	if (spinner) return <Spinner />;
	return (
		<>
			<Router>
				<Switch>
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						exact
						path="/"
						AdminComp={<Redirect to="/dashboard" curUser={curUser} setAuth={setAuth} />}
						SuccessComp={<Redirect to="/profile" curUser={curUser} setAuth={setAuth} />}
						FailComp={<Login setAuth={setAuth} />}
					/>
					{/* Admin Routes Start */}
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						AdminComp={<Dashboard setAuth={setAuth} />}
						path="/dashboard"
						SuccessComp={<Redirect to="/dashboard" />}
						FailComp={<Redirect to="/" />}
					/>
					{/* Admin Routes End */}
					{/* <AdminRoutes
						auth={auth}
						isAdmin={isAdmin}
						AdminComp={}
						path="/dashboard"
						SuccessComp={<Dashboard curUser={curUser} setAuth={setAuth} />}
						FailComp={<Redirect to="/" />}
					/> */}
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						AdminComp={<Redirect to="/" />}
						path="/profile"
						SuccessComp={<Profile curUser={curUser} setAuth={setAuth} />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						AdminComp={<Redirect to="/" />}
						path="/attendance"
						SuccessComp={<Attendance curUser={curUser} setAuth={setAuth} />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						AdminComp={<Redirect to="/" />}
						path="/coursedetails"
						SuccessComp={<CourseDetails curUser={curUser} setAuth={setAuth} />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						AdminComp={<Redirect to="/" />}
						path="/messages"
						SuccessComp={<MessagesComp curUser={curUser} setAuth={setAuth} />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						AdminComp={<Redirect to="/" />}
						path="/classmaterials"
						SuccessComp={<Redirect to="/profile" curUser={curUser} />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						AdminComp={<Redirect to="/" />}
						path="/:id"
						SuccessComp={<ClassMaterials curUser={curUser} setAuth={setAuth} />}
						FailComp={<Redirect to="/" />}
					/>

					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						AdminComp={<Redirect to="/" />}
						path="/*"
						SuccessComp={<Redirect to="/profile" />}
						FailComp={<Redirect to="/" />}
					/>
				</Switch>
			</Router>
		</>
	);
};

export default App;
