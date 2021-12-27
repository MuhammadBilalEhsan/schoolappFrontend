import React, { useState } from 'react'
import { Box, Typography, Avatar, Button, Accordion, AccordionDetails, Tooltip, Menu, MenuItem, AccordionSummary } from "@mui/material"
import { MdAssignment } from "react-icons/md"
import { AiOutlineExclamationCircle } from "react-icons/ai"
import { MdOutlineMoreVert, MdUpload } from "react-icons/md"
import Assignment from './Assignment'


const AssignmentAccordion = ({ curUser, isTeacher, isAdmin, assignment, setCurrentAssignmentID, setChecked }) => {
    const [expanded, setExpanded] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        // event.stopPropagation();
        setAnchorEl(null);
    };
    const previewAssignment = (e) => {
        e.stopPropagation();
    }
    const submittedAssignments = (event) => {
        event.stopPropagation();
        setCurrentAssignmentID(assignment?._id)
        setChecked(false)
        handleClose()
    }
    const Checked = (event) => {
        event.stopPropagation();
        setCurrentAssignmentID(assignment?._id)
        setChecked(true)
        handleClose()
    }
    // console.log("assig", assignment)
    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ marginTop: 1, "&:hover": { boxShadow: 3, cursor: "pointer" } }}  >
                <AccordionSummary
                    // expandIcon={assignment?.<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Box minWidth="65px" >
                            <Avatar sx={{ bgcolor: "green", textTransform: "capitalize" }}><MdAssignment size="20px" color="white" /></Avatar>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: "16px", }}>{assignment?.title}</Typography>
                        </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                        {
                            assignment?.file ? <Tooltip arrow title={"View file"}>
                                <Button
                                    sx={{ color: "black", borderRadius: 5 }}
                                    size="small"
                                    onClick={(e) => previewAssignment(e)}
                                    target="_blanck"
                                    href={assignment?.file}
                                >
                                    <AiOutlineExclamationCircle size="23px" style={{ margin: "auto 0px" }} />
                                </Button>
                            </Tooltip>
                                : ""
                        }
                        {isTeacher || isAdmin ? (
                            <Box>
                                <Button
                                    sx={{ color: "green", borderRadius: 5 }}
                                    size="small"
                                    id="basic-button"
                                    aria-controls="basic-menu"
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <MdOutlineMoreVert size="23px" style={{ margin: "auto 0px" }} />
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >

                                    {/* <MenuItem onClick={() => history.push(`submitted/${assignment?._id}`)}>Submited</MenuItem> */}
                                    {/* <MenuItem href={`submitted/${assignment?._id}`}>Submited</MenuItem> */}
                                    <MenuItem onClick={submittedAssignments}>Non-checked Students</MenuItem>
                                    <MenuItem onClick={Checked}>Submitted & Checked Students</MenuItem>
                                </Menu>
                            </Box>
                        ) : (<Assignment
                            btnIcon={<MdUpload size="23px" style={{ margin: "auto 0px" }} />}
                            btnVariant="text"
                            btnColor="success"
                            tooltipTitle="Submit Assignment"
                            input2label="Answers"
                            currentAssignment={assignment}
                            dialogTitle="Submit Assignment"
                            actionTitle="submit"
                            curUser={curUser}
                            isTeacher={isTeacher}
                        />
                        )}
                    </Box>
                </AccordionSummary>

                <AccordionDetails>
                    <Typography> {assignment?.description ? assignment.description : "This Assignment have no desccription"}</Typography>
                </AccordionDetails>

            </Accordion>
        </div>
    )
}

export default AssignmentAccordion
