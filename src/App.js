import socketIO from 'socket.io-client';
import React, { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Attendance from "./components/Attendance";
import CourseDetails from "./components/CourseDetails";
import ClassMaterials from "./components/ClassMaterials";
import MessagesComp from "./components/MessagesComp";
import Inbox from "./components/Inbox";
import UserBlockedPage from "./components/UserBlockedPage";
import appSetting from "./appSetting/appSetting";
import NewClassMaterials from "./components/admin/NewClassMaterials"
import {
	BrowserRouter as Router, Switch, Redirect
} from "react-router-dom";
import {
	curUserFun, getUsers, getCourseFunc, getStudentCourseFunc, addNewCourseForAdmin,
	updateCourses, updateCurrentCourse, updateAllAssignments,
	editAvailAbleCourses, UpdatecurrentConversation, allCoursesRedux, updateSingleUser, newUserAdded
} from "./redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./App.css";

import PrivateRoute from "./PrivateRoute";

// Admin Components Importing
import Dashboard from './components/admin/Dashboard';
import DashBoardBox from './components/admin/DashBoardBox';
import Users from './components/admin/Users.js';
import Classes from './components/admin/Classes';
import Courses from './components/admin/Courses';
import Blocked from './components/admin/Blocked';
import ProfileForAdmin from './components/admin/ProfileForAdmin';
// import Teachers from './components/admin/Teachers';
// import Students from './components/admin/Students';

const ENDPOINT = appSetting.severHostedUrl
export const socket = socketIO(ENDPOINT, { transports: ["websocket"] })
const App = () => {
	const users = useSelector((state) => state.usersReducer.users);
	const me = useSelector((state) => state.usersReducer.curUser);

	const [isAdmin, setIsAdmin] = useState(false)
	const [isBlocked, setIsBlocked] = useState(false)
	const [nowLogin, setNowLogin] = useState(null)
	const [auth, setAuth] = useState(null)
	const [curUser, setCurUser] = useState({})

	const [spinner, setSpinner] = useState(true);

	const dispatch = useDispatch();
	useEffect(async () => {
		try {
			let user = await axios.get(`${appSetting.severHostedUrl}/user/currentuser`, { withCredentials: true })
			if (user) {
				let currentUser = user.data.user
				if (currentUser.blocked) {
					setIsBlocked(true)
				} else {
					if (currentUser.isAdmin) {
						setIsAdmin(true)
						let requestForUsers = await axios.get(`${appSetting.severHostedUrl}/user/getdata`, { withCredentials: true })
						if (requestForUsers) {
							const allUsers = requestForUsers.data.users.filter(user => user._id !== currentUser?._id)
							dispatch(getUsers(allUsers));
							const requestForCourses = await axios.get(`${appSetting.severHostedUrl}/course/getall`, { withCredentials: true })
							if (requestForCourses) {
								dispatch(allCoursesRedux(requestForCourses.data.allCourses))
							}
						}
					} else if (currentUser.roll === "teacher") {
						const myCourse = await axios.post(`${appSetting.severHostedUrl}/course/mycourse`, { teacher_id: currentUser?._id }, { withCredentials: true })
						if (myCourse) {
							dispatch(getCourseFunc(myCourse.data.course))
						}
					} else if (currentUser.roll === "student") {
						const studentCourses = await axios.post(`${appSetting.severHostedUrl}/course/forstudent`, { studentClass: currentUser.atClass, studentID: curUser?._id }, { withCredentials: true })
						if (studentCourses) {
							dispatch(getStudentCourseFunc(studentCourses.data.courses))

						}
					}
				}
				dispatch(curUserFun(user.data.user));
				setCurUser(currentUser)
				setAuth(true)
				setSpinner(false)
			}
		} catch (error) {
			console.log(error?.response?.data?.error)
			setAuth(false)
			setSpinner(false)
		}
	}, [nowLogin])
	useEffect(() => {

		socket.on("connect", () => {
			console.log("Backend Connected..!!")
		})
		socket.on("courseADDEDByTeacher", (newCourse) => {
			if (curUser?.roll === "student" && curUser?.atClass == newCourse?.teacherClass) {
				dispatch(editAvailAbleCourses(newCourse))
			} else if (curUser?.isAdmin) {
				dispatch(addNewCourseForAdmin(newCourse))
			}
		})
		socket.on("courseEditedByTeacher", (course) => {
			if (curUser?.roll === "student" && curUser?.atClass == course?.teacherClass) {
				dispatch(updateCourses(course))
			}
		})
		socket.on("messageAddedStream", (course) => {
			dispatch(updateCurrentCourse(course))
		})
		socket.on("CHANGE_IN_CONVERSATION", (conversation) => {
			// console.log("App.js con", conversation)
			if (curUser?._id === conversation.user1ID || conversation.user2ID) {
				dispatch(UpdatecurrentConversation(conversation))
			}
		})
		socket.on("ASSIGNMENT_ADDED", (allAssignment) => {
			dispatch(updateAllAssignments(allAssignment))
		})
		//ITS NOT A BROADCAST
		socket.on("NEW_USER_ADDED", user => {
			if (curUser?.isAdmin) {
				dispatch(newUserAdded(user))
			}
		})
		socket.on("CHANGE_IN_USER", (user) => {
			if (user._id === curUser?._id) {
				dispatch(curUserFun(user));
				setIsBlocked(user.blocked)
			}
			if (curUser?.isAdmin) {
				dispatch(updateSingleUser(user))
			}
		})

	}, [me, users])

	// useEffect(() => {
	// 	if (!auth && !uid) {
	// 		setSpinner(false)
	// 	}
	// 	if (uid || auth) {
	// 		setSpinner(true)
	// 		setAuth(true)
	// 		var currentUser;
	// 		axios
	// 			.get(`${appSetting.severHostedUrl}/user/getdata`, { withCredentials: true })
	// 			.then((response) => {
	// 				const data = response.data;
	// 				// console.log("data", response)
	// 				currentUser = data.find((user) => user._id === _id);
	// 				if (!currentUser) {
	// 					setSpinner(false);
	// 					setUid(false);
	// 				} else {
	// 					dispatch(curUserFun(currentUser));
	// 					setIsBlocked(currentUser?.blocked)
	// 					// setIsBlocked(currentUser?.blocked)
	// 					if (currentUser?.isAdmin) {
	// 						setIsAdmin(true)
	// 						const allUsers = data.filter(user => user._id !== currentUser?._id)
	// 						dispatch(getUsers(allUsers));
	// 						axios.get(`${appSetting.severHostedUrl}/course/getall`, { withCredentials: true })
	// 							.then(res => {
	// 								const allCourses = res.data.allCourses
	// 								dispatch(allCoursesRedux(allCourses))
	// 							}).catch(err => console.log(err))

	// 					} else {
	// 						if (currentUser.roll === "teacher") {
	// 							axios.post(`${appSetting.severHostedUrl}/course/mycourse`, { teacher_id: currentUser._id }, { withCredentials: true })
	// 								.then((resp) => {
	// 									const course = resp.data.course;
	// 									dispatch(getCourseFunc(course))
	// 								}).catch(err => console.log(err))
	// 						}
	// 						if (currentUser.roll === "student" && currentUser.atClass) {
	// 							axios.post(`${appSetting.severHostedUrl}/course/forstudent`, { studentClass: currentUser.atClass, studentID: _id }, { withCredentials: true })
	// 								.then((resp) => {
	// 									const courses = resp.data.courses;
	// 									dispatch(getStudentCourseFunc(courses))
	// 								}).catch(err => console.log(err))
	// 						}
	// 					}
	// 				}
	// 				setUid(true);
	// 				setSpinner(false);
	// 			})
	// 			.catch((error) => console.log(error));
	// 		socket.on("connect", () => {
	// 			// console.log("Backend Connected..!!")
	// 		})
	// 		socket.on("courseADDEDByTeacher", (newCourse) => {
	// 			if (currentUser?.roll === "student" && currentUser?.atClass == newCourse?.teacherClass) {
	// 				dispatch(editAvailAbleCourses(newCourse))
	// 			} else if (currentUser?.isAdmin) {
	// 				dispatch(addNewCourseForAdmin(newCourse))
	// 			}
	// 		})
	// 		socket.on("courseEditedByTeacher", (course) => {
	// 			if (currentUser?.roll === "student" && currentUser?.atClass == course?.teacherClass) {
	// 				dispatch(updateCourses(course))
	// 			}
	// 		})
	// 		socket.on("messageAddedStream", (course) => {
	// 			dispatch(updateCurrentCourse(course))
	// 		})
	// 		socket.on("CHANGE_IN_CONVERSATION", (conversation) => {
	// 			// console.log("App.js con", conversation)
	// 			if (currentUser?._id === conversation.user1ID || conversation.user2ID) {
	// 				dispatch(UpdatecurrentConversation(conversation))
	// 			}
	// 		})
	// 		socket.on("ASSIGNMENT_ADDED", (allAssignment) => {
	// 			dispatch(updateAllAssignments(allAssignment))
	// 		})
	// 		//ITS NOT A BROADCAST
	// 		socket.on("NEW_USER_ADDED", user => {
	// 			if (currentUser?.isAdmin) {
	// 				console.log("user", user)
	// 				dispatch(newUserAdded(user))

	// 			}
	// 		})
	// 		socket.on("CHANGE_IN_USER", (user) => {
	// 			if (user._id === currentUser?._id) {
	// 				dispatch(curUserFun(user));
	// 				setIsBlocked(user.blocked)
	// 			}
	// 			if (currentUser.isAdmin) {
	// 				dispatch(updateSingleUser(user))
	// 			}
	// 		})
	// 	}
	// 	// }, [auth, ENDPOINT]);
	// }, [auth]);

	if (spinner) return <Spinner />;
	if (isBlocked) return <UserBlockedPage />;
	return (
		// <div>
		// 	<p>Hello World</p>
		// </div>
		<>
			{/* {isBlocked ? <UserBlockedPage /> : */}
			<Router>
				<Switch>
					{/* Admin Routes Start */}
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						path="/dashboard"
						AdminComp={<Dashboard setAuth={setAuth}
							Component={<DashBoardBox currentUser={curUser} key="dashboard" />} />}
						SuccessComp={<Redirect to="/profile" />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						path="/users"
						AdminComp={<Dashboard setAuth={setAuth}
							Component={<Users currentUser={curUser} key="users" />} />}
						SuccessComp={<Redirect to="/profile" />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						path="/classes"
						AdminComp={<Dashboard setAuth={setAuth}
							Component={<Classes currentUser={curUser} key="classes" />} />}
						SuccessComp={<Redirect to="/profile" />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						path="/courses"
						AdminComp={<Dashboard setAuth={setAuth}
							Component={<Courses currentUser={curUser} key="courses" />} />}
						SuccessComp={<Redirect to="/profile" />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						path="/inbox"
						AdminComp={<Dashboard setAuth={setAuth}
							Component={<Inbox curUser={curUser} key="inbox" />} />}
						SuccessComp={<Redirect to="/profile" />}
						FailComp={<Redirect to="/" />}
					/>

					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						path="/blocked"
						AdminComp={<Dashboard setAuth={setAuth}
							Component={<Blocked currentUser={curUser} key="blocked" />} />}
						SuccessComp={<Redirect to="/profile" />}
						FailComp={<Redirect to="/" />}
					/>

					{/* Admin Routes End */}
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						exact
						path="/"
						AdminComp={<Redirect to="/dashboard" curUser={curUser} setAuth={setAuth} />}
						SuccessComp={<Redirect to="/profile" curUser={curUser} setAuth={setAuth} />}
						FailComp={<Login setAuth={setAuth} setCurUser={setCurUser} setIsAdmin={setIsAdmin} setNowLogin={setNowLogin} />}
					/>
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						path="/profile"
						AdminComp={<Redirect to="/dashboard" />}
						SuccessComp={<Profile curUser={curUser} setAuth={setAuth} />}
						// SuccessComp={<UserBlockedPage />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						path="/coursedetails"
						AdminComp={<Redirect to="/dashboard" />}
						SuccessComp={<CourseDetails curUser={curUser} setAuth={setAuth} />}
						FailComp={<Redirect to="/" />}
					/>
					{/* All Users Routes started */}
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						path="/messages"
						AdminComp={<MessagesComp curUser={curUser} setAuth={setAuth} />}
						SuccessComp={<MessagesComp curUser={curUser} setAuth={setAuth} />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						path="/attendance"
						AdminComp={<Redirect to="/dashboard" />}
						SuccessComp={<Attendance curUser={curUser} setAuth={setAuth} />}
						FailComp={<Redirect to="/" />}
					/>
					{/* All Users Routes Ended */}
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						path="/classmaterials"
						AdminComp={<Redirect to="/dashboard" />}
						SuccessComp={<Redirect to="/profile" curUser={curUser} />}
						FailComp={<Redirect to="/" />}
					/>
					{/* <PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						path="/iamblocked"
						AdminComp={<UserBlockedPage />}
						SuccessComp={<UserBlockedPage />}
						FailComp={<Redirect to="/" />}
						blocked={isBlocked}
						BlockComp={<UserBlockedPage />}
					/> */}

					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						path="/user"
						AdminComp={<Dashboard setAuth={setAuth}
							Component={<ProfileForAdmin key="users" curUser={curUser} />} />}
						SuccessComp={<Redirect to="/profile" />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						path="/inbox/:id"
						AdminComp={<Dashboard setAuth={setAuth}
							// Component={<Inbox curUser={curUser} key="inbox" />} />}
							Component={<Inbox curUser={curUser} key="inbox" />} />}
						SuccessComp={<Redirect to="/profile" />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						path="/:id"
						// AdminComp={<NewClassMaterials curUser={curUser} setAuth={setAuth} />}

						AdminComp={<Dashboard setAuth={setAuth}
							Component={<NewClassMaterials curUser={curUser} key="courses" />} />}
						SuccessComp={<ClassMaterials curUser={curUser} setAuth={setAuth} />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						isAdmin={isAdmin}
						path="/*"
						AdminComp={<Redirect to="/dashboard" />}
						SuccessComp={<Redirect to="/profile" />}
						FailComp={<Redirect to="/" />}
					/>
				</Switch>
			</Router>
		</>
	);
};

export default App;
