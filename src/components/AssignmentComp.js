import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Tooltip } from "@mui/material";
import AssignmentAccordion from './AssignmentAccordion';
import Assignment from './Assignment';
import { MdAdd } from "react-icons/md";
import axios from 'axios';
import SubmittedAndChecked from './SubmittedAndChecked'
import CheckedAssignments from './CheckedAssignments'
import { useDispatch, useSelector } from 'react-redux';
import { settingAssignments } from '../redux/actions';
import MuiSnacks from './MuiSnacks';
import appSetting from '../appSetting/appSetting'



const AssignmentComp = ({ curUser, isTeacher, currentCourse, isAdmin }) => {
    const LS = JSON.parse(localStorage.getItem("me"))
    const assignments = useSelector(state => state.usersReducer.allAssignments)

    const [allAssignments, setAllAssignments] = useState(assignments)
    const [currentAssignmentID, setCurrentAssignmentID] = useState("");
    const [currentCourseID, setCurrentCourseID] = useState("");
    const [checked, setChecked] = useState(null);

    const [openSnack, setOpenSnack] = useState("");
    const [severity, setSeverity] = useState("");

    const dispatch = useDispatch()

    useEffect(async () => {
        try {
            const res = await axios.post(`${appSetting.severHostedUrl}/assignment/allassignments`, { courseID: currentCourse?._id }, { headers: { Authentication: `Bearer ${LS?.token}` } })
            if (res) {
                dispatch(settingAssignments(res.data.allAssignments))
                setAllAssignments(res.data.allAssignments)
            }
        } catch (error) {
            setOpenSnack(error?.response?.data?.error)
            setSeverity("error")
        }
    }, [])
    return (
        <Box sx={{ maxWidth: "760px", margin: "0 auto" }}>
            {openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}
            {currentAssignmentID && isTeacher || currentAssignmentID && isAdmin ? <SubmittedAndChecked checked={checked} isAdmin={isAdmin} currentAssignmentID={currentAssignmentID} />
                : !isTeacher && !isAdmin && currentCourseID ? <CheckedAssignments currentCourseID={currentCourseID} />
                    : <Box>
                        <Box display="flex" justifyContent="flex-end" px={2} width="100%" >
                            {isTeacher ? (
                                <Assignment
                                    btnTitle="create"
                                    btnVariant="contained"
                                    btnColor="success"
                                    input2label="Questions and Instructions"
                                    tooltipTitle="Create Assignment"
                                    btnStartIcon={<MdAdd size="20px" color="white" />}
                                    dialogTitle="Create Assignment or Questions"
                                    actionTitle="create"
                                    currentCourse={currentCourse}
                                    isTeacher={isTeacher}
                                    setOpenSnack={setOpenSnack}
                                    setSeverity={setSeverity}
                                    setAllAssignments={setAllAssignments}
                                />
                            ) : isAdmin ? ""
                                : <Tooltip title="Go to checked Assignments" arrow>
                                    <Button onClick={() => setCurrentCourseID(currentCourse?._id)} color="success" sx={{ marginTop: 3, borderRadius: 5 }} variant="contained">
                                        Checked
                                    </Button>

                                </Tooltip>
                            }
                        </Box>

                        <Box display="flex" justifyContent="flex-start" mb={2} pb={3} px={2} width="100%" borderBottom="1px solid #009c0052" >
                            <Typography variant="h4" color="green">
                                {isTeacher || isAdmin ? "" : "Non Submitted "}Assignments
                            </Typography>
                        </Box>
                        {
                            allAssignments?.length > 0 ?
                                allAssignments?.map((assignment, index) => {
                                    const check = assignment?.submitted.find(student => student.id === curUser._id)
                                    if (!check) {
                                        return (
                                            <AssignmentAccordion
                                                key={index}
                                                curUser={curUser}
                                                isTeacher={isTeacher}
                                                isAdmin={isAdmin}
                                                assignment={assignment}
                                                setCurrentAssignmentID={setCurrentAssignmentID}
                                                setChecked={setChecked}
                                                setOpenSnack={setOpenSnack}
                                                setSeverity={setSeverity}
                                            />
                                        )
                                    }
                                }) : <Box pt={9} width="100%"
                                    textAlign="center"
                                >
                                    <Typography variant="h6" color="green">
                                        Currently No Assignments
                                    </Typography>
                                </Box>
                        }
                    </Box>
            }

        </Box>
    )
}

export default AssignmentComp
