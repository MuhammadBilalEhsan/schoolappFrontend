import React, { useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Box,
    Button,
    Grid,
    Chip,
    Avatar,
    Tooltip
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import axios from "axios"
import { MdOutlineExpandMore } from 'react-icons/md';
// import { IoTrashBinSharp } from 'react-icons/io5';
import { AiOutlineExclamationCircle } from "react-icons/ai"
import appSetting from '../appSetting/appSetting'


const StudentTab2 = ({ curCor, ind }) => {
    const [expanded, setExpanded] = useState(false);

    const [thisCourse, setThisCourse] = useState({});
    const [allCourses, setAllCourses] = useState([]);

    const history = useHistory()

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const { courseName, courseDesc, topics, duration, courseOutline } = thisCourse

    // const delCourse = async (e) => {
    //     try {
    //         const obj = {
    //             student_id: uid,
    //             course_id: curCor?.id,
    //         }
    //         const res = await axios.post(`${appSetting.severHostedUrl}/course/delencourse`, obj)
    //         console.log(res.data.message ? res.data.message : res.data.error)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    const curCourseDetails = async () => {
        try {
            const findLocally = allCourses?.find(item => item._id === curCor.id)
            if (findLocally) {
                setThisCourse(findLocally)
            } else {
                const res = await axios.post(`${appSetting.severHostedUrl}/course/getcourse`, { id: curCor.id })
                setThisCourse(res.data.DBcourse)
                setAllCourses([...allCourses, res.data.DBcourse])
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div style={{ marginBottom: 2, width: "100%" }}>
            <Accordion width="100%" expanded={expanded === 'panel1'} onClick={curCourseDetails} onChange={handleChange('panel1')} sx={{ marginTop: 1, "&:hover": { boxShadow: 3, cursor: "pointer" } }}  >
                <AccordionSummary
                    expandIcon={<MdOutlineExpandMore onClick={curCourseDetails} />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" justifyContent="flex-start" alignItems="center" flexGrow={1}>
                            <Box minWidth="65px" >
                                <Avatar sx={{ bgcolor: "green", textTransform: "capitalize" }}>{curCor?.name[0]}</Avatar>
                            </Box>
                            <Typography ml={3} variant="body1" color="green" sx={{ wordWrap: "break-word", paddingX: 0.5 }}>
                                {curCor?.name}
                            </Typography>
                        </Box>
                        <Tooltip title="Preview">
                            <Button color="success" onClick={(e) => history.push(`/${curCor?.id}`)} > <AiOutlineExclamationCircle color="black" size="22px" /></Button>
                        </Tooltip>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container display="flex">
                        <Grid item xs={12} sm={6} sx={{ wordWrap: "break-word" }}>
                            <Typography color="black" variant="subtitle2">
                                Course Name:
                            </Typography>
                            <Typography color="green" ml={5} variant="body2">
                                {courseName}
                            </Typography>

                            <Typography color="black" variant="subtitle2">
                                Description:
                            </Typography>
                            <Typography color="green" ml={5} variant="body2">
                                {courseDesc}
                            </Typography>

                            <Typography color="black" variant="subtitle2">
                                Topics:
                            </Typography>
                            <Box ml={4}>
                                {topics?.map((curElem, ind) => {
                                    return (
                                        <Chip
                                            key={ind}
                                            sx={{ marginLeft: 1, marginBottom: 1 }}
                                            color="success"
                                            size="small"
                                            label={curElem.label}
                                            variant="outlined"
                                        />
                                    );
                                })}
                            </Box>
                            <Typography color="black" variant="subtitle2">
                                Duration:
                            </Typography>
                            <Typography ml={5} variant="body2">
                                {duration} week / weeks
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ wordWrap: "break-word" }}>
                            <Typography color="black" variant="subtitle2">
                                Course Outline:
                            </Typography>
                            {courseOutline?.map((curElem, ind) => {
                                return (
                                    <Box key={ind}>
                                        <Typography color="black" ml={5} variant="body1">
                                            week {ind + 1}:
                                        </Typography>
                                        <Typography color="green" ml={9} variant="body2">
                                            {curElem.week}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div >
    )
}

export default StudentTab2