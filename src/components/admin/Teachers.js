import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import CardComponent from "../CardComponent"
import MuiTable from "./MuiTable"
import { useSelector } from 'react-redux'

const Teachers = () => {
    const users = useSelector(state => state.usersReducer.users)
    const [allTeachers, setAllTeacher] = useState([])
    // const allTeachers = useSelector(state => state.usersReducer.allTeachers)

    useEffect(() => {
        const teachers = users?.filter(currentTeacher => currentTeacher.roll === "teacher")
        setAllTeacher(teachers)
        // dispatch(adminAllTeachers(teachers))
    }, [])


    return (
        <Box width={"100%"}>


            <Grid container>
                {/* <Box width="100%" display="flex" justifyContent="space-evenly" flexWrap="wrap"> */}

                <MuiTable />

                {/* {
                    allTeachers?.map((teacher, ind) => {
                        return (
                            <Grid item >
                                <CardComponent key={ind} />
                            </Grid>
                        )
                    })
                } */}
            </Grid>
            {/* </Box> */}
        </Box >
    )
}

export default Teachers