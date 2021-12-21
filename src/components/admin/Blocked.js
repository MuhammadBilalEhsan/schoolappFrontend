import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useSelector } from 'react-redux'
import MuiTable from './MuiTable'

const Blocked = () => {
    const users = useSelector(state => state.usersReducer.users)
    const blockedUsers = users?.filter(user => user.blocked === true)
    return (
        <Box width="100%" p={2}>
            {blockedUsers?.length > 0 ? <MuiTable tableBody={blockedUsers} />
                : <Box width="100%" pt={14} textAlign="center">
                    <Typography variant="h5" color="#041d04">
                        Currently No User Blocked
                    </Typography>
                </Box>
            }
        </Box>
    )
}

export default Blocked