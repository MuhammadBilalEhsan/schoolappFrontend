import React, { useEffect, useState } from 'react'
import {
    Box,
    // Tooltip, Button,
    Typography, Avatar
} from '@mui/material'
// import { BiArrowBack } from "react-icons/bi"
// import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { checkedAssignmentsRedux } from '../redux/actions'
import appSetting from '../appSetting/appSetting'

const LS = JSON.parse(localStorage.getItem("me"))

const CheckedAssignments = ({ currentCourseID }) => {

    const curUser = useSelector((state) => state.usersReducer.curUser);

    const [checkedAssignments, setCheckedAssignments] = useState(null)

    // const history = useHistory()
    const dispatch = useDispatch()

    // useEffect(() => {
    // socket.on
    // })

    useEffect(async () => {
        try {
            const res = await axios.post(`${appSetting.severHostedUrl}/assignment/studentallchecked`, { courseID: currentCourseID, studentID: curUser?._id }, { headers: { Authentication: `Bearer ${LS?.token}` } })
            if (res) {
                setCheckedAssignments(res.data.checked)
                dispatch(checkedAssignmentsRedux(res.data.checked))
            }
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <div>
            <Box>

                {/* <Box display="flex" justifyContent="flex-end" px={2} width="100%" >
                    <Tooltip title="Back" arrow>
                        <Button onClick={() => history.push("/" + currentCourseID)} startIcon={<BiArrowBack color="inherit" size="22px" />} color="success" sx={{ marginTop: 3, borderRadius: 5 }} variant="contained">
                            Back
                        </Button>
                    </Tooltip>
                </Box> */}
                <Box Box display="flex" borderBottom="1px solid #00800085" justifyContent="space-between" pb={1} px={2} width="100%" >
                    <Typography variant="h4" color="green">
                        All Checked Assignments
                    </Typography>
                    <Typography variant="body1" mt={2} color="green">
                        (Assignment Name)
                    </Typography>
                </Box >
            </Box >
            {checkedAssignments?.length > 0 ?
                checkedAssignments?.map((assignment, index) => {
                    const findStudent = assignment.submitted.find(student => student.id === curUser._id)
                    const getMarks = findStudent?.marks
                    return (
                        <Box key={index} width="100%" mx={1} mb={1} sx={{ backgroundColor: "#fff", boxShadow: 2, "&:hover": { cursor: "pointer", boxShadow: 4, backgroundColor: "#0080000c" }, borderRadius: "12px", padding: "1rem 0px 1rem 1.5rem" }}>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Box width="65px" >
                                    <Avatar sx={{ bgcolor: "green", textTransform: "capitalize" }}>{assignment?.title[0]}</Avatar>
                                </Box>
                                <Box flexGrow={1}>
                                    <Typography variant="h6" color="#0000009c" sx={{ color: "green", cursor: "pointer" }}>{assignment?.title}</Typography>
                                </Box>

                                <Typography mr={2} variant="body1">{getMarks}Marks</Typography>

                            </Box>
                        </Box>
                    )
                }) : <Box pt={9} borderTop="1px solid green" width="100%"
                    textAlign="center"
                >
                    <Typography variant="h6" color="green">
                        No Assignment Checked
                    </Typography>
                </Box>
            }
        </div >
    )
}

export default CheckedAssignments
