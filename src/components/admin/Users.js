import React, { useEffect, useState } from 'react'
import MuiTable from './MuiTable'
import Box from '@mui/material/Box'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
// import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'

const Users = () => {
    const [tableBody, setTableBody] = useState(null);
    const [activeBtnValue, setActiveBtnValue] = useState("all");

    const users = useSelector(state => state.usersReducer.users)
    const teachers = users?.filter(user => user.roll === "teacher")
    const students = users?.filter(user => user.roll === "student")

    const handleChange = (event, value) => {
        if (value === "teachers") {
            setTableBody(teachers);
        } else if (value === "students") {
            setTableBody(students);
        } else {
            setTableBody(users);
        }
    }
    useEffect(() => {
        setTableBody(users)
    }, [])
    return (
        <Box width="100%" p={2}>
            <Box>
                <ToggleButtonGroup
                    value={tableBody}
                    exclusive
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                >
                    <ToggleButton
                        size="small"
                        sx={{
                            "&:hover": { backgroundColor: "#041d04", color: "#fff" },
                            backgroundColor: activeBtnValue === "all" ?
                                "#041d04" : "white",
                            color: activeBtnValue === "all" ? "#fff" : "#041d04",
                        }}
                        value="all"
                        onClick={() => setActiveBtnValue("all")}
                    >
                        All Users
                    </ToggleButton>

                    <ToggleButton
                        size="small"
                        sx={{
                            "&:hover": { backgroundColor: "#041d04", color: "#fff" },
                            backgroundColor: activeBtnValue === "teachers" ?
                                "#041d04" : "white",
                            color: activeBtnValue === "teachers" ? "#fff" : "#041d04"
                        }}
                        value="teachers"
                        onClick={() => setActiveBtnValue("teachers")}
                    >
                        Teachers
                    </ToggleButton>

                    <ToggleButton
                        size="small"
                        sx={{
                            "&:hover": { backgroundColor: "#041d04", color: "#fff" },
                            backgroundColor: activeBtnValue === "students" ?
                                "#041d04" : "white",
                            color: activeBtnValue === "students" ? "#fff" : "#041d04",
                        }}
                        value="students"
                        onClick={() => setActiveBtnValue("students")}
                    >
                        Students
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <MuiTable tableBody={tableBody} />
        </Box>
    )
}
export default Users
