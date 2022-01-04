import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useDispatch } from 'react-redux';
import axios from 'axios';
import appSetting from '../appSetting/appSetting';
import { curUserFun } from '../redux/actions';
import moment from 'moment';


const MarkAttendance = ({ curUser, setCurUser, setOpenSnack, setSeverity }) => {

    const [todayAttend, setTodayAttend] = useState(true);
    const [holiday, setHoliday] = useState(null);
    const [newState, setNewState] = useState(false);
    const [firstDate, setFirstDate] = useState();
    const [curMonth, setCurMonth] = useState();
    const [curYear, setCurYear] = useState();
    const [attPercent, setAttPercent] = useState(0);
    const [lastMonthPercent, setLastMonthPercent] = useState(0);


    const _id = curUser?._id
    const dispatch = useDispatch()
    const checkTodayAtt = () => {
        // if (curUser.attendance?.length > 0) {
        const attArr = curUser?.attendance;
        const lastMonth = attArr[attArr?.length - 1];
        if (!lastMonth) {
            setTodayAttend(false)
        } else {
            // check user have marked his / her attendance of today or not

            const checkTodayAtt = lastMonth?.days?.find(
                (curElem) => curElem.todayDate === moment().date(),
            );
            if (!checkTodayAtt && moment().date() === 1) {
                handleClick()
                setTodayAttend(true);
            }
            const checkHoliday = moment().day() === 0 || moment().day() === 6
            if (checkTodayAtt) {
                setTodayAttend(true);
            } else if (checkHoliday) {
                setHoliday(true)
            } else {
                setTodayAttend(false);
            }
        }

        // }
        // latestMonthAttCalc();
        // overAllAttCalc();
    };

    const handleClick = async () => {
        try {
            setNewState(true);
            const att = new Date();
            const year = att.getFullYear();
            const month = String(att.getMonth());
            const date = att.getDate();
            const hours = att.getHours();
            const mins = att.getMinutes();

            const time = `${hours}:${mins}`;

            const attObj = { year, month, date, time };
            // console.log("attObj", attObj)
            const res = await axios.post(`${appSetting.severHostedUrl}/user/attendance`,
                attObj,
                { withCredentials: true });
            if (res) {
                dispatch(curUserFun(res.data.updated))
                setCurUser(res.data.updated)
                setOpenSnack(res.data.message);
                setSeverity("success")
            }
        } catch (err) {
            setOpenSnack(err?.response?.data?.error);
            setSeverity("error")
        }
    };

    useEffect(async () => {
        checkTodayAtt()
    }, [curUser, newState])
    return (
        <Box>
            {
                holiday ? <Box
                    py={2} textAlign="center" mb={2} py={2} maxWidth="727px"
                    sx={{ backgroundColor: "#fff", borderRadius: 1, boxShadow: 1 }}
                >
                    <Typography color="green" variant="h4">Today is Holiday</Typography>
                </Box> : <Box
                    textAlign="center" mb={2} py={2} maxWidth="727px"
                    sx={{ backgroundColor: "#fff", borderRadius: 1, boxShadow: 1 }}
                >
                    <Typography color="green" mb={2} variant="h4" display="inline-block">
                        Mark Today's Attendance
                    </Typography>

                    <Box>
                        <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={(e) => handleClick(e)}
                            disabled={todayAttend || newState}
                        >
                            {todayAttend ? "Marked" : "Mark"}
                        </Button>
                    </Box>
                </Box>
            }

        </Box>
    )
}

export default MarkAttendance
