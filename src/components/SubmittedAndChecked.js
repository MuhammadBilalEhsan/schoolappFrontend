import React, { useEffect, useState } from 'react'
import { Box, Tooltip, Button, Typography } from "@mui/material"
import { BiArrowBack } from "react-icons/bi"
import { useHistory } from 'react-router-dom'
import StudentForThreeComp from './StudentForThreeComp'
import SubmittedAccordion from './SubmittedAccordion'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { currentAssignmentRedux } from '../redux/actions'
import { socket } from '../App'
import appSetting from '../appSetting/appSetting'
import MuiSnacks from './MuiSnacks'

const LS = JSON.parse(localStorage.getItem("me"))

const SubmittedAndChecked = ({ currentAssignmentID, checked, isAdmin }) => {
    const currentAssignment = useSelector(state => state.usersReducer.currentAssignment)
    const [assignment, setAssignment] = useState(currentAssignment)

    const [openSnack, setOpenSnack] = useState("");
    const [severity, setSeverity] = useState("");

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        socket.on("CHANGE_IN_ASSIGNMENT", (assignment) => {
            if (currentAssignment?._id === assignment._id) {
                setAssignment(assignment)
                dispatch(currentAssignmentRedux(assignment))
            }
        })
    })

    useEffect(async () => {
        const res = await axios.get(`${appSetting.severHostedUrl}/assignment/submitted/${currentAssignmentID}`, { headers: { Authentication: `Bearer ${LS?.token}` } })
        if (res) {
            dispatch(currentAssignmentRedux(res.data.assignment))
            setAssignment(res.data.assignment)
        } else {
        }
    }, [])
    return (
        <Box>
            {openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}

            <Box display="flex" justifyContent="flex-end" px={2} width="100%" >
                <Tooltip title="Go to checked Assignments" arrow>
                    <Button onClick={() => history.push("/coursedetails")} startIcon={<BiArrowBack color="inherit" size="22px" />} color="success" sx={{ marginTop: 3, borderRadius: 5 }} variant="contained">
                        Back
                    </Button>
                </Tooltip>
            </Box>
            <Box display="flex" borderBottom="1px solid #00800085" justifyContent="space-between" pb={1} px={2} width="100%" >
                <Typography variant="h4" color="green">
                    {checked ? "Checked " : "Submitted "} Students
                </Typography>
                <Typography variant="body1" mt={2} color="green">
                    ({assignment?.title})
                </Typography>
            </Box>
            {
                checked ? assignment?.submitted?.map((student, ind) => {
                    return (
                        student.marks ?
                            <StudentForThreeComp
                                key={ind}
                                submitted={student}
                            /> : ""
                    )
                }) :
                    assignment?.submitted?.length > 0 ?
                        assignment?.submitted?.map((student, ind) => {
                            return (
                                student.marks ?
                                    "" :
                                    <SubmittedAccordion
                                        checked={checked}
                                        isAdmin={isAdmin}
                                        key={ind}
                                        submitted={student}
                                        assignmentID={assignment?._id}
                                        setOpenSnack={setOpenSnack}
                                        setSeverity={setSeverity}
                                    />
                            )
                        }) : <Box pt={9} borderTop="1px solid green" width="100%"
                            textAlign="center"
                        >
                            <Typography variant="h6" color="green">
                                Currently No Student Submit this Assignment
                            </Typography>
                        </Box>
            }

        </Box >
    )
}

export default SubmittedAndChecked
