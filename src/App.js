import socketIO from "socket.io-client";
import React, { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
import Login from "./components/Login";
import TeacherCourses from "./components/TeacherCourses";
import StudentAvailable from "./components/StudentAvailable";
import StudentEnrolled from "./components/StudentEnrolled";
import ChangePassword from "./components/ChangePassword";
import EditProfileComp from "./components/EditProfileComp";
import Inbox from "./components/Inbox";
import appSetting from "./appSetting/appSetting";
import NewClassMaterials from "./components/admin/NewClassMaterials";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import {
  curUserFun,
  getUsers,
  getCourseFunc,
  getStudentCourseFunc,
  addNewCourseForAdmin,
  updateCourses,
  updateCurrentCourse,
  updateAllAssignments,
  editAvailAbleCourses,
  UpdatecurrentConversation,
  allCoursesRedux,
  updateSingleUser,
  newUserAdded,
  logoutFunc,
} from "./redux/actions/index";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./App.css";

import PrivateRoute from "./PrivateRoute";

// Admin Components Importing
import Dashboard from "./components/admin/Dashboard";
// import DashBoardBox from "./components/admin/DashBoardBox";
import Users from "./components/admin/Users.js";
import Classes from "./components/admin/Classes";
import Courses from "./components/admin/Courses";
import Blocked from "./components/admin/Blocked";
import ProfileForAdmin from "./components/admin/ProfileForAdmin";

const ENDPOINT = appSetting.severHostedUrl;
export const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
const App = () => {
  // const users = useSelector((state) => state.usersReducer.users);
  // const me = useSelector((state) => state.usersReducer.curUser);
  // console.log("me", me)
  const [isAdmin, setIsAdmin] = useState(false);
  // const [isBlocked, setIsBlocked] = useState(false)
  const [nowLogin, setNowLogin] = useState(false);
  const [auth, setAuth] = useState(false);
  const [curUser, setCurUser] = useState({});

  const [spinner, setSpinner] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(async () => {
    // setSpinner(true)
    try {
      const LS = await JSON.parse(localStorage.getItem("me"));
      let user = await axios.get(
        `${appSetting.severHostedUrl}/user/currentuser/${LS?.id}`,
        {
          headers: { Authentication: `Bearer ${LS?.token}` },
        }
      );
      if (user) {
        let currentUser = user.data.user;
        if (currentUser.isAdmin) {
          setIsAdmin(true);
          let requestForUsers = await axios.get(
            `${appSetting.severHostedUrl}/user/getdata`,
            {
              headers: { Authentication: `Bearer ${LS?.token}` },
            }
          );
          if (requestForUsers) {
            const allUsers = requestForUsers.data.users.filter(
              (user) => user._id !== currentUser?._id
            );
            dispatch(getUsers(allUsers));
            const requestForCourses = await axios.get(
              `${appSetting.severHostedUrl}/course/getall`,
              {
                headers: { Authentication: `Bearer ${LS?.token}` },
              }
            );
            if (requestForCourses) {
              dispatch(allCoursesRedux(requestForCourses.data.allCourses));
            }
          }
        } else if (currentUser.roll === "teacher") {
          const myCourse = await axios.post(
            `${appSetting.severHostedUrl}/course/mycourse`,
            { teacher_id: currentUser?._id },
            {
              headers: { Authentication: `Bearer ${LS?.token}` },
            }
          );
          if (myCourse.data.course) {
            dispatch(getCourseFunc(myCourse.data.course));
          }
        } else if (currentUser.roll === "student") {
          const studentCourses = await axios.post(
            `${appSetting.severHostedUrl}/course/forstudent`,
            { id: LS?.id, atClass: LS?.atClass },
            {
              headers: { Authentication: `Bearer ${LS?.token}` },
            }
          );
          if (studentCourses) {
            dispatch(getStudentCourseFunc(studentCourses.data.courses));
          }
        }
        // }
        dispatch(curUserFun(currentUser));
        setCurUser(currentUser);
        setAuth(true);
        setSpinner(false);
      }
    } catch (error) {
      // console.log(error?.response?.data?.error)
      setAuth(false);
      setSpinner(false);
    }
  }, [nowLogin]);

  useEffect(() => {
    let me = JSON.parse(localStorage.getItem("me"));

    socket.on("connect", () => {
      console.log("Backend Connected..!!");
    });
    socket.on("courseADDEDByTeacher", (newCourse) => {
      // if (me?.role === "student" && me?.atClass === newCourse?.teacherClass) {
      if (me?.role === "student" && me?.atClass == newCourse?.teacherClass) {
        dispatch(editAvailAbleCourses(newCourse));
      } else if (me?.isAdmin) {
        dispatch(addNewCourseForAdmin(newCourse));
      }
    });
    socket.on("courseEditedByTeacher", (course) => {
      // if (me?.role === "student" && me?.atClass === course?.teacherClass) {
      if (me?.role === "student" && me?.atClass == course?.teacherClass) {
        dispatch(updateCourses(course));
      }
    });
    socket.on("messageAddedStream", (course) => {
      dispatch(updateCurrentCourse(course));
    });
    socket.on("CHANGE_IN_CONVERSATION", (conversation) => {
      // console.log("App.js con", conversation)
      if (me?._id === conversation.user1ID || conversation.user2ID) {
        dispatch(UpdatecurrentConversation(conversation));
      }
    });
    socket.on("ASSIGNMENT_ADDED", (allAssignment) => {
      dispatch(updateAllAssignments(allAssignment));
    });
    //ITS NOT A BROADCAST
    socket.on("NEW_USER_ADDED", (user) => {
      if (me?.role === "admin") {
        dispatch(newUserAdded(user));
      }
    });
    socket.on("CHANGE_IN_USER", (user) => {
      if (user._id === me?.id) {
        if (user.blocked) {
          localStorage.clear();
          dispatch(logoutFunc());
          setNowLogin(false);
          setIsAdmin(false);
          setAuth(false);
        } else {
          dispatch(curUserFun(user));
          // setIsBlocked(user.blocked)
        }
      }
      if (me?.role === "admin") {
        dispatch(updateSingleUser(user));
      }
    });
  }, [nowLogin]);

  if (spinner) return <Spinner />;
  return (
    <Router>
      <Switch>
        <PrivateRoute
          auth={auth}
          isAdmin={isAdmin}
          path="/dashboard"
          AdminComp={
            // <Dashboard
            //   setAuth={setAuth}
            //   curUser={curUser}
            //   setNowLogin={setNowLogin}
            //   setIsAdmin={setIsAdmin}
            //   Component={<DashBoardBox currentUser={curUser} key="dashboard" />}
            // />
            <Redirect to="/users" />
          }
          SuccessComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              Component={
                <ProfileForAdmin
                  key="dashboard"
                  curUser={curUser}
                  setCurUser={setCurUser}
                />
              }
            />
          }
          FailComp={<Redirect to="/" />}
        />
        <PrivateRoute
          auth={auth}
          isAdmin={isAdmin}
          path="/users"
          AdminComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              Component={<Users currentUser={curUser} key="users" />}
            />
          }
          SuccessComp={<Redirect to="/dashboard" />}
          FailComp={<Redirect to="/" />}
        />
        <PrivateRoute
          auth={auth}
          isAdmin={isAdmin}
          path="/classes"
          AdminComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              Component={
                <Classes
                  currentUser={curUser}
                  setCurUser={setCurUser}
                  key="classes"
                />
              }
            />
          }
          SuccessComp={<Redirect to="/dashboard" />}
          FailComp={<Redirect to="/" />}
        />
        <PrivateRoute
          auth={auth}
          isAdmin={isAdmin}
          path="/courses"
          AdminComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              Component={<Courses currentUser={curUser} key="courses" />}
            />
          }
          SuccessComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              Component={<TeacherCourses currentUser={curUser} key="courses" />}
            />
          }
          FailComp={<Redirect to="/" />}
        />
        <PrivateRoute
          auth={auth}
          isAdmin={isAdmin}
          path="/inbox"
          AdminComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              Component={<Inbox curUser={curUser} key="inbox" />}
            />
          }
          SuccessComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              Component={<Inbox curUser={curUser} key="inbox" />}
            />
          }
          FailComp={<Redirect to="/" />}
        />

        <PrivateRoute
          auth={auth}
          isAdmin={isAdmin}
          path="/blocked"
          AdminComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              Component={<Blocked currentUser={curUser} key="blocked users" />}
            />
          }
          SuccessComp={<Redirect to="/dashboard" />}
          FailComp={<Redirect to="/" />}
        />

        {/* Admin Routes End */}
        <PrivateRoute
          auth={auth}
          isAdmin={isAdmin}
          path="/availables"
          AdminComp={<Redirect to="/users" />}
          SuccessComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              Component={
                <StudentAvailable curUser={curUser} key="availables" />
              }
            />
          }
          FailComp={<Redirect to="/" />}
        />
        <PrivateRoute
          auth={auth}
          isAdmin={isAdmin}
          path="/enrolled"
          AdminComp={<Redirect to="/users" />}
          SuccessComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              Component={<StudentEnrolled curUser={curUser} key="enrolled" />}
            />
          }
          FailComp={<Redirect to="/" />}
        />
        <PrivateRoute
          auth={auth}
          isAdmin={isAdmin}
          path="/editprofile"
          AdminComp={<Redirect to="/users" />}
          SuccessComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              Component={
                <EditProfileComp
                  curUser={curUser}
                  setCurUser={setCurUser}
                  key="edit profile"
                />
              }
            />
          }
          FailComp={<Redirect to="/" />}
        />
        <PrivateRoute
          auth={auth}
          isAdmin={isAdmin}
          path="/changepassword"
          AdminComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              Component={
                <ChangePassword currentUser={curUser} key="change password" />
              }
            />
          }
          SuccessComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              Component={
                <ChangePassword currentUser={curUser} key="change password" />
              }
            />
          }
          FailComp={<Redirect to="/" />}
        />
        <PrivateRoute
          auth={auth}
          isAdmin={isAdmin}
          exact
          path="/"
          AdminComp={
            <Redirect to="/users" curUser={curUser} setAuth={setAuth} />
          }
          SuccessComp={
            <Redirect to="/dashboard" curUser={curUser} setAuth={setAuth} />
          }
          FailComp={
            <Login
              setAuth={setAuth}
              setCurUser={setCurUser}
              setIsAdmin={setIsAdmin}
              setNowLogin={setNowLogin}
            />
          }
        />
        {/* <PrivateRoute
					auth={auth}
					isAdmin={isAdmin}
					path="/profile"
					AdminComp={<Redirect to="/dashboard" />}
					SuccessComp={<Redirect to="/dashboard" />}
					FailComp={<Redirect to="/" />}
				/> */}
        <PrivateRoute
          auth={auth}
          isAdmin={isAdmin}
          path="/user"
          AdminComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              Component={<ProfileForAdmin key="users" curUser={curUser} />}
            />
          }
          SuccessComp={<Redirect to="/dashboard" />}
          FailComp={<Redirect to="/" />}
        />
        <PrivateRoute
          auth={auth}
          isAdmin={isAdmin}
          path="/inbox/:id"
          AdminComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              // Component={<Inbox curUser={curUser} key="inbox" />} />}
              Component={<Inbox curUser={curUser} key="inbox" />}
            />
          }
          SuccessComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              Component={<Inbox curUser={curUser} key="inbox" />}
            />
          }
          // SuccessComp={<Redirect to="/dashboard" />}
          FailComp={<Redirect to="/" />}
        />
        <PrivateRoute
          auth={auth}
          isAdmin={isAdmin}
          path="/:id"
          // AdminComp={<NewClassMaterials curUser={curUser} setAuth={setAuth} />}
          AdminComp={
            // <Dashboard
            //   setAuth={setAuth}
            //   curUser={curUser}
            //   setNowLogin={setNowLogin}
            //   setIsAdmin={setIsAdmin}
            //   Component={<NewClassMaterials curUser={curUser} key="courses" />}
            // />
            <Redirect to="/users" />
          }
          SuccessComp={
            <Dashboard
              setAuth={setAuth}
              curUser={curUser}
              setNowLogin={setNowLogin}
              setIsAdmin={setIsAdmin}
              Component={
                <NewClassMaterials
                  curUser={curUser}
                  key={curUser?.roll === "teacher" ? "courses" : "enrolled"}
                />
              }
            />
          }
          // SuccessComp={<ClassMaterials curUser={curUser} setAuth={setAuth} />}
          FailComp={<Redirect to="/" />}
        />
        <PrivateRoute
          auth={auth}
          isAdmin={isAdmin}
          path="/*"
          AdminComp={<Redirect to="/users" />}
          //   AdminComp={<Redirect to="/dashboard" />}
          SuccessComp={<Redirect to="/dashboard" />}
          FailComp={<Redirect to="/" />}
        />
      </Switch>
    </Router>
  );
};

export default App;
