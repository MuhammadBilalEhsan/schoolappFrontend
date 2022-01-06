import React, { useEffect, useState } from 'react';
import { Box, } from "@mui/material";
import { makeStyles } from '@mui/styles';
// import Header from "../Header";
import TabsComp from '../TabsComp';
import Stream from '../Stream';
import Announcement from '../Announcement';
import CourseStudentsComp from '../CourseStudentsComp';
import AssignmentComp from '../AssignmentComp';
import { useHistory, useParams } from 'react-router-dom';
import Spinner from '../Spinner';
import appSetting from '../../appSetting/appSetting';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { currentCourseFunc } from '../../redux/actions';
import { socket } from '../../App';
import MuiSnacks from '../MuiSnacks';

const LS = JSON.parse(localStorage.getItem("me"))

const useStyles = makeStyles({
    class_materials: {
        width: "100%",
        height: "100%"
    }
})


const ClassMaterials = ({ curUser }) => {
    const currentCourse = useSelector((state) => state.usersReducer.currentCourse);
    // const [currentCourse, setCurrentCourse] = useState(currCourse)
    const [openSnack, setOpenSnack] = useState("");
    const [severity, setSeverity] = useState("");
    const [showClass, setShowClass] = useState(null);
    const [spinner, setSpinner] = useState(true);
    const [isAdmin, setIsAdmin] = useState(curUser?.isAdmin ? true : false)

    const enrolledStudent = currentCourse?.students?.find(student => student.id === curUser?._id);

    const classes = useStyles()
    const params = useParams()

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(async () => {
        try {
            const res = await axios.post(`${appSetting.severHostedUrl}/course/specific`, { id: params.id }, { headers: { Authentication: `Bearer ${LS?.token}` } })
            if (res.data.currentCourse) {
                dispatch(currentCourseFunc(res.data.currentCourse))
                // setCurrentCourse(res.data.currentCourse)
                setShowClass(true)
                setSpinner(false)
            } else {
                // console.log(res.data.error)
                setShowClass(false)
                setSpinner(false)
                history.push("/")
            }
        } catch (error) {
            history.push("/")
        }
    }, [])
    useEffect(() => {

        socket.on("CHANGE_IN_COURSE", (course) => {
            if (currentCourse?._id === course._id) {
                dispatch(currentCourseFunc(course))
            }
        })
    }, [])

    if (spinner) { return <Spinner /> }
    return (
        <Box className={classes.class_materials}>
            {/* <Header curUser={curUser} setAuth={setAuth} /> */}
            {showClass ?
                curUser?.roll === "student" && enrolledStudent ||
                    curUser?.roll === "teacher" && currentCourse?.teacher_id === curUser?._id
                    || curUser?.isAdmin ?
                    (
                        <Box>
                            {openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}
                            <TabsComp
                                tab1Label="Stream"
                                panel1={<Stream
                                    currentCourse={currentCourse}
                                    curUser={curUser}
                                    isAdmin={isAdmin}
                                />}

                                tab2Label={
                                    curUser?.roll === "teacher" || isAdmin ? "Class Work"
                                        : "Assignments"
                                }
                                panel2={<AssignmentComp
                                    isTeacher={curUser?.roll === "teacher" ? true : false}
                                    isAdmin={isAdmin}
                                    currentCourse={currentCourse} curUser={curUser}
                                />}

                                tab3Label={curUser?.roll === "teacher" || curUser?.isAdmin ? "Students"
                                    : "Announcement"}
                                panel3={curUser?.roll === "teacher" || curUser?.isAdmin ?
                                    <CourseStudentsComp
                                        currentCourse={currentCourse}
                                        isAdmin={isAdmin}
                                        curUser={curUser}
                                    />
                                    : < Announcement currentCourse={currentCourse} curUser={curUser} />}

                                tab4Label={curUser?.roll === "teacher" || curUser?.isAdmin ? "Announcement" : ""}
                                panel4={curUser?.roll === "teacher" || curUser?.isAdmin ?
                                    <Announcement currentCourse={currentCourse} curUser={curUser} />
                                    : ""}
                            />
                        </Box>
                    )
                    : history.push('/coursedetails')
                : history.push('/coursedetails')
            }
        </Box>
    );
};

export default ClassMaterials