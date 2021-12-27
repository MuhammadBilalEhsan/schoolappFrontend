import React, { useState } from 'react'
import {
    Box, Avatar, Accordion,
    AccordionSummary, AccordionDetails,
    Typography, Tooltip, Button,

} from "@mui/material"

import { AiOutlineExclamationCircle } from "react-icons/ai"
import { ImListNumbered } from "react-icons/im"
import SendingMessageInputComp from './SendingMessageInputComp'
import { useSelector } from 'react-redux'
import appSetting from '../appSetting/appSetting'
import axios from 'axios'
import { socket } from '../App'

const SubmittedAccordion = ({ submitted, assignmentID, checked, setOpenSnack, setSeverity, isAdmin }) => {

    const curUser = useSelector((state) => state.usersReducer.curUser);
    const [showInput, setShowInput] = useState(false)
    const [hideAccordion, setHideAccordion] = useState(false)
    const [marks, setMarks] = useState(Number(0))
    const [expanded, setExpanded] = useState(false);
    const toggle = (event) => {
        event.stopPropagation()
        if (showInput) {
            setShowInput(false)
        } else {
            setShowInput(true)
        }
    }
    const giveNumbersFunc = async (e) => {
        if (marks && marks >= 0 && marks <= 100) {
            try {
                const res = await axios.post(`${appSetting.severHostedUrl}/assignment/givemarks`, { studentID: submitted?.id, assignmentID, marks })
                if (res) {
                    socket.emit("changeInAssignment", res.data.assignment)
                    setHideAccordion(true)
                    if (res.data.message) {
                        setOpenSnack(res.data.message)
                        setSeverity("success")
                    } else {
                        setOpenSnack(res.data.error)
                        setSeverity("error")
                    }
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            setOpenSnack("Failed to Giving Marks...")
            setSeverity("error")
        }
    }
    const previewAssignment = (e) => {
        e.stopPropagation()
    }
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <Box>
            {hideAccordion ? "" :
                <Box>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ backgroundColor: "#00800012", borderRadius: 1, marginTop: 1, "&:hover": { boxShadow: 3, cursor: "pointer" } }}  >
                        {/* <Tooltip title="Click here to Read Answers"> */}
                        <AccordionSummary
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Box minWidth="65px" >
                                    <Avatar sx={{ bgcolor: "green", textTransform: "capitalize" }}>{submitted?.name[0]}</Avatar>
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: "16px", }}>{submitted?.name}</Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center">
                                {
                                    submitted?.file ? <Tooltip arrow title={"View file"}>
                                        <Button
                                            sx={{ color: "black", borderRadius: 5 }}
                                            size="small"
                                            onClick={(e) => previewAssignment(e)}
                                            target="_blanck"
                                            href={submitted?.file}
                                        >
                                            <AiOutlineExclamationCircle size="23px" style={{ margin: "auto 0px" }} />
                                        </Button>
                                    </Tooltip>
                                        : ""
                                }
                                {
                                    !isAdmin ? <Box>
                                        <Tooltip title="Give Marks">
                                            <Button
                                                sx={{ color: "green", borderRadius: 5 }}
                                                size="small"
                                                id="basic-button"
                                                onClick={toggle}
                                            >
                                                <ImListNumbered size="23px" style={{ margin: "auto 0px" }} />
                                            </Button>
                                        </Tooltip>
                                    </Box> : ""
                                }


                            </Box>
                        </AccordionSummary>
                        {/* </Tooltip> */}

                        <AccordionDetails>
                            <Typography>{submitted?.desc}</Typography>
                        </AccordionDetails>

                    </Accordion>
                    <Box mx={1} onClick={(e) => { e.stopPropagation() }}>
                        {showInput ? <SendingMessageInputComp
                            name="marks"
                            autoFocus={true}
                            value={marks}
                            setValue={setMarks}
                            type="number"
                            placeholder="Give Marks Out of 100"
                            color="success"
                            submitFunc={giveNumbersFunc}
                            userName={curUser?.fname[0]}
                        /> : ""
                        }
                    </Box>
                </Box>
            }
        </Box >
    )
}

export default SubmittedAccordion
