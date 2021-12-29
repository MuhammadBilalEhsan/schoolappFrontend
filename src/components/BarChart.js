import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import Box from "@mui/material/Box"
import moment from 'moment';

const BarChart = ({ attendance }) => {
    const [monthNames, setMonthNames] = useState([])
    const [attendDaysOfAllMonths, setAttendDaysOfAllMonths] = useState()
    const chartSeries =
        [{
            name: 'Present Days',
            data: attendDaysOfAllMonths
        }]
    const chartOptions =
    {
        annotations: {
            points: [{
                // x: 'Bananas',
                // seriesIndex: 0,
                label: {
                    borderColor: '#013220',
                    offsetY: 0,
                    style: {
                        color: '#013220',
                        background: '#013220',
                    },
                }
            }]
        },
        chart: {
            // height: 350,
            width: "100%",
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                columnWidth: '50%',
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            colors: ["#228B22"],
            width: 2
        },

        grid: {
            row: {
                colors: ['#fff', '#f2f2f2']
            }
        },
        xaxis: {
            labels: {
                rotate: -45
            },
            tickPlacement: 'on',
            categories: monthNames,
        },
        yaxis: {
            title: {
                text: 'Attendance Chart',
            },
            max: 31,
            min: 0
        },
        fill: {
            type: 'gradient',
            colors: ['#028A0F'],
            gradient: {
                shade: 'light',
                type: "horizontal",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 0.85,
                opacityTo: 0.85,
                stops: [50, 0, 100]
            },
        }
    }
    useEffect(() => {
        if (attendance) {
            if (!attendance.length) {
                const month = moment().month()
                setAttendDaysOfAllMonths(['0'])
                setMonthNames(
                    [
                        `${month === 0 ? "jan" :
                            month === 1 ? "feb" :
                                month === 2 ? "mar" :
                                    month === 3 ? "apr" :
                                        month === 4 ? "may" :
                                            month === 5 ? "jun" :
                                                month === 6 ? "jul" :
                                                    month === 7 ? "aug" :
                                                        month === 8 ? "sep" :
                                                            month === 9 ? "oct" :
                                                                month === 10 ? "nov" : "dec"
                        }_${moment().year()}`
                    ]
                )
            } else {
                let getMonthNames = []
                let getAttendDays = []
                let lastMonth = attendance[attendance?.length - 1]
                let settingData = attendance?.map(month => {
                    getMonthNames.push(String(month.monthName))
                    getAttendDays.push(String(month.days.length))
                    if (month.monthName === lastMonth.monthName) {
                        setAttendDaysOfAllMonths(getAttendDays)
                        setMonthNames(getMonthNames)
                    }
                })
            }
        }
    }, [attendance])
    return (
        <Box
            maxWidth="727px"
            py={2}
            sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: 1
            }}
        >
            {
                attendDaysOfAllMonths && monthNames && <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="bar"
                />
            }
        </Box >
    )
}

export default BarChart
